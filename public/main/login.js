export function openForm() {
  document.getElementById("myForm").style.display = "block";
}
export function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
window["openForm"] = openForm;
window["closeForm"] = closeForm;

export function login() {
  openForm()
}
document.getElementById('myForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    //TODO: do not use alert, use pop up
    if (response.ok) {
      alert('Login successful!');
      window.location.reload();
    } else {
      const data = await response.json();
      alert(`Login failed: ${data.message}`);
    }
  } catch (error) {
    alert('An error occurred during login.');
    console.error(error);
  }
})