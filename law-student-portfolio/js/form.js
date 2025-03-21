document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }
})

// Mock showToast function for demonstration purposes.
// In a real application, this would likely be imported from a UI library or defined elsewhere.
function showToast(type, title, message) {
  console.log(`Toast: ${type} - ${title} - ${message}`)
  // You would typically use a UI library (e.g., SweetAlert, Toastify) to display a visual toast.
}

async function handleFormSubmit(e) {
  e.preventDefault()

  const form = e.target
  const submitButton = form.querySelector('button[type="submit"]')

  // Get form data
  const formData = {
    name: form.querySelector("#name").value,
    email: form.querySelector("#email").value,
    subject: form.querySelector("#subject").value,
    message: form.querySelector("#message").value,
  }

  // Show loading state
  submitButton.classList.add("loading")

  try {
    // Simulate API call (in a real app, you would send this to a server)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success message
    showToast("success", "Message sent!", "Thank you for your message. I'll get back to you soon.")

    // Reset form
    form.reset()
  } catch (error) {
    // Show error message
    console.error("Error sending message:", error)
    showToast("error", "Error sending message", "Please try again later or contact me directly via email.")
  } finally {
    // Reset loading state
    submitButton.classList.remove("loading")
  }
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Function to simulate sending email
async function sendEmail(data) {
  // In a real application, this would be an API call to your backend
  // For demo purposes, we'll just simulate a successful response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 2000)
  })
}

