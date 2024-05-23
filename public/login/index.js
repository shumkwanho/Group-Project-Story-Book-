document.addEventListener('DOMContentLoaded', function() {
    var dropdownBtn = document.querySelector('.dropdown-btn');
    var dropdownContent = document.querySelector('.dropdown-content');
  
    dropdownBtn.addEventListener('click', function() {
      if (dropdownContent.style.display === 'none') {
        dropdownContent.style.display = 'block';
      } else {
        dropdownContent.style.display = 'none';
      }
    });
  });

  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('../api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        alert('Login successful!');
      } else {
        const data = await response.json();
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      alert('An error occurred during login.');
      console.error(error);
    }
  });

  document.getElementById('registration-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, confirmPassword })
      });
  
      if (response.ok) {
        alert('Registration successful!');
      } else {
        const data = await response.json();
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      alert('An error occurred during registration.');
      console.error(error);
    }
  });

const registrationBtn = document.querySelector('.registration-container .dropdown-btn');
const registrationContent = document.querySelector('.registration-container .dropdown-content');

registrationBtn.addEventListener('click', () => {
  registrationContent.style.display = registrationContent.style.display === 'none' ? 'block' : 'none';
});

const form = document.querySelector(".class")
console.log(form);
form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    formData.append("userId", "1",)
    formData.append("characterName", "pikachu",)
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        body: formData,
    })
})