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

    const endpoint =
      contactForm.getAttribute("action") ||
      contactForm.getAttribute("data-form-endpoint") ||
      "/api/contact";
    const formData = new FormData(contactForm);
    const isFormspree = endpoint.includes("formspree.io");

    if (isFormspree) {
      const email = String(formData.get("email") || "").trim();
      const service = String(formData.get("service") || "General").trim();
      formData.set("_replyto", email);
      formData.set("_subject", `New Website Inquiry - ${service}`);
    }

    formStatus.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: isFormspree
          ? { Accept: "application/json" }
          : { "Content-Type": "application/json" },
        body: isFormspree
          ? formData
          : JSON.stringify({
              fullName: String(formData.get("name") || "").trim(),
              company: String(formData.get("company") || "").trim(),
              email: String(formData.get("email") || "").trim(),
              service: String(formData.get("service") || "").trim(),
              message: String(formData.get("message") || "").trim()
            })
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = Array.isArray(result.errors)
          ? result.errors.map((error) => error.message).join(", ")
          : result.error || result.message || "Failed to send message.";
        throw new Error(message);
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
