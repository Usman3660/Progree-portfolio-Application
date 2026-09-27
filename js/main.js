/**
 * MUHAMMAD USMAN - PORTFOLIO INTERACTIVE APPLICATION ENGINE
 * Vanilla JavaScript ES6+ Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  // Remove loading class
  document.body.classList.remove('loading');

  // Initialize all modular components
  initThemeManager();
  initMobileNavigation();
  initScrollSpyAndHeader();
  initParticleNetwork();
  init3DTilt();
  initRoleRotator();
  initStatCounters();
  initGridSandbox();
  initProjectFilteringAndModal();
  initInteractiveTerminal();
  initContactForm();
  initBackToTopAndProgress();
  initCustomCursor();
  initSystemHealthMonitor();
  initScrollReveal();
});

/* ==========================================================================
   1. THEME MANAGER (Dark Luxe, Cyberpunk, Light)
   ========================================================================== */
function initThemeManager() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themes = ['dark', 'cyber', 'light'];
  
  // Retrieve cached theme or default to dark
  const savedTheme = localStorage.getItem('mu_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
      const nextTheme = themes[nextIndex];

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('mu_portfolio_theme', nextTheme);

      showToast(`Visual theme shifted to: ${nextTheme.toUpperCase()}`);
    });
  }
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileMenuBtn || !mobileNavDrawer || !mobileNavOverlay) return;

  function openMenu() {
    mobileMenuBtn.classList.add('is-active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileNavDrawer.classList.add('is-active');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    mobileNavOverlay.classList.add('is-active');
    mobileNavOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenuBtn.classList.remove('is-active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileNavDrawer.classList.remove('is-active');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    mobileNavOverlay.classList.remove('is-active');
    mobileNavOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileNavDrawer.classList.contains('is-active');
    isOpen ? closeMenu() : openMenu();
  });

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMenu);
  }

  mobileNavOverlay.addEventListener('click', closeMenu);

  // Close when clicking any nav item
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavDrawer.classList.contains('is-active')) {
      closeMenu();
      mobileMenuBtn.focus();
    }
  });
}

/* ==========================================================================
   3. SCROLL SPY & HEADER ACTIVE STATES
   ========================================================================== */
function initScrollSpyAndHeader() {
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function onScroll() {
    const scrollY = window.pageYOffset;

    // Header background blur intensification
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Determine current section in viewport
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      desktopLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === currentSectionId);
      });
      mobileLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === currentSectionId);
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   4. DYNAMIC PARTICLE NETWORK CANVAS
   ========================================================================== */
function initParticleNetwork() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 28 : 55;
  const mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
      this.color = Math.random() > 0.5 ? '#6366f1' : '#06b6d4';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      // Mouse repulsion/attraction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * 2;
          this.y -= (dy / distance) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectLines() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          const opacity = (1 - distance / 130) * 0.18;
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectLines();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   5. 3D TILT EFFECT FOR HERO PORTAL CARD
   ========================================================================== */
function init3DTilt() {
  const card = document.getElementById('hero-portal-card');
  if (!card || window.innerWidth < 992) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* ==========================================================================
   6. ROLE ROTATOR TEXT EFFECT
   ========================================================================== */
function initRoleRotator() {
  const rotatorElem = document.getElementById('role-rotator');
  if (!rotatorElem) return;

  const roles = [
    'Modern Frontend Architecture',
    'Responsive CSS Grid Systems',
    'High-Scale Distributed APIs',
    'Interactive 3D & WebGL Shaders',
    'WCAG AAA Accessible Interfaces'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function typeCycle() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      rotatorElem.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      rotatorElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeCycle, typingSpeed);
  }

  setTimeout(typeCycle, 800);
}

