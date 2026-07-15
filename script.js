const target = new Date('2026-09-28T15:00:00+03:00');
const ids=['days','hours','minutes','seconds'];
function tick(){
  let diff=Math.max(0,target-new Date());
  const vals=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];
  ids.forEach((id,i)=>document.getElementById(id).textContent=String(vals[i]).padStart(2,'0'));
}
tick(); setInterval(tick,1000);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const dialog=document.getElementById('rsvpDialog');
document.querySelectorAll('[data-open-form]').forEach(btn=>btn.addEventListener('click',()=>dialog.showModal()));
document.getElementById('rsvpForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('formNote').textContent='Спасибо! Ваш ответ сохранён на этом устройстве.';
  localStorage.setItem('wedding-rsvp',JSON.stringify(Object.fromEntries(new FormData(e.target))));
  setTimeout(()=>dialog.close(),1200);
});
