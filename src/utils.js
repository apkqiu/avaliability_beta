import axios from "axios";

export function urlarg(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
export function hasharg(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.hash.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
export function getarg(name) {
    return hasharg(name) || urlarg(name);
}
export function hex2rgb(hex) {
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

export function is_electron() {
    var userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf('electron') != -1;
}
export function is_using_fileuri() {
    return window.location.href.indexOf("file://") != -1;
}
export function is_http() {
    return window.location.href.indexOf("http://") != -1 || window.location.href.indexOf("https://") != -1;
}

export function randbetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function chooseRandom(arr, count) {
    var retarr = [];
    for (let i = 0; i < count && i < arr.length; i++) {
        const randomIndex = randbetween(i, arr.length - 1);
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
        retarr.push(arr[i]);
    }
    return retarr.slice(0, Math.min(count, arr.length));
}
export function check(value_func, callback_func){
    let old_value = JSON.stringify(value_func());
    setInterval(() => {
        let new_value = JSON.stringify(value_func());
        if (old_value != new_value) {
            callback_func();
            old_value = new_value;
        }
    }, 10);
}

export const root = "/avaliability_beta"
export const public_dir = Object.keys(import.meta.glob("~/**/*")).map(x => x.replace("/public", root))

// make public_dir an object like this:
/*
{
    public:
    {
        resource:{
            images:{
                "image1.png":"/resource/images/image1.png",
                ...
            },
            ...
        }
            ,...
    }
}
*/

function getPathFromTree(tree, pathString) {
    const parts = pathString.startsWith('/') ? pathString.slice(1).split('/') : pathString.split('/');
    
    let current = tree;
    for (const part of parts) {
        if (current === undefined || current[part] === undefined) {
            return undefined;
        }
        current = current[part];
    }
    
    // 如果最终结果是对象而不是字符串，说明是目录而不是文件
    return typeof current === 'string' ? current : undefined;
}
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

export const public_tree = buildPathTree(public_dir).avaliability_beta;

export async function getTitle(obj_url) {
    const resp = await axios.get(obj_url)
    const first_ln = resp.data.split("\n")[0]
    if (first_ln.startsWith("#")) {
        return first_ln.replace(/#+ /g, "")
    }else{
        return first_ln.replace("<h1>","").replace("</h1>","")
    }
}

export function list_zhoubao(){
    let ret = Object.keys(public_tree.res.pdf)
    ret = ret.map((k)=>{
        return k.substring(7, k.length - 4)
    })
    ret = ret.sort((a,b)=>{
        return parseFloat(a) - parseFloat(b)
    })
    return ret
}

export const LocalStorage = new Proxy({}, {
    get: function (target, key) {
        return localStorage.getItem(key)
    },
    set: function (target, key, value) {
        localStorage.setItem(key, value)
        return true
    }
})