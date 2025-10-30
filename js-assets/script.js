// JavaScript Form Validation Function for contact.html

function validateForm() {
  let isValid = true;

  // Helper function to show/clear error messages
  function displayError(id, message) {
    document.getElementById(id).textContent = message;
    // Highlight the input field itself by adding an 'error' class (requires CSS styling)
    const inputId = id.replace("-error", "");
    const inputElement = document.getElementById(inputId);

    if (message) {
      inputElement.classList.add("input-error");
    } else {
      inputElement.classList.remove("input-error");
    }
  }

  // --- 1. Validate Name (must not be empty and must be letters only) ---
  const nameInput = document.getElementById("name");
  const nameValue = nameInput.value.trim();
  const nameRegex = /^[a-zA-Z\s]+$/;
  displayError("name-error", ""); // FIX: Clear previous error first

  if (nameValue === "") {
    displayError("name-error", "Name is required.");
    isValid = false;
  } else if (!nameRegex.test(nameValue)) {
    displayError("name-error", "Name must contain only letters and spaces.");
    isValid = false;
  }

  // --- 2. Validate Email (must not be empty and must be a valid format) ---
  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value.trim();
  // Basic email regex (sufficient for basic validation)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  displayError("email-error", ""); // FIX: Clear previous error first

  if (emailValue === "") {
    displayError("email-error", "Email is required.");
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    displayError(
      "email-error",
      "Please enter a valid email address (e.g., example@domain.com)."
    );
    isValid = false;
  }

  // --- 3. Validate Message (must not be empty and minimum length) ---
  const messageInput = document.getElementById("message");
  const messageValue = messageInput.value.trim();
  displayError("message-error", ""); // FIX: Clear previous error first

  if (messageValue === "") {
    displayError("message-error", "A message is required.");
    isValid = false;
  } else if (messageValue.length < 10) {
    displayError(
      "message-error",
      "Message must be at least 10 characters long."
    );
    isValid = false;
  }

  // --- 4. Validate Phone Number (optional, but if filled, check format) ---
  const phoneInput = document.getElementById("phone");
  const phoneValue = phoneInput.value.trim();
  const digitsOnly = phoneValue.replace(/\D/g, ""); // Extract only digits
  displayError("phone-error", ""); // FIX: Clear previous error first

  // FIX: If phoneValue is not empty, check if the digitsOnly string is exactly 10 digits
  if (phoneValue !== "" && digitsOnly.length !== 10) {
    displayError(
      "phone-error",
      "Phone number, if provided, must be 10 digits (e.g., 5551234567)."
    );
    isValid = false;
  }

  // If isValid is true, the form submits. If false, submission is blocked.
  return isValid;
}
