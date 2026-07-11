(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setHeaderState = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 18);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const closeNavigation = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeNavigation();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavigation();
  });

  const revealItems = [...document.querySelectorAll('.reveal')];
  revealItems.forEach((item) => {
    const delay = item.dataset.delay;
    if (delay) item.style.setProperty('--delay', `${delay}ms`);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const tabGroup = document.querySelector('[data-product-tabs]');
  if (tabGroup) {
    const tabs = [...tabGroup.querySelectorAll('[role="tab"]')];
    const panels = [...tabGroup.querySelectorAll('[role="tabpanel"]')];

    const activateTab = (tab, focus = false) => {
      const id = tab.dataset.tab;
      tabs.forEach((candidate) => {
        const selected = candidate === tab;
        candidate.setAttribute('aria-selected', String(selected));
        candidate.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel) => {
        const selected = panel.dataset.panel === id;
        panel.hidden = !selected;
        panel.classList.toggle('is-active', selected);
      });
      if (focus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (event) => {
        let targetIndex = index;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') targetIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') targetIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') targetIndex = 0;
        if (event.key === 'End') targetIndex = tabs.length - 1;
        if (targetIndex !== index) {
          event.preventDefault();
          activateTab(tabs[targetIndex], true);
        }
      });
    });
  }

  const lightbox = document.querySelector('[data-lightbox-dialog]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const lightboxClose = document.querySelector('[data-lightbox-close]');
  let lightboxTrigger = null;

  const closeLightbox = () => {
    if (!lightbox?.open) return;
    lightbox.close();
    lightboxTrigger?.focus();
  };

  document.querySelectorAll('[data-lightbox]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxTrigger = trigger;
      lightboxImage.src = trigger.dataset.lightbox;
      const nestedImage = trigger.querySelector('img');
      lightboxImage.alt = nestedImage?.alt ? `Expanded view: ${nestedImage.alt}` : 'Expanded TrailEye AI product screenshot';
      if (typeof lightbox.showModal === 'function') lightbox.showModal();
    });
  });
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  lightbox?.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeLightbox();
  });

  const toast = document.querySelector('[data-toast]');
  let toastTimer;
  document.querySelectorAll('a[download]').forEach((downloadLink) => {
    downloadLink.addEventListener('click', () => {
      if (!toast) return;
      window.clearTimeout(toastTimer);
      toast.classList.add('is-visible');
      toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
    });
  });

  document.querySelectorAll('.lemonsqueezy-button').forEach((checkoutLink) => {
    checkoutLink.addEventListener('click', (event) => {
      if (!window.LemonSqueezy?.Url?.Open) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      window.LemonSqueezy.Url.Open(checkoutLink.href);
    });
  });

  const accordionItems = [...document.querySelectorAll('.accordion details')];
  accordionItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      accordionItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const yearTarget = document.querySelector('[data-year]');
  if (yearTarget) yearTarget.textContent = String(new Date().getFullYear());
})();
