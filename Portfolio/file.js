const goToAbout = document.querySelector('.arrow');

goToAbout.addEventListener('click',() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 1500;
})