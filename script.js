document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('login-form') || document.getElementById('signup-form');
  
  // 로그인 페이지와 회원가입 페이지 구분
  const isLoginPage = document.body.classList.contains('login-page');
  const isSignupPage = document.body.classList.contains('signup-page');

  const emailField = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordField = document.getElementById('password');
  const passwordError = document.getElementById('password-error');
  const loginBtn = document.getElementById(isLoginPage ? 'login-btn' : 'signup-btn');
  const requiredLength = 8;

  // 비밀번호 확인 필드 (회원가입 전용)
  const confirmPasswordField = document.getElementById('confirm-password');
  const confirmPasswordError = document.getElementById('confirm-password-error');
 
 // 닉네임 확인 필드 (회원가입 전용)
  const nicknameField = document.getElementById('nickname');
  const nicknameError = document.getElementById('nickname-error');

  // 폼 유효성 검사
   function validateForm() {
    const isEmailEmpty = emailField.value.trim() === '';
    const isPasswordEmpty = passwordField.value.trim() === '';
    const isConfirmPasswordEmpty = confirmPasswordField && confirmPasswordField.value.trim() === '';
    const isNicknameEmpty = nicknameField && nicknameField.value.trim() === '';
    
    const isEmailErrorVisible = emailError.style.display === 'block';
    const isPasswordErrorVisible = passwordError.style.display === 'block';
    const isConfirmPasswordErrorVisible = confirmPasswordError && confirmPasswordError.style.display === 'block';
    const isNicknameErrorVisible = nicknameError && nicknameError.style.display === 'block';

    const shouldDisable = isEmailEmpty || isPasswordEmpty || isEmailErrorVisible || isPasswordErrorVisible || 
    (isSignupPage && (isConfirmPasswordEmpty || isConfirmPasswordErrorVisible || isNicknameEmpty || isNicknameErrorVisible));
    loginBtn.disabled = shouldDisable;
  }


  // 이메일 유효성 검사
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
    validateForm();
  });

  // 비밀번호 유효성 검사
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

  // 비밀번호 확인 필드 유효성 검사 (회원가입 전용)
  if (isSignupPage) {
    confirmPasswordField.addEventListener('focusout', function() {
      const passwordValue = passwordField.value.trim();
      const confirmPasswordValue = confirmPasswordField.value.trim();

      if (confirmPasswordValue === '') {
        confirmPasswordError.textContent = '비밀번호를 다시 한 번 입력해주세요.';
        confirmPasswordError.style.display = 'block';
        confirmPasswordField.classList.add('error');
      } else if (confirmPasswordValue !== passwordValue) {
        confirmPasswordError.textContent = '비밀번호가 일치하지 않습니다.';
        confirmPasswordError.style.display = 'block';
        confirmPasswordField.classList.add('error');
      } else {
        confirmPasswordError.style.display = 'none';
        confirmPasswordField.classList.remove('error');
      }
      validateForm();
    });
  }

// 닉네임 검사
  if (isSignupPage) {
    nicknameField.addEventListener('focusout', function() {
      if (nicknameField.value.trim() === '') {
        nicknameError.textContent = '닉네임을 입력해주세요.';
        nicknameError.style.display = 'block';
        nicknameField.classList.add('error');
      } else {
        nicknameError.style.display = 'none';
        nicknameField.classList.remove('error');
      }
      validateForm();
    });
  }

  // 입력 값 변경시 폼 상태 유효성 검사
  emailField.addEventListener('input', validateForm);
  passwordField.addEventListener('input', validateForm);
  if (isSignupPage) {
    confirmPasswordField.addEventListener('input', validateForm);
    nicknameField.addEventListener('input', validateForm);
  }

  // 폼 제출 방지 (버튼이 비활성화된 상태일 경우)
  form.addEventListener('submit', function(event) {
    if (loginBtn.disabled) {
      event.preventDefault(); // 제출 막기
    }
  });
});