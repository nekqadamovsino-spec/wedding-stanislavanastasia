const target = new Date('2026-09-23T13:30:00+03:00');
const ids = ['days','hours','minutes','seconds'];
function tick(){
  const diff = Math.max(0, target - new Date());
  const values = [
    Math.floor(diff / 86400000),
    Math.floor(diff / 3600000) % 24,
    Math.floor(diff / 60000) % 60,
    Math.floor(diff / 1000) % 60
  ];
  ids.forEach((id, index) => {
    const element = document.getElementById(id);
    if (element) element.textContent = String(values[index]).padStart(2, '0');
  });
}
tick();
setInterval(tick, 1000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const form = document.getElementById('rsvpForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const drinks = data.getAll('drinks');
  const result = Object.fromEntries(data.entries());
  result.drinks = drinks;
  result.savedAt = new Date().toISOString();
  localStorage.setItem('stanislav-anastasia-rsvp', JSON.stringify(result));
  note.textContent = 'Спасибо! Ваш ответ сохранён.';
  form.reset();
});
