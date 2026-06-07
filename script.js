'use strict';

/* ─── Navbar elevation on scroll ─── */
const nav = document.getElementById('nav');

let _lastSY = 0, _ticking = false;

function onScroll() {
  _lastSY = window.scrollY;

  if (!_ticking) {
    requestAnimationFrame(() => {
      nav.classList.toggle('elevated', _lastSY > 20);

      if (_lastSY > window.innerHeight * 0.6) showCartFab();
      else if (!cartCount()) hideCartFab();

      let cur = '';
      chapters.forEach(ch => {
        const r = ch.getBoundingClientRect();
        if (r.top < 150 && r.bottom > 100) cur = ch.id;
      });

      if (cur) {
        navBtns.forEach((btn, i) => {
          if (i > 0 && chapterIds[i - 1] === cur) {
            navBtns.forEach(b => {
              b.classList.remove('active');
              b.removeAttribute('aria-current');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-current', 'true');
          }
        });
      }

      _ticking = false;
    });

    _ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ─── Scroll reveal ─── */
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

/* ─── Animated counters ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const isDecimal = el.dataset.decimal === 'true';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    el.textContent = isDecimal
      ? (current / 10).toFixed(1)
      : Math.floor(current).toLocaleString();

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterIO.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterIO.observe(el));

/* ─── Sidebar navigation ─── */
function sideNav(sectionId, btn) {
  document.querySelectorAll('.sidebar-nav-btn').forEach(b => {
    b.classList.remove('active');
    b.removeAttribute('aria-current');
  });

  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-current', 'true');
  }

  if (chapterIds.includes(sectionId)) {
    openMenuChapter(sectionId, true);
    return;
  }

  const target = document.getElementById(sectionId);
  if (target) {
    const offset = 90;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/* ─── Toast ─── */
let toastTimer = null;

function showToast(msg) {
  const t = document.getElementById('toast');

  if (msg) {
    t.innerHTML = '<span class="toast-icon">✓</span> ' + msg;
  }

  clearTimeout(toastTimer);
  t.classList.add('show');

  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ─── Lazy images ─── */
{
  const imgs = document.querySelectorAll('img[loading="lazy"]');

  imgs.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });
}

/* ─── Premium menu imagery ─── */
const MENU_CATEGORY_IMAGES = {
  'c-indian': 'assets/images/menu/food-41.webp',
  'c-grills': 'assets/images/menu/food-31.webp',
  'c-shawarma': 'assets/images/menu/food-79.webp',
  'c-indochinese': 'assets/images/menu/food-57.webp',
  'c-biryani': 'assets/images/menu/food-65.webp',
  'c-arabic': 'assets/images/menu/food-70.webp',
  'c-pasta': 'assets/images/menu/food-39.webp',
  'c-burgers': 'assets/images/menu/food-59.webp',
  'c-thai': 'assets/images/menu/food-51.webp'
};

const MENU_ITEM_IMAGES = {
  'Butter Chicken': 'assets/images/menu/food-41.webp',
  'Chicken Tikka Masala': 'assets/images/menu/food-78.webp',
  'Dal Makhani': 'assets/images/menu/food-62.webp',
  'Palak Paneer': 'assets/images/menu/food-58.webp',
  'Butter Naan': 'assets/images/menu/food-44.webp',
  'Garlic Naan': 'assets/images/menu/food-27.webp',
  'Mixed Chicken Grill': 'assets/images/menu/food-31.webp',
  'Whole Grilled Chicken': 'assets/images/menu/food-63.webp',
  'Grilled Fish': 'assets/images/menu/food-64.webp',
  'Lamb Kebab': 'assets/images/menu/food-61.webp',
  'Chicken Shawarma — Regular': 'assets/images/menu/food-79.webp',
  'Chicken Shawarma — Spicy': 'assets/images/menu/food-80.webp',
  'Lamb Shawarma': 'assets/images/menu/food-26.webp',
  'Shawarma Platter': 'assets/images/menu/food-47.webp',
  'Chicken Hakka Noodles': 'assets/images/menu/food-69.webp',
  'Beef Hakka Noodles': 'assets/images/menu/food-36.webp',
  'Chicken Fried Rice': 'assets/images/menu/food-38.webp',
  'Chicken Manchurian': 'assets/images/menu/food-57.webp',
  'Chicken Biryani': 'assets/images/menu/food-65.webp',
  'Mutton Biryani': 'assets/images/menu/food-60.webp',
  'Veg Biryani': 'assets/images/menu/food-66.webp',
  'Prawn Biryani': 'assets/images/menu/food-74.webp',
  'Chicken Kabsa': 'assets/images/menu/food-75.webp',
  'Freekeh with Chicken': 'assets/images/menu/food-68.webp',
  'Hummus with Olive Oil': 'assets/images/menu/food-54.webp',
  'Fattoush Salad': 'assets/images/menu/food-10.webp',
  'Pasta Arrabiata': 'assets/images/menu/food-35.webp',
  'Chicken Alfredo': 'assets/images/menu/food-39.webp',
  'Classic Chicken Burger': 'assets/images/menu/food-22.webp',
  'Beef Smash Burger': 'assets/images/menu/food-59.webp',
  'Pad Thai': 'assets/images/menu/food-76.webp',
  'Thai Green Curry': 'assets/images/menu/food-51.webp'
};

function openMenuChapter(sectionId, shouldScroll = false) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  chapters.forEach(chapter => {
    const isActive = chapter.id === sectionId;
    chapter.classList.toggle('active-chapter', isActive);
    chapter.querySelector('.chapter-header')?.setAttribute('aria-expanded', String(isActive));
  });

  navBtns.forEach((btn, index) => {
    const isActive = index > 0 && chapterIds[index - 1] === sectionId;
    btn.classList.toggle('active', isActive);
    if (isActive) btn.setAttribute('aria-current', 'true');
    else btn.removeAttribute('aria-current');
  });

  if (shouldScroll) {
    requestAnimationFrame(() => {
      const offset = 94;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }
}

chapters.forEach(chapter => {
  const header = chapter.querySelector('.chapter-header');
  if (!header) return;

  header.setAttribute('role', 'button');
  header.setAttribute('tabindex', '0');
  header.setAttribute('aria-controls', chapter.id + '-items');
  chapter.querySelector('.menu-items-grid')?.setAttribute('id', chapter.id + '-items');

  header.addEventListener('click', () => openMenuChapter(chapter.id, true));
  header.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openMenuChapter(chapter.id, true);
    }
  });
});

openMenuChapter(chapterIds.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'c-indian');

function enhanceMenuImagery() {
  document.querySelectorAll('.menu-chapter').forEach(chapter => {
    const imgSrc = MENU_CATEGORY_IMAGES[chapter.id];

    if (!imgSrc) return;

    const icon = chapter.querySelector('.chapter-icon');
    const title = chapter.querySelector('.chapter-title')?.textContent?.trim() || 'Cuisine';

    if (icon && !icon.querySelector('img')) {
      icon.innerHTML = `<img src="${imgSrc}" alt="${title}" loading="lazy" onload="this.classList.add('loaded')">`;
    }

    chapter.querySelectorAll('.mi').forEach(card => {
      if (card.querySelector('.mi-img-wrap')) return;

      const name = card.querySelector('.mi-name')?.textContent?.trim() || title;
      const itemImgSrc = MENU_ITEM_IMAGES[name] || imgSrc;
      const wrap = document.createElement('div');
      wrap.className = 'mi-img-wrap';
      wrap.innerHTML = `<img class="mi-img" src="${itemImgSrc}" alt="${name}" loading="lazy" decoding="async" onload="this.classList.add('loaded')">`;
      card.prepend(wrap);
    });
  });
}

enhanceMenuImagery();

/* ─── CART SYSTEM ─── */
const WA_NUMBER = '971551019060';
const EMAIL_TO = 'orders@coolgrand.ae';

let cart = [];

function cartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function cartCount() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);

  if (item) item.qty++;
  else cart.push({ name, price, qty: 1 });

  updateCartUI();
  showToast(name + ' added');
}

