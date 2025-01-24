const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    nav.style.backgroundColor = 'rgb(20,20,20)'; 
  } else {
    nav.style.backgroundColor = 'transparent';
  }
});


const footer = document.querySelector('.service-code');
if (footer) {
  footer.addEventListener('click', () => {
    footer.innerHTML = '286-128';
  });
}
function selectProfile(profileName) {
  localStorage.setItem('selectedProfile', profileName);
}

// Load selected profile on page load
document.addEventListener('DOMContentLoaded', () => {
  const selectedProfile = localStorage.getItem('selectedProfile');
  const profileIcon = document.querySelector('.nav-item.icon img');
  
  if (selectedProfile && profileIcon) {
    profileIcon.src = `../assets/images/Icon/Profile/${selectedProfile}.png`;
  }
});
function togglePasswordVisibility() {
  const passwordField = document.querySelector('input[type="password"], input[type="text"][id*="password"]');
  const eyeIcon = document.getElementById('password-eye-icon');
  
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    eyeIcon.innerHTML = '<img src="../assets/svg/eye.svg" alt="Show Password">';
  } else {
    passwordField.type = 'password';
    eyeIcon.innerHTML = '<img src="../assets/svg/eye-off.svg" alt="hide Password">';
  }
}

// email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[A-Za-z]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Basic password strength check
function isStrongPassword(password) {
  // At least 8 characters, one lowercase, one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
}

function saveCredentials(event) {
  event.preventDefault();
  
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  

  if (!name) {
    alert('Please enter your name');
    return;
  }
  
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  if (!isStrongPassword(password)) {
    alert('Password must be at least eight characters, at least one letter, one number and one special character');
    return;
  }
  const storedUserJson = localStorage.getItem('user');
  if (storedUserJson) {
    const storedUser = JSON.parse(storedUserJson);
    if (storedUser.email === email) {
      alert('An account with this email already exists.');
      return;
    }
  }
  
  const user = {
    name: name,
    email: email,
    passwordHash: btoa(password) 
  };
  
  localStorage.setItem('user', JSON.stringify(user));
  window.location.href = './profile.html';
}

function validateCredentials(event) {
  event.preventDefault();
  
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const rememberMe = document.getElementById('remember-me').checked;
  

  const storedUserJson = localStorage.getItem('user');
  
  if (!storedUserJson) {
    alert('No account found. Please sign up first.');
    return;
  }
  
  const storedUser = JSON.parse(storedUserJson);
  
  if (email === storedUser.email && btoa(password) === storedUser.passwordHash) {
    if (rememberMe) {
      localStorage.setItem('isLoggedIn', 'true');
    }
    
    window.location.href = './webpages/profile.html';
  } else {
    alert('Invalid email or password');
  }
}