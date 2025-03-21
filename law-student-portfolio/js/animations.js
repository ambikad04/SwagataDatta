document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes to elements
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionHeader = section.querySelector(".section-header")
    if (sectionHeader) {
      sectionHeader.classList.add("animate-on-scroll")
    }

    const cards = section.querySelectorAll(".timeline-card, .experience-card, .skills-card, .info-card")
    cards.forEach((card, index) => {
      card.classList.add("animate-on-scroll")
      card.style.transitionDelay = `${index * 0.1}s`
    })
  })

  // Initialize intersection observer for animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    observer.observe(element)
  })

  // Particle animation for hero section
  initParticles()
})

// Particle animation
function initParticles() {
  const heroSection = document.querySelector(".hero-section")
  if (!heroSection) return

  const canvas = document.createElement("canvas")
  canvas.className = "particles-canvas"
  canvas.style.position = "absolute"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.pointerEvents = "none"
  canvas.style.zIndex = "1"

  heroSection.appendChild(canvas)

  const ctx = canvas.getContext("2d")

  // Set canvas dimensions
  function setCanvasDimensions() {
    canvas.width = heroSection.offsetWidth
    canvas.height = heroSection.offsetHeight
  }

  setCanvasDimensions()
  window.addEventListener("resize", setCanvasDimensions)

  // Create particles
  const particles = []
  const particleCount = 50

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 5 + 1
      this.speedX = Math.random() * 1 - 0.5
      this.speedY = Math.random() * 1 - 0.5
      this.color = this.getRandomColor()
    }

    getRandomColor() {
      const colors = [
        "rgba(21, 61, 132, 0.1)", // Navy blue
        "rgba(212, 175, 55, 0.1)", // Gold
        "rgba(21, 61, 132, 0.05)", // Lighter navy
        "rgba(212, 175, 55, 0.05)", // Lighter gold
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x > canvas.width) this.x = 0
      else if (this.x < 0) this.x = canvas.width

      if (this.y > canvas.height) this.y = 0
      else if (this.y < 0) this.y = canvas.height
    }

    draw() {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  function init() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
    }

    // Connect particles with lines
    connectParticles()

    requestAnimationFrame(animate)
  }

  function connectParticles() {
    const maxDistance = 100

    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x
        const dy = particles[a].y - particles[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance
          ctx.strokeStyle = `rgba(21, 61, 132, ${opacity * 0.1})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particles[a].x, particles[a].y)
          ctx.lineTo(particles[b].x, particles[b].y)
          ctx.stroke()
        }
      }
    }
  }

  init()
  animate()
}

