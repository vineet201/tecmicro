// Sidebar functionality
const hamburger = document.getElementById("hamburger")
const sidebar = document.getElementById("sidebar")
const sidebarOverlay = document.getElementById("sidebar-overlay")
const closeSidebar = document.getElementById("close-sidebar")

// Wave text animation on scroll
const observeWaveText = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.classList.add('animate');
        
        // Remove animation class after 3 seconds
        setTimeout(() => {
          element.classList.remove('animate');
        }, 3000);
        
        // Stop observing after animation is triggered
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the element is visible
  });

  // Observe all wave-text elements
  document.querySelectorAll('.wave-text').forEach(text => {
    observer.observe(text);
  });
};

// Initialize wave text animation
document.addEventListener('DOMContentLoaded', observeWaveText);

function openSidebar() {
  sidebar.classList.add("open")
  sidebarOverlay.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeSidebarFunc() {
  sidebar.classList.remove("open")
  sidebarOverlay.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Event listeners (guard for pages where elements are absent)
if (hamburger) hamburger.addEventListener("click", openSidebar)
if (closeSidebar) closeSidebar.addEventListener("click", closeSidebarFunc)
if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebarFunc)

// Close sidebar on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar && sidebar.classList.contains("open")) {
    closeSidebarFunc()
  }
})

// Smooth scrolling for sidebar links
if (document.querySelector('.sidebar-nav')) {
  document.querySelectorAll('.sidebar-nav a').forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      if (href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          closeSidebarFunc()
          setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 300)
        }
      } else {
        closeSidebarFunc()
      }
    })
  })
}

// Header hide/show on scroll with blur effect
let lastScrollTop = 0
let scrollTimeout = null
const header = document.querySelector(".header")

function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Get all hero sections: .hero, .hero2, .hero3, .ganga-hero, .who-we-are-hero, .connect-split-hero
  const heroSections = [
    document.querySelector(".hero"),
    document.querySelector(".hero2"),
    document.querySelector(".who-we-are-hero"),
    document.querySelector(".ganga-hero"),
    document.querySelector(".upcoming-expeditions-section"),
    document.querySelector(".connect-split-hero"), // Add connect page hero
  ].filter(Boolean)

  // Find the first hero section that exists
  let heroHeight = 0
  if (heroSections.length > 0) {
    heroHeight = heroSections[0].offsetHeight
  }
  const halfHeroHeight = heroHeight / 2

  // Add a small buffer to prevent jittery transitions
  const buffer = 10

  // Logic for applying/removing blur effect
  // This applies to all headers, but CSS will define the visual outcome for .ganga-page
  if (scrollTop > halfHeroHeight + buffer) {
    if (!header.classList.contains("header-blurred")) {
      header.classList.add("header-blurred")
    }
  } else if (scrollTop < halfHeroHeight - buffer) {
    if (header.classList.contains("header-blurred")) {
      header.classList.remove("header-blurred")
    }
  }

  // Universal hide/show header logic
  // This applies to all headers, including ganga-page
  if (scrollTop <= 100) {
    // At the very top, always show
    header.classList.remove("header-hidden")
    header.classList.add("header-visible")
  } else {
    // Scrolling down
    if (scrollTop > lastScrollTop) {
      header.classList.add("header-hidden")
      header.classList.remove("header-visible")
    }
    // Scrolling up
    else if (scrollTop < lastScrollTop) {
      header.classList.remove("header-hidden")
      header.classList.add("header-visible")
    }
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop // For Mobile or negative scrolling
}

// Throttle scroll events for better performance
function throttledScroll() {
  if (scrollTimeout) {
    return
  }

  scrollTimeout = setTimeout(() => {
    handleScroll()
    scrollTimeout = null
  }, 10)
}

// Add scroll event listener
window.addEventListener("scroll", throttledScroll, { passive: true })

// Course cards gradient animation
function setupCourseCardsAnimation() {
  const courseCards = document.querySelectorAll(".course-card")
  const coursesSection = document.querySelector(".courses-section")

  if (!coursesSection || courseCards.length === 0) return

  // Create intersection observer for the courses section
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation class to all course cards with staggered delay
          courseCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("animate-gradients")
            }, index * 200) // 200ms delay between each card
          })
        } else {
          // Remove animation class when section is out of view
          courseCards.forEach((card) => {
            card.classList.remove("animate-gradients")
          })
        }
      })
    },
    {
      threshold: 0.3, // Trigger when 30% of the section is visible
      rootMargin: "-50px 0px", // Add some margin for better timing
    },
  )

  observer.observe(coursesSection)
}

