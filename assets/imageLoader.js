let files = [
    '2021-08-10.jpeg',
    '2021-09-01.jpeg',
    '2021-09-06.jpeg',
    '2021-09-07.jpeg',
    '2021-09-23.jpeg',
    '2021-10-02.jpeg',
    '2021-10-18.jpeg',
    '2021-10-26.jpeg',
    '2021-11-07.jpeg',
    '2021-11-26.jpeg',
    '2021-12-28.jpeg',
    '2022-01-03.jpeg',
    '2022-01-06.jpeg',
    '2022-01-14.jpeg',
    '2022-01-15.jpeg',
    '2022-01-17.png',
    '2022-01-21.jpeg',
    '2022-01-24.jpeg',
    '2022-01-27.jpeg',
    '2022-01-29.jpeg',
    '2022-02-01.jpeg',
    '2022-02-03.jpeg',
]

// import os
// for n in os.listdir():
//   print(f"'{n}',")

shuffleArray(files)

let gallery = document.getElementById("gallery")

files.forEach(name => {
    let strHTML = `` +
    `<a href="/assets/art/${name}" data-toggle="lightbox"`+
    `data-gallery="example-gallery" class="col-sm-4 img-thumbnail mx-auto centered">` +
    `<img src="/assets/art/${name}" class="img-fluid">` +
    `</a>`
    gallery.innerHTML += strHTML
})

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}