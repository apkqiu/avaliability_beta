<style>
    .pdf-text{
        color:transparent;
        font-size: 1px;
        position: absolute;
        font-family: serif;
    }
</style>
<script setup>
import { onMounted } from 'vue';
import { WebFile } from '../utils';
const {src} = defineProps(["src"])
onMounted(async () => {
    const scale = 1;
    try {
        document.getElementById("pdf-viewer").innerHTML = ""
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.mjs`;
        const document_task = await pdfjs.getDocument(WebFile.root + src);
        const pdf_document = await document_task.promise;
        const n_pages = pdf_document.numPages;
        for (let i = 1; i <= n_pages; i++) {
            const page = await pdf_document.getPage(i);
            const viewport = await page.getViewport({ scale })
            const container = document.createElement('div');
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({
                canvas,
                viewport
            }).promise

            const blob = await new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    return resolve(URL.createObjectURL(blob));
                })
            });
            container.style.position = 'relative';
            const img = document.createElement('img');
            img.src = blob;
            container.appendChild(img);
            const textContent = await page.getTextContent();
            const textItems = textContent.items;
            for (const textItem of textItems) {
                const textSpan = document.createElement('span');
                textSpan.className = "pdf-text";
                const transform = textItem.transform.map((v)=>v*scale);
                textSpan.style.transform = `matrix(${transform[0]}, ${transform[1]}, ${transform[2]}, ${transform[3]}, ${transform[4]+textItem.width*scale/2}, ${viewport.height-transform[5]-textItem.height*scale/2}`;
                textSpan.style.maxWidth = textItem.width*scale+'px';
                textSpan.style.maxHeight = textItem.height*scale+'px';

                
                textSpan.textContent = textItem.str;
                container.appendChild(textSpan);
            }
            container.removeChild(img);
            container.appendChild(img);
            document.getElementById("pdf-viewer").appendChild(container);
        }
    } catch (e) {
        debugger
    }
})
</script>
<template>
    <div id="pdf-viewer">

    </div>
</template>