// Contact section animation
function setupContactAnimation() {
  const contactTitle = document.querySelector(".contact-title")
  const contactForm = document.querySelector(".contact-form")
  const contactSection = document.querySelector(".contact-section")

  if (!contactSection || !contactTitle || !contactForm) return

  // Create intersection observer for the contact section
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation classes with staggered timing
          setTimeout(() => {
            contactTitle.classList.add("animate-contact")
          }, 100)

          setTimeout(() => {
            contactForm.classList.add("animate-contact")
          }, 400)
        } else {
          // Remove animation classes when section is out of view
          contactTitle.classList.remove("animate-contact")
          contactForm.classList.remove("animate-contact")
        }
      })
    },
    {
      threshold: [0.1, 0.2, 0.3], // Multiple thresholds for different screen sizes
      rootMargin: "-10% 0px -10% 0px", // Percentage-based margins work better across devices
    },
  )

  observer.observe(contactSection)
}

// Floating label functionality
function setupFloatingLabels() {
  const formGroups = document.querySelectorAll(".form-group")

  formGroups.forEach((group) => {
    const input = group.querySelector(".form-input, .form-textarea")
    const label = group.querySelector(".form-label")

    if (!input || !label) return

    // Function to check if field has content
    function hasContent() {
      return input.value.trim() !== ""
    }

    // Function to update label position
    function updateLabel() {
      if (document.activeElement === input || hasContent()) {
        label.classList.add("active")
      } else {
        label.classList.remove("active")
      }
    }

    // Initial check
    updateLabel()

    // Event listeners
    input.addEventListener("focus", updateLabel)
    input.addEventListener("blur", updateLabel)
    input.addEventListener("input", updateLabel)

    // For autofill detection
    input.addEventListener("change", updateLabel)
  })
}

// Initialize autosize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  setupAutosizeTextarea()
})

// Auto-expand the message textarea instead of showing a scrollbar
function setupAutosizeTextarea() {
  const ta = document.getElementById("message")
  if (!ta) return
  const autosize = () => {
    ta.style.height = "auto"
    ta.style.height = `${ta.scrollHeight}px`
  }
  // Initialize and bind
  autosize()
  ta.addEventListener("input", autosize)
}

// Auto-update copyright year
function updateCopyrightYear() {
  const currentYear = new Date().getFullYear()
  const yearElement = document.getElementById("current-year")
  if (yearElement) {
    yearElement.textContent = currentYear
  }
}

// Form submission
document.querySelector(".contact-form")?.addEventListener("submit", function (e) {
  e.preventDefault()
  alert("Thank you for your message! We'll get back to you soon.")
  this.reset()

  // Reset floating labels after form reset
  setTimeout(() => {
    setupFloatingLabels()
  setupAutosizeTextarea()
  }, 100)
})

// Search functionality
document.querySelector(".search-btn")?.addEventListener("click", () => {
  const searchValue = document.querySelector(".search-input")?.value
  if (searchValue && searchValue.trim()) {
    alert(`Searching for: ${searchValue}`)
  }
})

document.querySelector(".search-input")?.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const searchValue = this.value
    if (searchValue.trim()) {
      alert(`Searching for: ${searchValue}`)
    }
  }
})

