// script.js
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

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('login-form');
  const emailField = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordField = document.getElementById('password');
  const passwordError = document.getElementById('password-error');
  const loginBtn = document.getElementById('login-btn');
  const requiredLength = 8;

  function validateForm() {
    const isEmailEmpty = emailField.value.trim() === '';
    const isPasswordEmpty = passwordField.value.trim() === '';
    const isEmailErrorVisible = emailError.style.display === 'block';
    const isPasswordErrorVisible = passwordError.style.display === 'block';

    const shouldDisable = isEmailEmpty || isPasswordEmpty || isEmailErrorVisible || isPasswordErrorVisible;
    loginBtn.disabled = shouldDisable; 
  }

  emailField.addEventListener('focusout', function() {
    if (emailField.value.trim() === '') {
      emailError.textContent = '이메일을 입력해주세요.';
      emailError.style.display = 'block';
      emailField.classList.add('error');
    } else if (!emailPattern.test(emailField.value)) {
      emailError.textContent = '잘못된 이메일 형식입니다.';
      emailError.style.display = 'block';
      emailField.classList.add('error');
    } else {
      emailError.style.display = 'none';
      emailField.classList.remove('error');
    }
  });

  passwordField.addEventListener('focusout', function() {
    const value = passwordField.value.trim();
    if (value === '') {
      passwordError.textContent = '비밀번호를 입력해주세요.';
      passwordError.style.display = 'block';
      passwordField.classList.add('error');
    } else if (value.length < requiredLength) {
      passwordError.textContent = '비밀번호를 8자 이상 입력해주세요.';
      passwordError.style.display = 'block';
      passwordField.classList.add('error');
    } else {
      passwordError.style.display = 'none';
      passwordField.classList.remove('error');
    }
    validateForm();
  });

  emailField.addEventListener('input', validateForm);
  passwordField.addEventListener('input', validateForm);

  form.addEventListener('submit', function(event) {
    if (loginBtn.disabled) {
      event.preventDefault(); // 제출 막기
    }
  });

});
