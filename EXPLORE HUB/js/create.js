const machineCards = [...document.querySelectorAll('.machine-card')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const machineSurprise = document.querySelector('#machine-surprise');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    machineCards.forEach((card) => card.classList.toggle('hidden', filter !== 'all' && card.dataset.type !== filter));
  });
});

if (machineSurprise) {
  machineSurprise.addEventListener('click', () => {
    machineCards.forEach((card) => { card.classList.remove('featured', 'hidden'); });
    filterButtons.forEach((item) => item.classList.toggle('active', item.dataset.filter === 'all'));
    const selected = machineCards[Math.floor(Math.random() * machineCards.length)];
    selected.classList.add('featured');
    selected.scrollIntoView({ behavior:'smooth', block:'center' });
  });
}
