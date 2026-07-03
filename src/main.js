import './styles.css';
import { portfolioData } from './data.js';

// GSAP Imports
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Lucide Icons Import
import { 
  createIcons, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Zap, 
  Smartphone, 
  Code2, 
  FileText 
} from 'lucide';

/* ==========================================
 * 1. DOM POPULATION & RENDERING
 * ========================================== */
function initDOM() {
  const data = portfolioData;

  // Hero Section
  document.getElementById('heroName').textContent = data.personal.name;
  document.getElementById('heroTagline').textContent = data.personal.tagline;
  document.getElementById('heroVisualImg').src = data.personal.heroVisual;
  document.getElementById('heroBtnProjects').href = "#projects";
  document.getElementById('heroBtnContact').href = "#contact";

  // About Section
  const bioContainer = document.getElementById('bioContainer');
  bioContainer.innerHTML = '';
  data.personal.bio.forEach(para => {
    const p = document.createElement('p');
    p.className = 'bio-p';
    p.textContent = para;
    bioContainer.appendChild(p);
  });

  const aboutSkillsQuick = document.getElementById('aboutSkillsQuick');
  if (aboutSkillsQuick) {
    aboutSkillsQuick.innerHTML = '';
    // Flatten all skills to display them as responsive tags
    const allSkills = [];
    data.skills.forEach(category => {
      category.items.forEach(item => {
        allSkills.push(item.name);
      });
    });
    // Render up to 8 skill tags for visual balance
    allSkills.slice(0, 8).forEach(skillName => {
      const tag = document.createElement('div');
      tag.className = 'skill-tag hover-glow';
      tag.innerHTML = `<span>${skillName}</span>`;
      aboutSkillsQuick.appendChild(tag);
    });
  }

  // Experience Section (Timeline)
  const timelineContainer = document.getElementById('timelineItemsContainer');
  timelineContainer.innerHTML = '';
  // Experience
  data.experience.forEach((exp) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card glass-card hover-glow">
        <span class="timeline-badge badge-work">Experience</span>
        <div class="timeline-meta">
          <h3 class="timeline-role">${exp.role}</h3>
          <span class="timeline-company">${exp.company}</span>
          <span class="timeline-period">${exp.period}</span>
        </div>
        <ul class="timeline-desc">
          ${exp.points.map(point => `<li>${point}</li>`).join('')}
        </ul>
      </div>
    `;
    timelineContainer.appendChild(item);
  });

  // Education
  data.education.forEach((edu) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card glass-card hover-glow">
        <span class="timeline-badge badge-edu">Education</span>
        <div class="timeline-meta">
          <h3 class="timeline-role">${edu.degree}</h3>
          <span class="timeline-company">${edu.institution}</span>
          <span class="timeline-period">${edu.period}</span>
        </div>
        <ul class="timeline-desc">
          <li>${edu.details}</li>
        </ul>
      </div>
    `;
    timelineContainer.appendChild(item);
  });

  // Projects Section
  const projectsContainer = document.getElementById('projectsContainer');
  projectsContainer.innerHTML = '';
  data.projects.forEach(proj => {
    const pCard = document.createElement('div');
    pCard.className = 'project-card';
    pCard.innerHTML = `
      <div class="project-inner glass-card">
        <div class="project-image-wrapper">
          <img src="${proj.image}" alt="${proj.title}" class="project-img" />
          <div class="project-overlay">
            <span class="project-category">${proj.category}</span>
          </div>
        </div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tech">
          ${proj.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${proj.liveLink}" class="project-link-btn magnetic" target="_blank">
            <span>Demo</span>
            <i data-lucide="arrow-right"></i>
          </a>
          <a href="${proj.codeLink}" class="project-link-btn magnetic" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span>Code</span>
          </a>
        </div>
      </div>
    `;
    projectsContainer.appendChild(pCard);
  });

  // Skills Section
  const skillsContainer = document.getElementById('skillsContainer');
  skillsContainer.innerHTML = '';
  
  data.skills.forEach(skillCategory => {
    const catCard = document.createElement('div');
    catCard.className = 'skills-category-card glass-card';
    
    let listContent = '';
    
    // Tools category displays as badges instead of progress bars
    if (skillCategory.category === 'Tools & Concepts') {
      listContent = `
        <div class="skills-list badges-list">
          ${skillCategory.items.map(skill => `
            <div class="skill-badge hover-glow">${skill.name}</div>
          `).join('')}
        </div>
      `;
    } else {
      listContent = `
        <div class="skills-list">
          ${skillCategory.items.map(skill => `
            <div class="skill-item">
              <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percent">${skill.percentage}%</span>
              </div>
              <div class="skill-track">
                <div class="skill-progress" data-percentage="${skill.percentage}"></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    catCard.innerHTML = `
      <h3>${skillCategory.category}</h3>
      ${listContent}
    `;
    
    skillsContainer.appendChild(catCard);
  });

  // Contact Info
  const contactMethods = document.getElementById('contactMethods');
  contactMethods.innerHTML = `
    <div class="contact-method-item">
      <i data-lucide="mail" class="contact-method-icon"></i>
      <div class="contact-method-text">
        <h4>Email</h4>
        <p><a href="mailto:${data.contact.email}">${data.contact.email}</a></p>
      </div>
    </div>
    <div class="contact-method-item">
      <i data-lucide="phone" class="contact-method-icon"></i>
      <div class="contact-method-text">
        <h4>Phone</h4>
        <p><a href="tel:${data.contact.phone}">${data.contact.phone}</a></p>
      </div>
    </div>
    <div class="contact-method-item">
      <i data-lucide="map-pin" class="contact-method-icon"></i>
      <div class="contact-method-text">
        <h4>Location</h4>
        <p>${data.contact.location}</p>
      </div>
    </div>
    <div class="contact-method-item">
      <i data-lucide="file-text" class="contact-method-icon"></i>
      <div class="contact-method-text">
        <h4>Resume</h4>
        <p><a href="${data.personal.cvUrl}" class="gradient-text font-bold hover:underline" download>Download CV / Resume</a></p>
      </div>
    </div>
  `;

  // Footer Social links
  const footerSocials = document.getElementById('footerSocials');
  footerSocials.innerHTML = `
    <a href="${data.contact.github}" class="footer-social-icon magnetic" target="_blank" aria-label="GitHub">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
    </a>
    <a href="${data.contact.linkedin}" class="footer-social-icon magnetic" target="_blank" aria-label="LinkedIn">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
    </a>
  `;

  // Current Year
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Create Lucide Icons
  createIcons({
    icons: {
      ArrowRight,
      Mail,
      Phone,
      MapPin,
      Send,
      Zap,
      Smartphone,
      Code2,
      FileText
    }
  });
}

