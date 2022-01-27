let files = [
    '2021-08-10.jpeg',
    '2021-09-01.jpeg',
    '2021-09-06.jpeg',
    '2021-09-23.jpeg',
    '2021-10-02.jpeg',
    '2021-10-18.jpeg',
    '2021-10-26.jpeg',
    '2021-11-07.jpeg',
    '2021-11-19.jpeg',
    '2021-11-26.jpeg',
    '2021-12-28.jpeg',
    '2022-01-03.jpeg',
    '2022-01-14.jpeg',
    '2022-01-15.jpeg',
    '2022-01-21.jpeg',
    '2022-01-24.jpeg',
]

let gallery = document.getElementById("gallery")

files.forEach(name => {
    let strHTML = `` +
    `<a href="/assets/art/${name}" data-toggle="lightbox"`+
    `data-gallery="example-gallery" class="col-sm-4 img-thumbnail mx-auto centered">` +
    `<img src="/assets/art/${name}" class="img-fluid">` +
    `</a>`
    gallery.innerHTML += strHTML
})