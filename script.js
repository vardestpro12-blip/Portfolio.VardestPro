const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

const glow=$("#cursorGlow");
window.addEventListener("pointermove",e=>{
  glow.style.left=e.clientX+"px"; glow.style.top=e.clientY+"px";
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("visible")});
},{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));

const menu=$("#menu"), nav=$("#nav");
menu.addEventListener("click",()=>{
  nav.classList.toggle("open");
  menu.classList.toggle("open");
});
$$(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const cards=$$(".project-visual");
cards.forEach(card=>{
  card.addEventListener("pointermove",e=>{
    if(innerWidth<801)return;
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${y*-3}deg) rotateY(${x*3}deg) scale(1.01)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
});

const sections=$$("section[id]");
const links=$$(".nav nav a");
window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(s=>{if(scrollY>=s.offsetTop-180) current=s.id});
  links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
},{passive:true});