function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  updateCartUI();
}

function updateCartUI() {
  const list = document.getElementById('omCartList');
  const total = document.getElementById('omCartTotal');
  const footer = document.getElementById('omCartFooter');
  const fabCnt = document.getElementById('cartFabCount');
  const fabTxt = document.getElementById('cartFabText');

  if (!list || !total) return;

  list.innerHTML = '';

  if (cart.length) {
    if (footer) footer.style.display = 'flex';
    cart.forEach(i => {
      const div = document.createElement('div');
      div.className = 'om-cart-item';
      div.innerHTML = `
        <span class="om-cart-item-name">${i.qty > 1 ? `${i.qty}x ` : ''}${i.name}</span>
        <span class="om-cart-item-price">AED ${i.price * i.qty}</span>
        <button class="om-cart-item-remove" onclick="removeFromCart('${i.name.replace(/'/g,"\\'")}')">x</button>
      `;
      list.appendChild(div);
    });
  } else {
    if (footer) footer.style.display = 'none';
    total.textContent = 'AED 0';
    const empty = document.createElement('div');
    empty.className = 'om-cart-empty';
    empty.id = 'omCartEmpty';
    empty.textContent = 'No items yet — quick-select below or add from menu';
    list.appendChild(empty);
  }

  total.textContent = 'AED ' + cartTotal();

  const count = cartCount();
  if (fabCnt) {
    fabCnt.textContent = count;
    fabCnt.style.display = count ? 'flex' : 'none';
  }
  if (fabTxt) {
    fabTxt.textContent = count ? `Order (${count} item${count > 1 ? 's' : ''})` : 'Place Order';
  }

  document.querySelectorAll('.mi, .dish-card').forEach(card => {
    const name = card.querySelector('.mi-name, .dish-name')?.textContent.trim();
    const btn = card.querySelector('.mi-btn, .dish-add');
    if (!name || !btn) return;
    const item = cart.find(i => i.name === name);
    btn.setAttribute('data-qty', item ? String(item.qty) : '0');
  });
}

/* ─── Modal ─── */
function openOrderModal() {
  document.getElementById('orderModal').classList.add('open');
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('open');
}

/* ─── Add buttons ─── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.mi-btn, .dish-add');

  if (!btn) return;

  const card = btn.closest('.mi, .dish-card');
  const name = card?.querySelector('.mi-name, .dish-name')?.textContent || 'Item';
  const price = parseInt(card?.querySelector('.mi-price, .dish-price')?.textContent || '0');

  addToCart(name, price);
});

/* ─── Nav order button ─── */
document.querySelector('.nav-order')?.addEventListener('click', openOrderModal);
