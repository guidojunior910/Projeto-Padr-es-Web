window.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.toggle-button');
  buttons.forEach(button => {
    const targetId = button.dataset.target;
    const target = document.getElementById(targetId);
    const showText = button.dataset.show || 'Mostrar mais';
    const hideText = button.dataset.hide || 'Ocultar';

    button.textContent = showText;
    button.addEventListener('click', function() {
      const isHidden = target.classList.toggle('hidden');
      button.textContent = isHidden ? showText : hideText;
    });
  });

  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  function updateActiveLink() {
    const fromTop = window.scrollY + window.innerHeight * 0.2;
    let currentIndex = 0;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (section && section.offsetTop <= fromTop) {
        currentIndex = i;
      }
    }
    navLinks.forEach((link, index) => {
      link.classList.toggle('active', index === currentIndex);
    });
    // Adiciona efeito visual temporário ao tópico ativo
    highlightSection(currentIndex);
  }

  let highlightTimeout = null;
  let lastHighlighted = -1;

  function highlightSection(index) {
    if (index === lastHighlighted) return;
    clearTimeout(highlightTimeout);
    // remover highlight de todas
    sections.forEach(s => s && s.classList.remove('highlight'));
    const sec = sections[index];
    if (!sec) return;
    sec.classList.add('highlight');
    lastHighlighted = index;
    highlightTimeout = setTimeout(() => {
      sec.classList.remove('highlight');
      lastHighlighted = -1;
    }, 1400);
  }

  // Quando o usuário clica no link de navegação, aplicar destaque após o salto
  navLinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
      // permitir comportamento padrão (âncora), mas aplicar destaque logo em seguida
      setTimeout(() => highlightSection(idx), 120);
    });
  });

  // Highlight por hover nas seções
  sections.forEach((sec) => {
    if (!sec) return;
    sec.addEventListener('mouseenter', () => {
      clearTimeout(highlightTimeout);
      sec.classList.add('highlight');
    });
    sec.addEventListener('mouseleave', () => {
      sec.classList.remove('highlight');
    });
  });

  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink);

  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
