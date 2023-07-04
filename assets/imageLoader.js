let gallery = document.getElementById("gallery")

files.forEach(name => {
    let strHTML = `` +
    `<a href="/assets/art/${name}" data-toggle="lightbox" 
    data-gallery="example-gallery"
    class="col-sm-3 img-thumbnail d-flex flex-wrap align-items-center bg-dark" style="margin:5;"
    data-max-height="600">
    <img src="/assets/art/${name}" class="img-fluid" style="border-radius:5px;">
    </a>`
    gallery.innerHTML += strHTML
})
