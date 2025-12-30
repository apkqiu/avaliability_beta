
export async function renderIntoContainer(
    container/*: HTMLElement*/,
    url/*: string*/,
    options/*?: RenderPdfOptions*/
) {
    var pdfjsLib = await import('pdfjs-dist/build/pdf.mjs')
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${(pdfjsLib).version}/build/pdf.worker.mjs`
    container.innerHTML = ''

    const scale = options?.scale ?? 3
    const targetPage = options?.page

    try {
        const loadingTask = pdfjsLib.getDocument(url)
        const pdf = await loadingTask.promise

        const pages = targetPage
            ? [targetPage]
            : Array.from({ length: pdf.numPages }, (_, i) => i + 1)

        for (const pageNum of pages) {
            const page = await pdf.getPage(pageNum)
            const viewport = page.getViewport({ scale })

            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            if (!context) continue

            const dpr = window.devicePixelRatio || 1
            canvas.width = viewport.width * dpr
            canvas.height = viewport.height * dpr
            canvas.style.width = `${viewport.width}px`
            canvas.style.height = `${viewport.height}px`
            context.setTransform(dpr, 0, 0, dpr, 0, 0)

            canvas.style.width = "100%"
            canvas.style.height = "100%"
            container.appendChild(canvas)

            const renderContext = {
                canvasContext: context,
                viewport
            }

            await page.render(renderContext).promise
        }
    } catch (error) {
        console.error('PDF 加载失败:', error)
        container.innerHTML = '<p style="color:red">加载失败</p>'
    }
}