/* ==========================================
 * 2. CUSTOM CURSOR PHYSICS
 * ========================================== */
function initCustomCursor() {
  const dot = document.getElementById('customCursorDot');
  const outline = document.getElementById('customCursorOutline');
  
  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let outlineX = 0;
  let outlineY = 0;
  
  const delay = 0.15; // trailing factor
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Custom animation loop using requestAnimationFrame
  function tick() {
    // Instant dot movement
    dotX += (mouseX - dotX);
    dotY += (mouseY - dotY);
    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
    
    // Delayed trailing outline movement
    outlineX += (mouseX - outlineX) * delay;
    outlineY += (mouseY - outlineY) * delay;
    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  
  // Cursor scaling hover triggers
  const interactiveSelectors = 'a, button, input, textarea, .project-inner, .highlight-card, .skill-badge';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      document.body.classList.add('cursor-hover');
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    if (!e.target.closest(interactiveSelectors)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

/* ==========================================
 * 3. MAGNETIC HOVER EFFECT
 * ========================================== */
function initMagneticElements() {
  const magneticItems = document.querySelectorAll('.magnetic');
  
  magneticItems.forEach(item => {
    item.addEventListener('mousemove', function(e) {
      const boundBox = this.getBoundingClientRect();
      const itemX = boundBox.left + boundBox.width / 2;
      const itemY = boundBox.top + boundBox.height / 2;
      
      const magnetStrength = 15; // max pixels offset
      
      const moveX = (e.clientX - itemX) / (boundBox.width / 2) * magnetStrength;
      const moveY = (e.clientY - itemY) / (boundBox.height / 2) * magnetStrength;
      
      gsap.to(this, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Also shift child text slightly
      const child = this.querySelector('span, i');
      if (child) {
        gsap.to(child, {
          x: moveX * 0.3,
          y: moveY * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
    
    item.addEventListener('mouseleave', function() {
      gsap.to(this, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
      
      const child = this.querySelector('span, i');
      if (child) {
        gsap.to(child, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      }
    });
  });
}

/* ==========================================
 * 4. 3D CARD TILT EFFECT
 * ========================================== */
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    const inner = card.querySelector('.project-inner');
    
    card.addEventListener('mousemove', function(e) {
      const boundBox = this.getBoundingClientRect();
      
      const mouseX = e.clientX - boundBox.left;
      const mouseY = e.clientY - boundBox.top;
      
      // Calculate tilt angles (limit max angle to 10 degrees)
      const maxTilt = 10;
      const rotateY = ((mouseX / boundBox.width) - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - (mouseY / boundBox.height)) * maxTilt * 2;
      
      // Glow coordinates
      const pctX = (mouseX / boundBox.width) * 100;
      const pctY = (mouseY / boundBox.height) * 100;
      
      gsap.to(inner, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.2
      });
      
      inner.style.setProperty('--tilt-x', `${pctX}%`);
      inner.style.setProperty('--tilt-y', `${pctY}%`);
    });
    
    card.addEventListener('mouseleave', function() {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        ease: 'power2.out',
        duration: 0.5
      });
    });
  });
}

/* ==========================================
 * 5. GSAP SCROLL & LOAD ANIMATIONS
 * ========================================== */
function initScrollAnimations() {
  // Hero load animations
  const tlHero = gsap.timeline();
  tlHero.from('#heroBadge', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .from('.reveal-line', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.reveal-name', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .from('#heroTagline', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.hero-actions', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.hero-visual-card', {
    scale: 0.8,
    opacity: 0,
    rotationY: -30,
    rotationX: 30,
    duration: 1.2,
    ease: 'power3.out'
  }, '-=1');

  // General scroll reveal sections
  document.querySelectorAll('.scroll-reveal').forEach(section => {
    const header = section.querySelector('.section-header');
    const content = section.querySelectorAll('.glass-card, .highlight-card, .timeline-item, .project-card');
    
    const tlReveal = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    if (header) {
      tlReveal.from(header, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    if (content.length > 0) {
      tlReveal.from(content, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.5');
    }
  });

  // Timeline Scroll progress
  gsap.fromTo('#timelineProgress', 
    { height: '0%' }, 
    {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 20%',
        end: 'bottom 80%',
        scrub: true
      }
    }
  );

  // Activate Timeline Items on Scroll
  document.querySelectorAll('.timeline-item').forEach(item => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 50%',
      onEnter: () => item.classList.add('active'),
      onLeaveBack: () => item.classList.remove('active')
    });
  });

  // Skill Fill Bars reveal
  ScrollTrigger.create({
    trigger: '#skills',
    start: 'top 70%',
    onEnter: () => {
      document.querySelectorAll('.skill-progress').forEach(bar => {
        const pct = bar.getAttribute('data-percentage');
        bar.style.width = `${pct}%`;
      });
    }
  });

  // Sync navigation active links with scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobLinks = document.querySelectorAll('.mobile-nav .mobile-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    // Update Desktop Nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Update Mobile Nav links
    mobLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================
 * 6. NAVIGATION MENUS (MOBILE) & FORM EVENTS
 * ========================================== */
function initInteractivity() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileDrawer.classList.toggle('active');
  }

  mobileMenuBtn.addEventListener('click', toggleMenu);
  
  mobLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formSubmitBtn = document.getElementById('formSubmitBtn');
  const formFeedback = document.getElementById('formFeedback');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const originalBtnText = formSubmitBtn.innerHTML;
    formSubmitBtn.disabled = true;
    formSubmitBtn.innerHTML = `<span>Sending...</span>`;
    
    showToast('info', '📨 Sending...', 'Your message is being delivered.');
    
    setTimeout(() => {
      formFeedback.textContent = "Thank you! Your message was sent successfully.";
      formFeedback.className = "form-feedback-message success";
      
      formSubmitBtn.disabled = false;
      formSubmitBtn.innerHTML = originalBtnText;
      contactForm.reset();
      
      showToast('success', '✅ Message Sent!', 'Thanks for reaching out. Vraj will respond shortly.');
      
      setTimeout(() => {
        formFeedback.textContent = "";
        formFeedback.className = "form-feedback-message";
      }, 5000);
      
    }, 1500);
  });

  // Click-to-copy on email and phone contact cards
  document.querySelectorAll('.contact-method-item').forEach(item => {
    item.addEventListener('click', function() {
      const link = this.querySelector('a[href^="mailto:"], a[href^="tel:"]');
      if (link) {
        const value = link.textContent.trim();
        navigator.clipboard.writeText(value).then(() => {
          showToast('success', '📋 Copied!', `"${value}" copied to your clipboard.`);
        }).catch(() => {
          showToast('info', 'ℹ️ Info', `${value}`);
        });
      }
    });
    item.style.cursor = 'pointer';
  });

  // Resume download button toast
  document.querySelectorAll('a[download]').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('purple', '📄 Resume', 'Downloading Vraj\'s resume...');
    });
  });
}