// Typewriter effect for quote
function typeWriter() {
  const lines = ["Tell me and I forget.", "Teach me and I remember.", "Involve me and I learn.", "-Benjamin Franklin"]

  const quoteTextElement = document.querySelector(".quote-text")
  const quoteAuthorElement = document.querySelector(".quote-author")
  const quoteBox = document.querySelector(".quote-box")

  if (!quoteTextElement || !quoteAuthorElement || !quoteBox) return

  // Helper to toggle cursor on the actively typing line only
  function setActiveCursorOnParagraph(pEl) {
    // Remove cursor from all existing paragraphs
    quoteTextElement.querySelectorAll("p.typing-line").forEach(p => p.classList.remove("typing-line"))
    // Remove cursor from author while typing quote lines
    quoteAuthorElement.classList.remove("typing-line")
    if (pEl) pEl.classList.add("typing-line")
  }

  function setActiveCursorOnAuthor() {
    // Remove cursor from all paragraphs
    quoteTextElement.querySelectorAll("p.typing-line").forEach(p => p.classList.remove("typing-line"))
    // Ensure span exists
    let authorTextSpan = quoteAuthorElement.querySelector('.author-text')
    if (!authorTextSpan) {
      authorTextSpan = document.createElement('span')
      authorTextSpan.className = 'author-text'
      quoteAuthorElement.textContent = ''
      quoteAuthorElement.appendChild(authorTextSpan)
    }
    // Show cursor on author span
    quoteAuthorElement.querySelectorAll('.author-text.typing-line').forEach(s => s.classList.remove('typing-line'))
    authorTextSpan.classList.add('typing-line')
  }

  // Content is already empty from HTML
  let lineIndex = 0
  let charIndex = 0
  let currentElement = quoteTextElement

  function typeNextChar() {
    if (lineIndex < lines.length) {
      const currentLine = lines[lineIndex]

      // Switch to author element for the last line
      if (lineIndex === 3) {
        // Ensure a dedicated span exists to hold author text content
        let authorTextSpan = quoteAuthorElement.querySelector('.author-text')
        if (!authorTextSpan) {
          authorTextSpan = document.createElement('span')
          authorTextSpan.className = 'author-text'
          // Clear any placeholders and append span
          quoteAuthorElement.textContent = ''
          quoteAuthorElement.appendChild(authorTextSpan)
        }
        currentElement = authorTextSpan
        setActiveCursorOnAuthor()
      }

      if (charIndex < currentLine.length) {
        // Add character
        if (lineIndex < 3) {
          // For quote lines, wrap in <p> tags
          const existingPs = currentElement.querySelectorAll("p")
          if (existingPs.length <= lineIndex) {
            const newP = document.createElement("p")
            // Add class for lighter font weight for first three lines
            if (lineIndex < 2) {
              newP.className = "quote-light"
              newP.textContent = currentLine.substring(0, charIndex + 1)
            } else if (lineIndex === 2) {
              // Third line: "Involve me and I learn."
              // Split for bold effect
              const beforeBold = "Involve me and "
              const boldPart = "I learn"
              const afterBold = "."
              if (charIndex < beforeBold.length) {
                newP.className = "quote-light"
                newP.innerHTML = currentLine.substring(0, charIndex + 1)
              } else if (charIndex < beforeBold.length + boldPart.length) {
                newP.innerHTML = beforeBold + '<span class="quote-bold">' + boldPart.substring(0, charIndex - beforeBold.length + 1) + '</span>'
                newP.className = "quote-light"
              } else {
                newP.innerHTML = beforeBold + '<span class="quote-bold">' + boldPart + '</span>' + afterBold.substring(0, charIndex - (beforeBold.length + boldPart.length) + 1)
                newP.className = "quote-light"
              }
            }
            currentElement.appendChild(newP)
            setActiveCursorOnParagraph(newP)
          } else {
            const currentP = existingPs[lineIndex]
            if (lineIndex < 2) {
              currentP.className = "quote-light"
              currentP.textContent = currentLine.substring(0, charIndex + 1)
            } else if (lineIndex === 2) {
              const beforeBold = "Involve me and "
              const boldPart = "I learn"
              const afterBold = "."
              if (charIndex < beforeBold.length) {
                currentP.className = "quote-light"
                currentP.innerHTML = currentLine.substring(0, charIndex + 1)
              } else if (charIndex < beforeBold.length + boldPart.length) {
                currentP.innerHTML = beforeBold + '<span class="quote-bold">' + boldPart.substring(0, charIndex - beforeBold.length + 1) + '</span>'
                currentP.className = "quote-light"
              } else {
                currentP.innerHTML = beforeBold + '<span class="quote-bold">' + boldPart + '</span>' + afterBold.substring(0, charIndex - (beforeBold.length + boldPart.length) + 1)
                currentP.className = "quote-light"
              }
            }
            setActiveCursorOnParagraph(currentP)
          }
        } else {
          // For author line (write into span)
          currentElement.textContent = currentLine.substring(0, charIndex + 1)
          quoteAuthorElement.className = "quote-author quote-light"
        }

  charIndex++
  setTimeout(typeNextChar, 25) // Faster typing speed
      } else {
        // Move to next line
        lineIndex++
        charIndex = 0
        setTimeout(typeNextChar, 150) // Shorter pause between lines
      }
    } else {
  // Typing complete - keep cursor "space" on the final line to avoid layout shift
  quoteTextElement.querySelectorAll("p.typing-line").forEach(p => p.classList.remove("typing-line"))
  // Leave typing-line on the author span; CSS hides its visual while preserving width
  quoteBox.classList.add("typing-complete")
    }
  }

  typeNextChar()
}

// Start typewriter effect after quote box animation
function startTypewriter() {
  setTimeout(() => {
    typeWriter()
  }, 1200) // Reduced from 1700 to 1200 for faster start
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
  startTypewriter()
  updateCopyrightYear() // Update copyright year on page load
  setupCourseCardsAnimation() // Setup course cards animation
  setupContactAnimation() // Setup contact section animation
  setupFloatingLabels() // Setup floating label functionality
})

