const modal = document.querySelector('.modal')
const getMovie = document.querySelector('.get-movie')
const close = document.querySelector('.close')

getMovie.addEventListener('click', () => {
    modal.show();
})
close.addEventListener('click', () => {
    modal.close();
})