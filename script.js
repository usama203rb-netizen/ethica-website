const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const submitBtn = document.querySelector("#submitBtn");

if (contactForm && formStatus && submitBtn) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const endpoint =
      contactForm.getAttribute("data-form-endpoint") || "/api/contact";
    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      service: String(formData.get("service") || "").trim(),
      message: String(formData.get("message") || "").trim()
    };

    formStatus.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const isFormspree = endpoint.includes("formspree.io");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: isFormspree
          ? { Accept: "application/json", "Content-Type": "application/json" }
          : { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || "Failed to send message.");
      }

      formStatus.textContent = "Message sent successfully. We will contact you soon.";
      contactForm.reset();
    } catch (error) {
      formStatus.textContent = error.message || "Could not send message right now.";
    } finally {
      submitBtn.disabled = false;
    }
  });
}
