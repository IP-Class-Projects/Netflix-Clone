const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    nav.style.backgroundColor = 'rgb(20,20,20)'; 
  } else {
    nav.style.backgroundColor = 'transparent';
  }
});

const footer = document.querySelector('.service-code');

footer.addEventListener('click', () => {
  footer.innerHTML = '286-128';
});

