// JavaScript Form Validation Function for contact.html

function validateForm() {
  let isValid = true;

  // Helper function to show/hide error messages
  function displayError(id, message) {
    document.getElementById(id).textContent = message;
  }

  // 1. Validate Name (must not be empty and must be letters only)
  const nameInput = document.getElementById("name");
  const nameValue = nameInput.value.trim();
  const nameRegex = /^[a-zA-Z\s]+$/;

  if (nameValue === "") {
    displayError("name-error", "Name is required.");
    isValid = false;
  } else if (!nameRegex.test(nameValue)) {
    displayError("name-error", "Name must contain only letters and spaces.");
    isValid = false;
  } else {
    displayError("name-error", ""); // Clear error
  }

  // 2. Validate Email (must not be empty and must be a valid format)
  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value.trim();
  // Basic email regex (not exhaustive, but sufficient for basic validation)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === "") {
    displayError("email-error", "Email is required.");
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    displayError("email-error", "Please enter a valid email address.");
    isValid = false;
  } else {
    displayError("email-error", ""); // Clear error
  }

  // 3. Validate Message (must not be empty)
  const messageInput = document.getElementById("message");
  const messageValue = messageInput.value.trim();

  if (messageValue === "") {
    displayError("message-error", "A message is required.");
    isValid = false;
  } else if (messageValue.length < 10) {
    displayError(
      "message-error",
      "Message must be at least 10 characters long."
    );
    isValid = false;
  } else {
    displayError("message-error", ""); // Clear error
  }

  // 4. Validate Phone Number (optional, but if filled, must be 10 digits)
  const phoneInput = document.getElementById("phone");
  const phoneValue = phoneInput.value.trim();
  // Regex for 10 digits (allowing for optional spaces/dashes, but checking length)
  const phoneRegex = /^\d{10}$/;

  if (phoneValue !== "" && !phoneRegex.test(phoneValue.replace(/\D/g, ""))) {
    displayError("phone-error", "Phone number must be exactly 10 digits.");
    isValid = false;
  } else {
    displayError("phone-error", ""); // Clear error
  }

  // If isValid is true, the form submits. If false, submission is blocked.
  return isValid;
}
