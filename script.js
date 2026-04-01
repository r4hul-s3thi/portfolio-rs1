// ── Custom Cursor ──
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    cursor.style.background = 'var(--accent2)';
    follower.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'var(--accent)';
    follower.style.opacity = '.6';
  });
});

// ── Typing Effect ──
const roles = ['Developer', 'ML Enthusiast', 'Tech Writer', 'Problem Solver', 'Open Source Contributor'];
const typedEl = document.querySelector('.typed');
let ri = 0, ci = 0, deleting = false;

function type() {
  const word = roles[ri];
  typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

  if (!deleting && ci > word.length) {
    deleting = true;
    setTimeout(type, 1500);
    return;
  }
  if (deleting && ci < 0) {
    deleting = false;
    ri = (ri + 1) % roles.length;
    ci = 0;
    setTimeout(type, 400);
    return;
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ── Scroll Reveal ──
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = parseFloat(getComputedStyle(entry.target).getPropertyValue('--d') || '0') * 1000;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// ── Counter Animation ──
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      let count = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count;
        if (count >= target) clearInterval(timer);
      }, 40);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ── Nav Active State ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
});

// ── Contact Form ──
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Sent! ✓';
  btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
  setTimeout(() => {
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});