// Logo Animation (disabled hover effect per request)
const wrapper = document.getElementById("logoWrapper")
const logotype = document.getElementById("logotype")
const monogram = document.getElementById("monogram")
const DISABLE_LOGO_HOVER_ANIMATION = true
if (!DISABLE_LOGO_HOVER_ANIMATION && wrapper && logotype && monogram) {
  let hoverActive = false
  let enterTimeout
  wrapper.addEventListener("mouseenter", () => {
    if (header.classList.contains("header-blurred") || window.location.pathname.includes("who-we-are.html")) return
    hoverActive = true
    logotype.style.transform = "scaleX(1) scaleY(3)"
    logotype.style.opacity = "1"
    clearTimeout(enterTimeout)
    enterTimeout = setTimeout(() => {
      if (hoverActive && !header.classList.contains("header-blurred")) {
        logotype.style.transform = "scaleX(0) scaleY(3)"
        logotype.style.opacity = "0"
        monogram.style.transform = "scaleX(1) scale(0.6)"
        monogram.style.opacity = "1"
      }
    }, 75)
  })
  wrapper.addEventListener("mouseleave", () => {
    if (header.classList.contains("header-blurred") || window.location.pathname.includes("who-we-are.html")) return
    hoverActive = false
    clearTimeout(enterTimeout)
    monogram.style.transform = "scaleX(2.5) scale(0.6)"
    monogram.style.opacity = "0"
    setTimeout(() => {
      if (!hoverActive && !header.classList.contains("header-blurred")) {
        logotype.style.transform = "scaleX(1) scaleY(1)"
        logotype.style.opacity = "1"
      }
    }, 75)
  })
} else if (wrapper && logotype && monogram) {
  // Ensure both variants visible / stable without animation side-effects
  logotype.style.transform = "scaleX(1) scaleY(1)"
  logotype.style.opacity = "1"
  monogram.style.opacity = "0"; // keep original design (only logotype)
}

// Make header logo/tap navigate to home page
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logoWrapper")
  if (logo) {
    logo.addEventListener("click", () => {
      window.location.href = "index.html"
    })
    // Improve accessibility: treat as link via Enter/Space
    logo.setAttribute("tabindex", "0")
    logo.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        window.location.href = "index.html"
      }
    })
  }
})

// Course card click handler for Ganga page
document.addEventListener("DOMContentLoaded", () => {
  const gangaCard = document.querySelector('.course-card[data-bg="frames"]')
  if (gangaCard) {
    gangaCard.addEventListener("click", () => {
      window.location.href = "ganga.html"
    })
  }
})

// Upcoming page: make the "Frames of the Ganges" expedition card clickable to ganga.html
document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("upcoming-page")) return
  const framesExpeditionCard = document.querySelector('.expedition-card[data-expedition="frames"]')
  if (!framesExpeditionCard) return

  const goToGanga = () => {
    window.location.href = "ganga.html"
  }

  // Click support
  framesExpeditionCard.addEventListener("click", goToGanga)
  // Accessibility: Enter/Space support
  framesExpeditionCard.setAttribute("role", "link")
  framesExpeditionCard.setAttribute("tabindex", "0")
  framesExpeditionCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      goToGanga()
    }
  })
})

// Join us button click handler
document.addEventListener("DOMContentLoaded", () => {
  const joinUsBtn = document.querySelector(".join-us-btn")
  if (joinUsBtn) {
    joinUsBtn.addEventListener("click", () => {
      // Scroll to contact section or open contact form
      const contactSection = document.querySelector(".contact-section")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      } else {
        // If on ganga page, redirect to home page contact section
        window.location.href = "index.html#connect"
      }
    })
  }
})

// Who we are video functionality
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".who-we-are-video")
  if (video) {
    video.addEventListener("play", () => {
      header.classList.add("header-hidden")
    })
    video.addEventListener("pause", () => {
      header.classList.remove("header-hidden")
    })
    video.addEventListener("ended", () => {
      header.classList.remove("header-hidden")
    })
  }
})

// Intersection Observer for day row animations
const observerOptions = {
  threshold: 0.3,
  rootMargin: '-50px 0px -50px 0px'
};

const dayRowObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
      // Only add animate-in class if it's not already there
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe all day rows
document.addEventListener('DOMContentLoaded', () => {
  const dayRows = document.querySelectorAll('.day-row');
  dayRows.forEach(row => {
    dayRowObserver.observe(row);
  });
});

