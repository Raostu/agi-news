// 顶部滚动阴影
window.addEventListener('scroll', function() {
  var header = document.querySelector('header');
  if (!header) return;
  if (window.scrollY > 10) {
    header.classList.add('shadow');
  } else {
    header.classList.remove('shadow');
  }
});

// 关注设置交互（容错处理：页面可能不存在这些元素）
document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    var label = this.closest('label');
    if (!label) return;
    if (this.checked) {
      label.classList.add('bg-primary/10');
      label.classList.remove('bg-secondary');
    } else {
      label.classList.remove('bg-primary/10');
      label.classList.add('bg-secondary');
    }
  });
});

// 导航链接（同页平滑滚动；跨页保持普通跳转）
document.querySelectorAll('.nav-link').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return; // 非锚点：不拦截
    var target = document.querySelector(href);
    if (!target) return; // 目标不存在：不拦截
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(function(el) {
      el.classList.remove('nav-active');
    });
    link.classList.add('nav-active');
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});

// 滚动高亮（仅当页面包含带 id 的 section 时生效）
window.addEventListener('scroll', function() {
  var sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;
  var scrollPosition = window.scrollY + 100;
  sections.forEach(function(section) {
    var sectionTop = section.offsetTop - 100;
    var sectionBottom = sectionTop + section.offsetHeight;
    var sectionId = section.getAttribute('id');
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      document.querySelectorAll('.nav-link').forEach(function(nav) {
        nav.classList.remove('nav-active');
        if (nav.getAttribute('href') === '#' + sectionId) {
          nav.classList.add('nav-active');
        }
      });
    }
  });
});


