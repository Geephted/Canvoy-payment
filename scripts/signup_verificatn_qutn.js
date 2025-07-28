document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('verificationForm');
  const submitBtn = document.getElementById('submitBtn');

  // Show error under field
  function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    errorElement.textContent = message;
    inputElement.classList.add('border-red-500', 'animate-shake');
    inputElement.classList.remove('border-green-500');
    setTimeout(() => inputElement.classList.remove('animate-shake'), 500);
  }

  // Clear error
  function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    errorElement.textContent = '';
    inputElement.classList.remove('border-red-500', 'animate-shake');
  }

  // Validate field
  function validateField(fieldId) {
    const value = document.getElementById(fieldId).value.trim();
    if (!value) {
      showError(fieldId, 'This field is required');
      return false;
    }
    if (fieldId.startsWith('answer') && value.length < 2) {
      showError(fieldId, 'Answer must be at least 2 characters');
      return false;
    }
    clearError(fieldId);
    return true;
  }

  // Validate form
  function validateForm() {
    let isValid = true;
    if (!validateField('question1')) isValid = false;
    if (!validateField('answer1')) isValid = false;
    if (!validateField('question2')) isValid = false;
    if (!validateField('answer2')) isValid = false;
    const question1 = document.getElementById('question1').value;
    const question2 = document.getElementById('question2').value;
    if (question1 && question2 && question1 === question2) {
      showError('question1', 'Questions must be different');
      showError('question2', 'Questions must be different');
      isValid = false;
    }
    return isValid;
  }

  // Form submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Saving...';
    submitBtn.disabled = true;

    if (!validateForm()) {
      submitBtn.innerHTML = originalBtnHTML;
      submitBtn.disabled = false;
      return;
    }

    const formData = {
      securityQuestion1: document.getElementById('question1').value,
      securityAnswer1: document.getElementById('answer1').value,
      securityQuestion2: document.getElementById('question2').value,
      securityAnswer2: document.getElementById('answer2').value,
    };

    try {
      const response = await fetch('https://4b168cdbda98.ngrok-free.app/api/auth/security-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        showSuccessMessage('Security questions saved successfully!');
        form.reset();
        ['question1', 'answer1', 'question2', 'answer2'].forEach(clearError);
        
        // Redirect to the next page 
        setTimeout(() => {
          window.location.href ='create-pin.html'; // Next page url
        }, 2000);
      } else {
        if (result.field) {
          showError(result.field, result.message);
        } else {
          showErrorMessage('Failed to save: ' + result.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      showErrorMessage('An error occurred. Please try again.');
    } finally {
      submitBtn.innerHTML = originalBtnHTML;
      submitBtn.disabled = false;
    }
  });

  // Real-time validation
  ['question1', 'answer1', 'question2', 'answer2'].forEach(field => {
    const element = document.getElementById(field);
    element.addEventListener('input', function() {
      if (this.value.trim()) clearError(field);
    });
    element.addEventListener('blur', function() {
      validateField(field);
    });
  });

  // Show success popup
  function showSuccessMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg z-50';
    alertDiv.innerHTML = `<div class="flex items-center"><i class="fas fa-check-circle mr-2"></i><span>${message}</span></div>`;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
  }

  // Show error popup
  function showErrorMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50';
    alertDiv.innerHTML = `<div class="flex items-center"><i class="fas fa-exclamation-circle mr-2"></i><span>${message}</span></div>`;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
  }
});