/* ==========================================================================
   7. LIVE STAT COUNTERS (Scrolled Into View)
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const duration = 1500;
          const step = Math.max(1, Math.floor(target / (duration / 30)));
          let count = 0;

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              stat.textContent = target;
              clearInterval(timer);
            } else {
              stat.textContent = count;
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsContainer = document.querySelector('.portal-stats-row');
  if (statsContainer) observer.observe(statsContainer);
}

/* ==========================================================================
   8. INTERACTIVE CSS GRID SANDBOX WIDGET
   ========================================================================== */
function initGridSandbox() {
  const sandboxBox = document.getElementById('grid-sandbox-box');
  const codeDisplay = document.getElementById('sandbox-css-display');
  const buttons = document.querySelectorAll('.sandbox-btn');

  if (!sandboxBox || !buttons.length) return;

  const gridStyles = {
    '3': {
      css: 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;',
      style: (el) => {
        el.style.display = 'grid';
        el.style.gridTemplateColumns = 'repeat(3, 1fr)';
        el.querySelectorAll('.sandbox-tile').forEach((t) => {
          t.style.gridColumn = 'auto';
          t.style.gridRow = 'auto';
        });
      }
    },
    '2': {
      css: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;',
      style: (el) => {
        el.style.display = 'grid';
        el.style.gridTemplateColumns = 'repeat(2, 1fr)';
        el.querySelectorAll('.sandbox-tile').forEach((t) => {
          t.style.gridColumn = 'auto';
          t.style.gridRow = 'auto';
        });
      }
    },
    '4': {
      css: 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;',
      style: (el) => {
        el.style.display = 'grid';
        el.style.gridTemplateColumns = 'repeat(4, 1fr)';
        el.querySelectorAll('.sandbox-tile').forEach((t) => {
          t.style.gridColumn = 'auto';
          t.style.gridRow = 'auto';
        });
      }
    },
    'auto': {
      css: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 0.75rem;',
      style: (el) => {
        el.style.display = 'grid';
        el.style.gridTemplateColumns = 'repeat(auto-fit, minmax(110px, 1fr))';
        el.querySelectorAll('.sandbox-tile').forEach((t) => {
          t.style.gridColumn = 'auto';
          t.style.gridRow = 'auto';
        });
      }
    },
    'masonry': {
      css: 'display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 60px; gap: 0.5rem; /* Bento Layout */',
      style: (el) => {
        el.style.display = 'grid';
        el.style.gridTemplateColumns = 'repeat(3, 1fr)';
        const tiles = el.querySelectorAll('.sandbox-tile');
        if (tiles[0]) { tiles[0].style.gridColumn = 'span 2'; tiles[0].style.gridRow = 'span 2'; }
        if (tiles[1]) { tiles[1].style.gridColumn = 'span 1'; }
        if (tiles[2]) { tiles[2].style.gridColumn = 'span 1'; }
        if (tiles[3]) { tiles[3].style.gridColumn = 'span 3'; }
      }
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const colType = btn.getAttribute('data-grid-cols');
      const conf = gridStyles[colType];
      if (conf) {
        conf.style(sandboxBox);
        if (codeDisplay) {
          codeDisplay.innerHTML = `<code>${conf.css}</code>`;
        }
      }
    });
  });
}

/* ==========================================================================
   9. PROJECT FILTERING & ACCESSIBLE MODAL
   ========================================================================== */