/* ==========================================
 * 7. INTERACTIVE TERMINAL LOGIC
 * ========================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalBody = document.getElementById('terminalBody');
  const data = portfolioData;

  if (!terminalInput || !terminalOutput || !terminalBody) return;

  terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const command = this.value.trim().toLowerCase();
      this.value = '';
      
      const promptLine = document.createElement('div');
      promptLine.className = 'terminal-line';
      promptLine.innerHTML = `<span class="prompt">vraj@portfolio:~$</span> ${command}`;
      terminalOutput.appendChild(promptLine);
      
      const responseLine = document.createElement('div');
      responseLine.className = 'terminal-line';
      
      switch (command) {
        case 'help':
          responseLine.innerHTML = `
            Available commands:<br>
            - <span class="cmd-highlight">about</span>: Details about Vraj<br>
            - <span class="cmd-highlight">skills</span>: List key tech stacks<br>
            - <span class="cmd-highlight">projects</span>: Active development projects<br>
            - <span class="cmd-highlight">contact</span>: Access social and email links<br>
            - <span class="cmd-highlight">clear</span>: Flush console history
          `;
          break;
        case 'about':
          responseLine.innerHTML = `
            Vraj Rabadiya - Frontend Developer & BCA Student at Sutex Bank College, Surat.<br>
            Tagline: ${data.personal.tagline}<br>
            Location: ${data.contact.location}
          `;
          break;
        case 'skills':
          responseLine.innerHTML = `
            Key Tech Stack:<br>
            - Core Frontend: HTML & CSS, JavaScript, Responsive Web Design<br>
            - Backend & DB: MongoDB, Shopify Liquid<br>
            - Tools & Concepts: Git & GitHub, Modern Tools (AI APIs, ChatGPT, Antigravity, Perplexity), System Design, Project Leadership, Problem-Solving
          `;
          break;
        case 'projects':
          responseLine.innerHTML = data.projects.map(p => `- <strong>${p.title}</strong>: ${p.category}`).join('<br>');
          break;
        case 'contact':
          responseLine.innerHTML = `
            Email: <a href="mailto:${data.contact.email}">${data.contact.email}</a><br>
            GitHub: <a href="${data.contact.github}" target="_blank">${data.contact.github}</a><br>
            LinkedIn: <a href="${data.contact.linkedin}" target="_blank">${data.contact.linkedin}</a>
          `;
          break;
        case 'clear':
          terminalOutput.innerHTML = '';
          responseLine.remove();
          showToast('info', '🗑️ Cleared', 'Terminal history flushed.');
          break;
        default:
          responseLine.innerHTML = `Command not found: "${command}". Type <span class="cmd-highlight">help</span> to view lists.`;
          showToast('warning', '⚠️ Unknown Command', `"${command}" is not recognized.`);
      }
      
      if (command !== 'clear') {
        terminalOutput.appendChild(responseLine);
      }
      
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });
}

/* ==========================================
 * 8. TOAST NOTIFICATION SYSTEM
 * ========================================== */
