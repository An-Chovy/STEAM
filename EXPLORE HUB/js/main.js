const paths = [...document.querySelectorAll('.path-card')];
const surpriseButton = document.querySelector('#surprise-button');

if (surpriseButton && paths.length > 0) {
  surpriseButton.addEventListener('click', () => {
    paths.forEach((card) => card.classList.remove('featured'));

    const randomIndex = Math.floor(Math.random() * paths.length);
    const selectedCard = paths[randomIndex];

    selectedCard.classList.add('featured');
    selectedCard.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  });
}