const projectDatabase = {
  'nexus-finance': {
    title: 'Nexus FinTech & Algorithmic Asset Exchange',
    category: 'Full-Stack Platform',
    timeline: '3 Months &bull; 2026',
    architecture: 'Next.js 15, Node.js Microservices, Redis Cluster, WebSocket Channels, Custom Canvas Sparkline Engine',
    overview: 'Nexus is an ultra-low latency digital currency and equity asset manager capable of streaming 20,000 tick events/sec directly to client browsers without frame drops. Features a custom CSS Grid multi-pane workspace allowing users to tear off charting panels into independent windows.',
    highlights: [
      'Engineered Canvas-based streaming charts maintaining stable 60fps at 10k data points.',
      'Reduced memory footprint by 40% using ArrayBuffer WebSockets binary protocol.',
      'Comprehensive WCAG AAA contrast ratio and screen reader data table announcements.'
    ],
    liveUrl: 'https://example.com/demo/nexus',
    githubUrl: 'https://github.com/example/nexus-exchange'
  },
  'hyperion-3d': {
    title: 'Hyperion 3D Interactive Spatial Metaverse',
    category: '3D & WebGL Engine',
    timeline: '4 Months &bull; 2026',
    architecture: 'Three.js, GLSL Custom Fragment Shaders, Web Audio API, Web Workers, Vite',
    overview: 'Hyperion is a procedural 3D terrain visualizer and interactive sound sculpture built for real-time creative direction. Implements multi-pass post-processing bloom, SSAO depth maps, and dynamic fluid vertex displacements.',
    highlights: [
      'Written custom GLSL shaders calculating real-time simplex noise directly on GPU.',
      'Offloaded heavy geometric procedural geometry calculations to Web Workers.',
      'Spatial 3D audio listener dynamically mapped to camera orientation.'
    ],
    liveUrl: 'https://example.com/demo/hyperion',
    githubUrl: 'https://github.com/example/hyperion-metaverse'
  },
  'prism-cloud': {
    title: 'Prism Edge AI Infrastructure & Vector Pipeline',
    category: 'Cloud & Systems',
    timeline: '5 Months &bull; 2025',
    architecture: 'Go (Golang), Kubernetes, Terraform, Qdrant Vector DB, AWS EKS, Prometheus',
    overview: 'Prism is an enterprise-grade AI semantic routing gateway that indexes billions of high-dimensional embeddings and delivers sub-40ms semantic retrieval across global edge nodes.',
    highlights: [
      'Engineered zero-downtime canary deployment pipeline via Kubernetes Helm charts.',
      'Decreased latency by 58% via smart in-memory Redis embedding caching.',
      'Configured automated horizontal pod autoscalers (HPA) handling 15x traffic spikes.'
    ],
    liveUrl: 'https://example.com/demo/prism',
    githubUrl: 'https://github.com/example/prism-cloud'
  },
  'zenith-design': {
    title: 'Zenith Enterprise Design Token System',
    category: 'UI/UX & Design System',
    timeline: '6 Months &bull; 2025',
    architecture: 'CSS Custom Variables, Web Components, Figma REST API, Storybook, TypeScript',
    overview: 'A unified multi-brand design system powering 18 web applications across enterprise subsidiaries. Automatically compiles Figma token files into production-ready CSS variables, SASS, and TypeScript constants.',
    highlights: [
      'Standardized 450+ atomic design tokens with automated visual regression tests.',
      'Reduced new frontend feature delivery turnaround time by 60%.',
      'Built fully accessible ARIA composite widgets (TreeViews, Comboboxes, Multi-Selects).'
    ],
    liveUrl: 'https://example.com/demo/zenith',
    githubUrl: 'https://github.com/example/zenith-design'
  },
  'synth-studio': {
    title: 'Synthetix Browser DAW & Polyphonic Synth',
    category: 'Web Audio & DSP',
    timeline: '2 Months &bull; 2024',
    architecture: 'Web Audio API, Audio Worklet Nodes, WebAssembly (C++), Canvas 2D Oscilloscope',
    overview: 'Synthetix delivers studio-grade analog sound synthesis in pure browser technology. Features polyphonic subtractive oscillators, envelope generators, frequency filters, and MIDI controller support.',
    highlights: [
      'Leveraged AudioWorklet threads for zero-jitter, glitch-free sound generation.',
      'Compiled high-precision filter algorithms to WebAssembly via Emscripten.',
      'Real-time animated spectrogram oscilloscope rendered at 60 FPS.'
    ],
    liveUrl: 'https://example.com/demo/synth',
    githubUrl: 'https://github.com/example/synthetix'
  },
  'sentinel-guard': {
    title: 'Sentinel Zero-Trust API Firewall & Anomaly Detector',
    category: 'Security & Cloud',
    timeline: '3 Months &bull; 2024',
    architecture: 'Rust, eBPF Kernel Probes, Docker, Prometheus, Grafana',
    overview: 'A high-throughput Linux kernel security layer that inspects incoming HTTP/2 payloads in under 2ms, spotting DDoS attack signatures and bot traffic patterns before reaching application servers.',
    highlights: [
      'Written native eBPF programs running safely inside Linux kernel space.',
      'Processed over 1.2 million packets/sec with negligible CPU utilization.',
      'Exported real-time metrics to Prometheus and customized Grafana dashboards.'
    ],
    liveUrl: 'https://example.com/demo/sentinel',
    githubUrl: 'https://github.com/example/sentinel-guard'
  }
};

