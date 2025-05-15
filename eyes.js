function togglePasswordVisibility(toggleId, inputId) {
  const passwordInput = document.getElementById(inputId);
  const eyeIcon = document.getElementById(toggleId).querySelector('i');

  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.classList.remove('fa-eye');
      eyeIcon.classList.add('fa-eye-slash');
  } else {
      passwordInput.type = 'password';
      eyeIcon.classList.remove('fa-eye-slash');
      eyeIcon.classList.add('fa-eye');
  }
}; 