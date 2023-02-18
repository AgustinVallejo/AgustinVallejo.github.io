let files = [
    '2023-02-16.jpeg',
    '2023-02-05.jpeg',
    '2023-02-04.jpeg',
    '2023-02-02.jpeg',
    '2023-01-29.jpeg',
    '2023-01-21.jpeg',
    '2023-01-20.jpeg',
    '2023-01-19.jpeg',
    '2023-01-17.jpeg',
    '2023-01-16.jpeg',
    '2023-01-13.jpeg',
    '2023-01-11.jpeg',
    '2023-01-06.jpeg',
    '2023-01-04.jpeg',
    '2022-12-29.jpeg',
    '2023-01-02.jpeg',
    '2022-12-27.jpeg',
    '2022-12-25.jpeg',
    '2022-12-23.jpeg',
    '2022-12-17.jpeg',
    '2022-12-01.jpeg',
    '2022-11-13.jpeg', // A
    '2022-11-14.jpeg', // B
    // '2022-11-12.jpeg',
    '2022-11-04.jpeg',
    '2022-10-30.jpeg',
    // '2022-10-24.jpeg',
    '2022-10-22.jpeg',
    '2022-10-21.jpeg',
    '2022-10-16.jpeg',
    '2022-10-11.jpeg',
    '2022-10-09.jpeg',
    '2022-10-06.jpeg',
    '2022-10-02.jpeg',
    '2022-09-30.jpeg',
    '2022-09-29.jpeg',
    '2022-09-27.jpeg',
    '2022-09-23.jpeg',
    '2022-09-22.jpeg',
    '2022-09-21.jpeg',
    '2022-09-20.jpeg',
    '2022-09-19.jpeg',
    '2022-09-17.jpeg',
    '2022-09-11.jpeg',
    '2022-09-10.jpeg',
    '2022-09-04.jpeg',
    '2022-08-28.jpeg',
    '2022-08-20.jpeg',
    '2022-08-17.jpeg',
    '2022-08-11.jpeg',
    '2022-08-09.jpeg',
    '2022-07-28.jpeg',
    '2022-07-18.jpeg',
    '2022-07-16.jpeg',
    '2022-07-11.jpeg',
    '2022-07-05.jpeg',
    '2022-07-04.jpeg',
    '2022-07-03.jpeg',
    '2022-06-28.jpeg',
    '2022-06-26.jpeg',
    '2022-06-22.jpeg',
    '2022-06-19.jpeg',
    '2022-06-16.jpeg',
    '2022-06-15.jpeg',
    '2022-06-01.jpeg',
    '2022-05-28.jpeg',
    '2022-05-24.jpeg',
    '2022-05-22.jpeg',
    '2022-05-21.jpeg',
    '2022-05-17.jpeg',
    '2022-05-16.jpeg',
    // '2022-05-08.jpeg',
    '2022-04-30.jpeg',
    '2022-04-29.jpeg',
    '2022-04-13.jpeg',
    '2022-04-02.jpeg',
    '2022-03-30.jpeg',
    '2022-03-27.jpeg',
    // '2022-03-10.jpeg',
    '2022-02-22.jpeg',
    '2022-02-12.jpeg',
    '2022-02-08.jpeg',
    '2022-02-05.jpeg',
    '2022-02-03.jpeg',
    '2022-02-01.jpeg',
    '2022-01-29.jpeg',
    '2022-01-27.jpeg',
    '2022-01-24.jpeg',
    '2022-01-21.jpeg',
    '2022-01-17.jpeg',
    '2022-01-15.jpeg',
    '2022-01-14.jpeg',
    '2022-01-06.jpeg',
    '2022-01-03.jpeg',
    '2021-12-28.jpeg',
    '2021-11-26.jpeg',
    '2021-11-19.jpeg',
    '2021-11-07.jpeg',
    '2021-10-26.jpeg',
    '2021-10-18.jpeg',
    '2021-10-02.jpeg',
    '2021-09-23.jpeg',
    '2021-09-07.jpeg',
    '2021-09-06.jpeg',
    '2021-09-01.jpeg',
    '2021-08-10.jpeg',
    '2021-08-09.jpeg'
]

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

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

