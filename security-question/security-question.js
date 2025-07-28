document.getElementById('submitBtn').addEventListener('click', async function (e) {
  e.preventDefault();

  const question1 = document.getElementById('securityQuestion1').value;
  const answer1 = document.getElementById('securityAnswer1').value.trim();
  const question2 = document.getElementById('securityQuestion2').value;
  const answer2 = document.getElementById('securityAnswer2').value.trim();
  const messageBox = document.getElementById('securityResponseMessage');

  // Reset message display
  messageBox.textContent = '';
  messageBox.classList.add('hidden');
  messageBox.classList.remove('text-green-600', 'text-red-500');

  // Validation fail
  if (!answer1 || !answer2) {
    messageBox.textContent = 'Please answer both questions.';
    messageBox.classList.remove('hidden');
    messageBox.classList.add('text-red-500');

    // Auto-clear after 5s
    setTimeout(() => {
      messageBox.textContent = '';
      messageBox.classList.add('hidden');
      messageBox.classList.remove('text-red-500');
    }, 5000);

    return;
  }

  // Proceed with API request if validation passed
  const payload = {
    question1,
    answer1,
    question2,
    answer2
  };

  const button = document.getElementById('submitBtn');
  button.disabled = true;
  button.textContent = 'Verifying...';

  try {
    const response = await fetch('http://13.60.18.20:5000/api/auth/forgot-password/verify-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      messageBox.textContent = 'Security check successful!';
      messageBox.classList.add('text-green-600');
    } else {
      messageBox.textContent = result.message || 'Something went wrong.';
      messageBox.classList.add('text-red-500');
    }

  } catch (error) {
    console.error('API error:', error);
    messageBox.textContent = 'Network error, please try again.';
    messageBox.classList.add('text-red-500');
  } finally {
    messageBox.classList.remove('hidden');
    button.disabled = false;
    button.textContent = 'Submit';

    // Auto-clear message (even for API cases)
    setTimeout(() => {
      messageBox.textContent = '';
      messageBox.classList.add('hidden');
      messageBox.classList.remove('text-green-600', 'text-red-500');
    }, 5000);
  }
});
