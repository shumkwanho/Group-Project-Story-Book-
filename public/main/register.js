export function register() {
    document.getElementById("registerForm").style.display = "block";
}
  export function registerCloseForm() {
    document.getElementById("registerForm").style.display = "none";
  }
  window["register"] = register;
  window["registerCloseForm"] = registerCloseForm;
  
  export function login(userId) {
    register()
  }

  document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newUsername, newEmail, newPassword, confirmPassword })
      });
  
      const data = await response.json();
      window.location.reload()
  
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('An error occurred during registration.');
      console.error(error);
    }
  });