/**
 * form.js — Booking Form Module
 * Scrapwala Hyderabad
 * Handles: real-time validation, WhatsApp message generation, form UX
 */

const Form = (() => {
  const WA_NUMBER = '919392901664';

  function init() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    const nameInput  = form.querySelector('#form-name');
    const phoneInput = form.querySelector('#form-phone');
    const areaInput  = form.querySelector('#form-area');
    const typeSelect = form.querySelector('#form-type');
    const timeSelect = form.querySelector('#form-time');
    const submitBtn  = form.querySelector('#form-submit');

    if (!submitBtn) return;

    // Real-time validation feedback
    [nameInput, phoneInput].forEach(input => {
      if (!input) return;
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => clearError(input));
    });

    if (phoneInput) {
      phoneInput.addEventListener('input', formatPhone);
    }

    // Submit
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleSubmit({ form, nameInput, phoneInput, areaInput, typeSelect, timeSelect });
    });

    form.addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handleSubmit({ form, nameInput, phoneInput, areaInput, typeSelect, timeSelect });
      }
    });
  }

  function validateField(input) {
    const value = input.value.trim();
    const errorEl = input.parentElement.querySelector('.form-error');

    if (!value) {
      setError(input, errorEl, 'This field is required.');
      return false;
    }

    if (input.id === 'form-phone') {
      const digits = value.replace(/\D/g, '');
      if (digits.length < 10) {
        setError(input, errorEl, 'Please enter a valid 10-digit phone number.');
        return false;
      }
    }

    clearError(input);
    return true;
  }

  function setError(input, errorEl, message) {
    input.classList.add('error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  function clearError(input) {
    input.classList.remove('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.classList.remove('visible');
  }

  function formatPhone(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    e.target.value = value;
  }

  function handleSubmit({ form, nameInput, phoneInput, areaInput, typeSelect, timeSelect }) {
    let valid = true;

    if (nameInput && !validateField(nameInput)) valid = false;
    if (phoneInput && !validateField(phoneInput)) valid = false;

    if (!valid) {
      // Scroll to first error
      const firstError = form.querySelector('.book-input.error');
      if (firstError) firstError.focus();
      return;
    }

    const name  = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const area  = areaInput ? areaInput.value.trim() : '';
    const type  = typeSelect ? typeSelect.value : '';
    const time  = timeSelect ? timeSelect.value : '';

    const lines = [
      `Hi Scrapwala! I want to book a free scrap pickup.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
    ];

    if (area) lines.push(`Area: ${area}`);
    if (type && type !== 'default') lines.push(`Material: ${type}`);
    if (time && time !== 'default') lines.push(`Preferred time: ${time}`);

    const msg = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');

    // Show success state on button
    const submitBtn = form.querySelector('#form-submit');
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Opening WhatsApp...';
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }
  }

  return { init };
})();
