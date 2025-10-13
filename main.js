<!-- FILE: css/style.css -->
/* global custom styles + animation keyframes */
:root{
  --bg-dark: #030F0F;
  --accent: #00D0F8;
  --accent-2: #03624C;
  --neutral: #F2F2F2;
}

/* Placeholder @font-face rules: replace with your hosted font files (woff2) */
/* Example:
@font-face {
  font-family: 'MilkAndHoney';
  src: url('/assets/fonts/MilkAndHoney.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
*/

/* Tailwind-friendly custom font helpers */
.font-display-1{font-family: 'Theoria', 'Nineties', 'Michroma', 'Inter', sans-serif;}
.font-display-2{font-family: 'MilkAndHoney', 'Bintro', 'Grained', 'Poppins', sans-serif;}
.font-display-3{font-family: 'Anthemi', 'Grained', 'Poppins', sans-serif;}

/* small overrides */
a{color:inherit}

/* hero icon animations */
.icon{opacity:0; transform: translateY(30px) scale(.98);}
.icon.icon-1{animation: popUp 900ms cubic-bezier(.22,.9,.32,1) 120ms forwards;}
.icon.icon-2{animation: popUp 900ms cubic-bezier(.22,.9,.32,1) 320ms forwards;}
.icon.icon-3{animation: popUp 900ms cubic-bezier(.22,.9,.32,1) 520ms forwards;}
.icon.icon-4{animation: popUp 900ms cubic-bezier(.22,.9,.32,1) 720ms forwards;}

.shape{opacity:0; transform: translateY(20px) scale(.98);}
.shape.shape-1{animation: popUpSlow 1100ms ease 80ms forwards;}
.shape.shape-2{animation: popUpSlow 1100ms ease 260ms forwards;}
.shape.shape-3{animation: popUpSlow 1100ms ease 420ms forwards;}

@keyframes popUp{
  from{opacity:0; transform: translateY(30px) scale(.98);}
  to{opacity:1; transform: translateY(0) scale(1);}
}
@keyframes popUpSlow{
  from{opacity:0; transform: translateY(18px) scale(.995);}
  to{opacity:0.9; transform: translateY(0) scale(1);}
}

/* subtle float after initial entrance */
.icon { animation-fill-mode: both; }
.icon:hover{ transform: translateY(-4px) scale(1.02); }

/* nav background stronger after scroll - we'll toggle a class via JS */
.nav-scrolled{ background-color: rgba(3,15,15,0.85) !important; box-shadow: 0 6px 18px rgba(0,0,0,0.6); }

/* small responsive tweaks */
@media (max-width: 768px){
  .icon{display:none;}
}

/* accessible focus */
button:focus, a:focus, input:focus, textarea:focus { outline: 2px dashed var(--accent); outline-offset: 3px }



/* FILE: js/main.js */
/* Vanilla JS for theme toggle, mobile menu, navbar scroll, contact form stub */
(function(){
  // navbar scroll effect
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 50) nav.classList.add('nav-scrolled');
    else nav.classList.remove('nav-scrolled');
  });

  // mobile menu
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if(menuToggle){
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }

  // theme toggle (dark/light)
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  themeToggle && themeToggle.addEventListener('click', () => {
    if(root.classList.contains('light')){ root.classList.remove('light'); root.classList.add('dark'); themeToggle.textContent = '🌙'; document.body.classList.remove('bg-white'); document.body.classList.add('bg-[#030F0F]'); }
    else { root.classList.remove('dark'); root.classList.add('light'); themeToggle.textContent = '☀️'; document.body.classList.remove('bg-[#030F0F]'); document.body.classList.add('bg-white'); }
  });

  // contact form — simple local UX (replace with Firebase integration later)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('form-msg');
      msg.classList.remove('hidden');
      msg.textContent = 'Thanks — message captured (demo). I will wire Firebase when ready.';
      form.reset();
    });
  }

  // small: trigger icons to float subtly after initial animations
  window.addEventListener('load', () => {
    const icons = document.querySelectorAll('.icon');
    icons.forEach((ic, i) => {
      // add a slow floating loop
      ic.animate([
        { transform: 'translateY(0) rotate(0deg)' },
        { transform: 'translateY(-6px) rotate(1deg)' },
        { transform: 'translateY(0) rotate(0deg)' }
      ], {
        duration: 4000 + (i*600),
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out',
        delay: 1200
      });
    });
  });

})();