function showToast(type, title, message, duration = 4000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = {
    success: '✓',
    info: 'ℹ',
    warning: '!',
    purple: '★'
  };

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon ${type}">${icons[type] || 'ℹ'}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
  `;

  container.appendChild(toast);

  // Auto-remove after duration
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 400);
  }, duration);

  // Click to dismiss
  toast.addEventListener('click', () => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 400);
  });
}

/* ==========================================
 * 9. WELCOME MODAL WITH STAT COUNTERS
 * ========================================== */
function initWelcomeModal() {
  const modal = document.getElementById('welcomeModal');
  const enterBtn = document.getElementById('modalEnterBtn');
  if (!modal) return;

  // Animate stat counters
  const statNumbers = modal.querySelectorAll('.stat-number');
  statNumbers.forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current;
    }, 40);
  });

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      showToast('purple', '🚀 Welcome!', 'Explore the portfolio. Try the interactive terminal!');
    }, 600);
  }

  // Close on button click
  enterBtn.addEventListener('click', closeModal);

  // Close on overlay click (outside card)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Enter or Escape key
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === 'Escape') && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Prevent body scroll while modal is open
  document.body.style.overflow = 'hidden';
}

/* ==========================================
 * 10. SECTION SCROLL NOTIFICATIONS
 * ========================================== */
function initSectionNotifications() {
  const sectionMessages = {
    about:      { icon: 'info',    title: '👤 About Section', msg: 'Learn more about Vraj\'s background.' },
    projects:   { icon: 'purple',  title: '🛠️ Projects', msg: 'Hover over cards for 3D tilt effect!' },
    skills:     { icon: 'success', title: '⚡ Skills', msg: 'Watch the progress bars fill up.' },
    terminal:   { icon: 'info',    title: '💻 Terminal', msg: 'Try typing "help" in the console below.' },
    contact:    { icon: 'purple',  title: '📬 Contact', msg: 'Click email or phone to copy instantly.' }
  };

  const fired = new Set();

  Object.entries(sectionMessages).forEach(([id, toast]) => {
    const section = document.getElementById(id);
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      once: true,
      onEnter: () => {
        if (!fired.has(id)) {
          fired.add(id);
          showToast(toast.icon, toast.title, toast.msg, 3500);
        }
      }
    });
  });
}

/* ==========================================
 * 11. APPLICATION INITIALIZATION
 * ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  initDOM();
  initWelcomeModal();
  initCustomCursor();
  initMagneticElements();
  initCardTilt();
  initScrollAnimations();
  initInteractivity();
  initTerminal();
  initSectionNotifications();
});