function initProjectFilteringAndModal() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-detail-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDynamicContent = document.getElementById('modal-dynamic-content');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Modal Open Function
  function openProjectModal(projectId) {
    const data = projectDatabase[projectId];
    if (!data || !modal || !modalDynamicContent) return;

    modalDynamicContent.innerHTML = `
      <div class="modal-project-header">
        <span class="modal-tag">${data.category}</span>
        <h2 id="modal-project-title" class="modal-project-title">${data.title}</h2>
        <div class="modal-meta"><span>${data.timeline}</span></div>
      </div>

      <div class="modal-grid">
        <div class="modal-main">
          <h3>Architecture &amp; Purpose</h3>
          <p class="modal-p" style="margin-top: 0.5rem; margin-bottom: 1.25rem;">${data.overview}</p>

          <h3 style="margin-bottom: 0.75rem;">Key Engineering Milestones</h3>
          <ul class="modal-list" style="display: flex; flex-direction: column; gap: 0.6rem; padding-left: 1.2rem; list-style: disc;">
            ${data.highlights.map(h => `<li style="color: var(--text-secondary); font-size: 0.95rem;">${h}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-sidebar">
          <div style="background: var(--bg-surface-elevated); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <h4>System Stack</h4>
            <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-secondary); margin-top: 0.5rem; line-height: 1.5;">${data.architecture}</p>
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem;">
              <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm btn-block">Launch Live Instance</a>
              <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm btn-block">Inspect Source Code</a>
            </div>
          </div>
        </div>
      </div>
    `;

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', 'true');
    }
  }

  // Bind project cards trigger
  document.querySelectorAll('.project-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const id = trigger.getAttribute('data-project-id');
      openProjectModal(id);
    });
  });

  // Modal Close
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    });
  }

  // Close on backdrop click
  if (modal) {
    modal.addEventListener('click', (e) => {
      const dialogDimensions = modal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        modal.close();
      }
    });
  }
}

/* ==========================================================================
   10. INTERACTIVE CLI TERMINAL ENGINE
   ========================================================================== */
function initInteractiveTerminal() {
  const terminalBtn = document.getElementById('terminal-toggle-btn');
  const terminalModal = document.getElementById('terminal-modal');
  const terminalCloseBtn = document.getElementById('terminal-close-btn');
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  if (!terminalModal || !terminalInput) return;

  function toggleTerminal() {
    const isOpen = terminalModal.classList.contains('is-open');
    if (isOpen) {
      terminalModal.classList.remove('is-open');
      terminalModal.setAttribute('aria-hidden', 'true');
    } else {
      terminalModal.classList.add('is-open');
      terminalModal.setAttribute('aria-hidden', 'false');
      setTimeout(() => terminalInput.focus(), 150);
    }
  }

  if (terminalBtn) terminalBtn.addEventListener('click', toggleTerminal);
  if (terminalCloseBtn) terminalCloseBtn.addEventListener('click', toggleTerminal);

  function printLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `t-line ${className}`;
    line.innerHTML = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  const commands = {
    'help': () => {
      printLine('Available Terminal Commands:');
      printLine('&bull; <span class="t-cmd">skills</span> &mdash; Output core engineering competencies');
      printLine('&bull; <span class="t-cmd">projects</span> &mdash; List active flagship architectural work');
      printLine('&bull; <span class="t-cmd">about</span> &mdash; Display biographic summary');
      printLine('&bull; <span class="t-cmd">contact</span> &mdash; Show direct communication endpoints');
      printLine('&bull; <span class="t-cmd">theme [dark|cyber|light]</span> &mdash; Switch visual stylesheet');
      printLine('&bull; <span class="t-cmd">matrix</span> &mdash; Trigger Matrix green terminal mode');
      printLine('&bull; <span class="t-cmd">whoami</span> &mdash; View current authenticated user');
      printLine('&bull; <span class="t-cmd">clear</span> &mdash; Clear current terminal buffer');
    },
    'skills': () => {
      printLine('<span class="t-cmd">Frontend:</span> TypeScript, Semantic HTML5, CSS Grid / Flexbox, WebGL, React 19');
      printLine('<span class="t-cmd">Backend:</span> Node.js, Go, PostgreSQL, Redis, GraphQL, gRPC');
      printLine('<span class="t-cmd">DevOps:</span> Docker, Kubernetes, AWS, Terraform, Cloudflare Workers');
    },
    'projects': () => {
      printLine('1. <span class="t-cmd">Nexus FinTech</span> - High-Frequency Trading Interface');
      printLine('2. <span class="t-cmd">Hyperion 3D</span> - WebGL Procedural Metaverse Engine');
      printLine('3. <span class="t-cmd">Prism AI</span> - Sub-40ms Vector Edge Search Pipeline');
      printLine('4. <span class="t-cmd">Zenith Design</span> - Multi-Brand CSS Token System');
    },
    'about': () => {
      printLine('Muhammad Usman &bull; Principal Systems Architect & Creative Technologist.');
      printLine('7+ years crafting ultra-high performance web software, zero-layout-shift UI, and scalable distributed cloud systems based in Islamabad, Pakistan.');
    },
    'contact': () => {
      printLine('Email: usman.dev@portfolio.pk');
      printLine('Location: Islamabad & Lahore, Pakistan');
      printLine('GitHub: github.com/muhammadusman-dev');
      printLine('LinkedIn: linkedin.com/in/muhammadusman-dev');
    },
    'whoami': () => {
      printLine('Guest Explorer &bull; IP: 127.0.0.1 (Authenticated via PK Portal Terminal)');
    },
    'matrix': () => {
      document.documentElement.setAttribute('data-theme', 'cyber');
      printLine('⚡ MATRIX PROTOCOL ACTIVATED.', 't-welcome');
    },
    'clear': () => {
      terminalOutput.innerHTML = '';
      printLine('Muhammad Usman CLI Terminal reset.', 't-welcome');
    }
  };

  if (terminalForm) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawInput = terminalInput.value.trim();
      if (!rawInput) return;

      printLine(`<span class="t-prompt">usman@pk:~$</span> ${escapeHtml(rawInput)}`);
      terminalInput.value = '';

      const parts = rawInput.toLowerCase().split(' ');
      const mainCmd = parts[0];
      const arg = parts[1];

      if (mainCmd === 'theme') {
        if (['dark', 'cyber', 'light'].includes(arg)) {
          document.documentElement.setAttribute('data-theme', arg);
          localStorage.setItem('mu_portfolio_theme', arg);
          printLine(`Theme switched to: ${arg}`);
        } else {
          printLine('Usage: theme [dark | cyber | light]');
        }
      } else if (commands[mainCmd]) {
        commands[mainCmd]();
      } else {
        printLine(`Command not found: "${escapeHtml(mainCmd)}". Type <span class="t-cmd">help</span> for available commands.`);
      }
    });
  }
}

/* ==========================================================================
   11. CONTACT FORM VALIDATION & TRANSMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const messageInput = document.getElementById('contact-message');
  const charCount = document.getElementById('char-count');
  const submitBtn = document.getElementById('form-submit-btn');
  const statusAlert = document.getElementById('form-status');

  if (!form) return;

  // Character counter
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      charCount.textContent = messageInput.value.length;
    });
  }

  // Live validation on blur
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateField(input, condition) {
    const parent = input.closest('.form-group');
    if (!condition) {
      parent.classList.add('has-error');
      return false;
    } else {
      parent.classList.remove('has-error');
      return true;
    }
  }

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      validateField(nameInput, nameInput.value.trim().length >= 2);
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      validateField(emailInput, validateEmail(emailInput.value.trim()));
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      validateField(messageInput, messageInput.value.trim().length >= 10);
    });
  }

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2);
    const isEmailValid = validateField(emailInput, validateEmail(emailInput.value.trim()));
    const isMsgValid = validateField(messageInput, messageInput.value.trim().length >= 10);

    if (!isNameValid || !isEmailValid || !isMsgValid) {
      showToast('Please correct highlighted fields before submitting.');
      return;
    }

    // Submit animation simulation
    submitBtn.classList.add('is-submitting');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('is-submitting');
      submitBtn.disabled = false;

      // Reset form
      form.reset();
      if (charCount) charCount.textContent = '0';

      // Show success alert
      if (statusAlert) {
        statusAlert.className = 'form-status-alert success';
        statusAlert.innerHTML = '<strong>Message Transmitted Successfully!</strong> Thank you for reaching out. Muhammad Usman will respond to your inquiry within 24 hours.';
        setTimeout(() => {
          statusAlert.style.display = 'none';
        }, 8000);
      }

      showToast('🚀 Transmission Received! Muhammad Usman will get in touch.');
    }, 1200);
  });
}

/* ==========================================================================
   12. BACK-TO-TOP & SCROLL PROGRESS INDICATOR
   ========================================================================== */
function initBackToTopAndProgress() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const circle = document.querySelector('.progress-ring__circle');
  if (!backToTopBtn || !circle) return;

  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollFraction = scrollTop / scrollHeight;

    const offset = circumference - (scrollFraction * circumference);
    circle.style.strokeDashoffset = offset;

    if (scrollTop > 350) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Resume Download Button Toast
  const resumeBtn = document.getElementById('hero-resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      showToast('📄 Curriculum Vitae download initiated (Muhammad_Usman_CV_2026.pdf)');
    });
  }
}

/* ==========================================================================
   13. CUSTOM CURSOR (MAGNETIC & HOVER STATES)
   ========================================================================== */
function initCustomCursor() {
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');

  if (!cursorDot || !cursorOutline || window.innerWidth < 768) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Smooth lerp trailing outline
  function renderCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover magnification
  const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .project-card, .bento-card, .contact-method-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ==========================================================================
   14. SYSTEM HEALTH & FPS MONITOR
   ========================================================================== */
function initSystemHealthMonitor() {
  const fpsElem = document.getElementById('fps-counter');
  if (!fpsElem) return;

  let frameCount = 0;
  let lastTime = performance.now();

  function countFPS(now) {
    frameCount++;
    if (now - lastTime >= 1000) {
      fpsElem.textContent = frameCount;
      frameCount = 0;
      lastTime = now;
    }
    requestAnimationFrame(countFPS);
  }
  requestAnimationFrame(countFPS);
}

/* ==========================================================================
   15. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-item');
  const skillMeters = document.querySelectorAll('.meter-bar-fill');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // If it contains skill meters, trigger animation
        if (entry.target.classList.contains('bento-frontend') || entry.target.querySelector('.meter-bar-fill')) {
          skillMeters.forEach(meter => meter.classList.add('animated'));
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   16. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="font-size: 1.1rem;">⚡</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('is-show');
  });

  setTimeout(() => {
    toast.classList.remove('is-show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 400);
  }, 4000);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
