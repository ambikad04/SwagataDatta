// Initialize Feather Icons
document.addEventListener("DOMContentLoaded", () => {
  // Initialize icons
  feather.replace()

  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Initialize theme
  initTheme()

  // Initialize navigation
  initNavigation()

  // Initialize carousel
  initCarousel()

  // Initialize tabs
  initTabs()

  // Initialize skill bars
  initSkillBars()

  // Initialize animations
  initAnimations()
})

// Theme Management
function initTheme() {
  const themeToggle = document.querySelector(".theme-toggle")
  const themeButtons = document.querySelectorAll(".theme-btn")

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme) {
    setTheme(savedTheme)
    setActiveThemeButton(savedTheme)
  } else {
    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      setActiveThemeButton("dark")
    } else {
      setTheme("light")
      setActiveThemeButton("light")
    }
  }

  // Add event listeners to theme buttons
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.getAttribute("data-theme")
      setTheme(theme)
      setActiveThemeButton(theme)
      localStorage.setItem("theme", theme)
    })
  })
}

function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode")
  } else if (theme === "light") {
    document.body.classList.remove("dark-mode")
  } else if (theme === "system") {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }
}

function setActiveThemeButton(theme) {
  const themeButtons = document.querySelectorAll(".theme-btn")
  themeButtons.forEach((button) => {
    if (button.getAttribute("data-theme") === theme) {
      button.classList.add("active")
    } else {
      button.classList.remove("active")
    }
  })
}

// Navigation
function initNavigation() {
  const header = document.querySelector(".header")
  const navLinks = document.querySelectorAll(".nav-link")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileNav = document.querySelector(".mobile-nav")
  const mobileNavClose = document.querySelector(".mobile-nav-close")

  // Handle scroll
  window.addEventListener("scroll", () => {
    // Add shadow to header on scroll
    if (window.scrollY > 0) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Update active nav link based on scroll position
    const scrollPosition = window.scrollY + 100

    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })

        mobileNavLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  })

  // Mobile menu toggle
  mobileMenuToggle.addEventListener("click", () => {
    mobileNav.classList.add("active")
    document.body.style.overflow = "hidden"
  })

  mobileNavClose.addEventListener("click", () => {
    mobileNav.classList.remove("active")
    document.body.style.overflow = ""
  })

  // Handle nav link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      })
    })
  })

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      })

      mobileNav.classList.remove("active")
      document.body.style.overflow = ""
    })
  })
}

// Logo Carousel
function initCarousel() {
  const slides = document.querySelectorAll(".carousel-slide")
  const dots = document.querySelectorAll(".dot")
  let currentSlide = 0

  // Show first slide
  slides[0].classList.add("active")

  // Auto rotate slides
  setInterval(() => {
    slides[currentSlide].classList.remove("active")
    dots[currentSlide].classList.remove("active")

    currentSlide = (currentSlide + 1) % slides.length

    slides[currentSlide].classList.add("active")
    dots[currentSlide].classList.add("active")
  }, 3000)

  // Handle dot clicks
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      slides[currentSlide].classList.remove("active")
      dots[currentSlide].classList.remove("active")

      currentSlide = index

      slides[currentSlide].classList.add("active")
      dots[currentSlide].classList.add("active")
    })
  })
}

// Tabs
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab")

      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to clicked button and corresponding pane
      button.classList.add("active")
      document.getElementById(tabId).classList.add("active")
    })
  })
}

// Skill Bars Animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")
  const languageBars = document.querySelectorAll(".language-progress")

  // Initialize skill bars with width 0
  skillBars.forEach((bar) => {
    bar.style.width = "0"
  })

  languageBars.forEach((bar) => {
    bar.style.width = "0"
  })

  // Animate skill bars on scroll
  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const barPosition = bar.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (barPosition < screenPosition) {
        const width = bar.getAttribute("data-width")
        bar.style.width = `${width}%`
      }
    })

    languageBars.forEach((bar) => {
      const barPosition = bar.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (barPosition < screenPosition) {
        const width = bar.getAttribute("data-width")
        bar.style.width = `${width}%`
      }
    })
  }

  // Initial check
  animateSkillBars()

  // Check on scroll
  window.addEventListener("scroll", animateSkillBars)
}

// Animations
function initAnimations() {
  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.classList.add("animated")
      }
    })
  }

  // Initial check
  animateOnScroll()

  // Check on scroll
  window.addEventListener("scroll", animateOnScroll)
}

// Toast Notifications
const feather = require("feather-icons")

function showToast(type, title, message, duration = 5000) {
  const toastContainer = document.querySelector(".toast-container")

  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  const icon = type === "success" ? "check-circle" : "alert-circle"

  toast.innerHTML = `
    <div class="toast-icon">
      <i data-feather="${icon}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">
      <i data-feather="x"></i>
    </button>
  `

  toastContainer.appendChild(toast)
  feather.replace()

  // Add close event
  const closeButton = toast.querySelector(".toast-close")
  closeButton.addEventListener("click", () => {
    toast.style.animation = "slideOut 0.3s ease forwards"
    setTimeout(() => {
      toast.remove()
    }, 300)
  })

  // Auto remove after duration
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = "slideOut 0.3s ease forwards"
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove()
        }
      }, 300)
    }
  }, duration)
}

