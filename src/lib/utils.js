import axios from "axios";
import localforage from "localforage";
import MarkdownIt from "markdown-it";
import { footnote } from "@mdit/plugin-footnote";
import { align } from "@mdit/plugin-align";
import { attrs } from "@mdit/plugin-attrs";
import { ins } from "@mdit/plugin-ins";
import markdownQuote from 'markdown-it-quote';

//#region url tools
export const Url = {
    args() {
        const full_url = window.location.href;
        const query_start = full_url.indexOf("?"), hash_start = full_url.indexOf("#");
        const query_arg = new URLSearchParams(full_url.substring(query_start));
        const args = {}; // Object.assign太不靠谱了
        for (const [key, value] of query_arg.entries()) {
            args[key] = value;
        }
        if (hash_start > query_start) {
            const hash_arg = new URLSearchParams(full_url.substring(hash_start));
            for (const [key, value] of hash_arg.entries()) {
                args[key] = value;
            }
        }
        return args;
    },
    arg(name) {
        return this.args()[name];
    }
}
//#endregion
//#region color tools
export const Color = {
    hex2rgb(hex) {
        let r = 0,
            g = 0,
            b = 0;
        // 3 digits
        if (hex.length == 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }
        // 6 digits
        else if (hex.length == 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return [r, g, b];
    }
}
//#endregion
//#region platform tools
const Platform = Object.freeze({
    electron: 1,
    web: 2,
    local: 3,
    get current() {
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('electron') != -1) return Platform.electron;
        if (window.location.href.indexOf("file://") != -1) return Platform.local;
        return Platform.web;
    }
})
//#endregion
//#region random tools
export const Random = {
    randbetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    choice(arr, count) {
        var retarr = [];
        for (let i = 0; i < count && i < arr.length; i++) {
            const randomIndex = randbetween(i, arr.length - 1);
            [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
            retarr.push(arr[i]);
        }
        return retarr.slice(0, Math.min(count, arr.length));
    }
}
//#endregion
//#region variable tools
export const Variable = {
    watch(value_func, callback_func, first_call = value_func()) {
        let old_value = first_call;
        let old_json = JSON.stringify(old_value);
        setInterval(() => {
            let new_value = value_func();
            let new_json = JSON.stringify(new_value);
            if (old_json != new_json) {
                if (callback_func.length == 0) callback_func();
                else if (callback_func.length == 1) callback_func(new_value);
                else callback_func(old_value, new_value)
                old_value = new_value;
                old_json = new_json;
            }
        }, 10);
    }
}
//#endregion
//#region public file tools
function buildPathTree(paths) {
    const tree = {};

    paths.forEach(path => {
        // 移除开头的斜杠并分割路径
        const parts = path.startsWith('/') ? path.slice(1).split('/') : path.split('/');

        let current = tree;

        // 遍历所有部分，最后一个部分特殊处理
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const isLast = i === parts.length - 1;

            if (isLast) {
                // 最后一个部分是文件，存储完整路径
                if (!current[part]) {
                    current[part] = path;
                }
            } else {
                // 中间部分是目录，确保是对象
                if (!current[part]) {
                    current[part] = {};
                }
                current = current[part];
            }
        }
    });

    return tree;
}
const root = "/avaliability_beta"
const items = Object.keys(import.meta.glob("/public/**/*")).map(x => x.replace("/public", root).replace("/src", root));
const tree = buildPathTree(items)[root.replaceAll("/", "")];
export const WebFile = {
    root,
    public: tree,
    async fetch(path) {
        var cache = await localforage.getItem("cache");
        cache = JSON.parse(cache ? cache : "{}");
        if (cache[path]) {
            return cache[path]; // Cache hit
        }
        if (path.startsWith(this.root)) {
            //debugger;
        } else if (path.startsWith("/")) {
            path = this.root + path;
        }
        var resp = await axios.get(path);
        if (resp.data.toString().startsWith("<!DOCTYPE html>")) {
            // error page hash ↑
            throw new Error("404")
        }
        cache[path] = resp.data;
        localforage.setItem("cache", JSON.stringify(cache));
        try {
            return JSON.parse(resp.data);
        } catch {
            return resp.data;
        }
        return resp.data;
    },
}

//#endregion
//#region document tools
export const MarkdownRenderer = new MarkdownIt({ html: true });
const plugin_to_use = [
    footnote,
    align,
    markdownQuote,
    attrs,
    ins,
]
for (const plugin of plugin_to_use) {
    MarkdownRenderer.use(plugin);
}

export class WebDocument {
    constructor(url, isText=false) {
        if(isText){
            this.text = url;
        }else{
            this.text = null;
            this.url = url;
        }
    }
    async load() {
        if (this.text) return this.text;
        return this.text = await WebFile.fetch(this.url);
    }
    async render(renderer= MarkdownRenderer) {
        return renderer.render(await this.load());
    }
    async getTitle(more_lines = 0) {
        let lines = (await this.load()).split("\n");
        // 删除空行
        lines = lines.filter(line => line.trim() !== "");

        let result;
        if (lines[0].startsWith("#")) {
            result = lines.shift().replace(/#+ /g, "")
        } else {
            result = lines.shift().replace("<h1>", "").replace("</h1>", "")
        }
        if (more_lines) {
            result = [result.trim()];
            while (more_lines--) {
                result.push(lines.shift().trim())
            }
        }
        return result
    }
}
//#endregion
//#region storage tools

export const LocalStorage = new Proxy({}, {
    get(target, p, receiver) {
        return JSON.parse(localStorage.getItem(p));
    },
    set(target, p, value, receiver) {
        localStorage.setItem(p, JSON.stringify(value));
        return value
    },
})
export const SessionStorage = new Proxy({}, {
    get(target, p, receiver) {
        return JSON.parse(sessionStorage.getItem(p));
    },
    set(target, p, value, receiver) {
        sessionStorage.setItem(p, JSON.stringify(value))
        return value
    },
})

//#endregion