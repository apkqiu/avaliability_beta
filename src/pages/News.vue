<style scoped>
a {
    text-decoration: none;
}

.preview {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 3em;
}
</style>
<template>
    <h1>新闻</h1>
    <div class="row">
        <div class="col-md-8">
            <h2>最新文章</h2>
            <ul class="list-group list-group-flush w-100" id="articles"></ul>
        </div>
        <div class="col-md" style="position:sticky">
            <h2>周报出版</h2>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <a href="../pdf_embed.html#p={{id}}">周恩来周报 第{{ id }}期</a>
                </li>
            </ul>
        </div>
    </div>
</template>