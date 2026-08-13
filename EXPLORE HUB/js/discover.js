const realmCards = [...document.querySelectorAll('.realm-card')];
const discoverSurprise = document.querySelector('#discover-surprise');

if (discoverSurprise && realmCards.length > 0) {
  discoverSurprise.addEventListener('click', () => {
    realmCards.forEach((card) => card.classList.remove('featured'));
    const selected = realmCards[Math.floor(Math.random() * realmCards.length)];
    selected.classList.add('featured');
    selected.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
