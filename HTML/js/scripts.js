document.addEventListener('DOMContentLoaded', function() {
  // 1. Animación al hacer scroll
  const animateOnScroll = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const isOdd = section.classList.contains('section-odd');
          
          if (isOdd) {
            section.classList.add('slide-in-left');
          } else {
            section.classList.add('slide-in-right');
          }
          
          setTimeout(() => {
            section.classList.add('active');
          }, 50);
          
          observer.unobserve(section);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section:not(#inicio)');
    sections.forEach(section => {
      observer.observe(section);
    });
  };

  // 2. Navegación suave
  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // 3. Efecto navbar al hacer scroll
  const navbarScrollEffect = () => {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  };

  // 4. Configuración del formulario de contacto
  const setupContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Formulario enviado con éxito. ¡Gracias por tu mensaje!');
        this.reset();
      });
    }
  };

  // Inicializar todas las funciones
  const init = () => {
    animateOnScroll();
    smoothScroll();
    navbarScrollEffect();
    setupContactForm();
  };

  init();
});
