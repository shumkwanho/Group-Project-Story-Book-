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

  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Password:', password);

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login successful!');
      window.history.back();
    } else {
      const data = await response.json();
      alert(`Login failed: ${data.message}`);
    }
  } catch (error) {
    alert('An error occurred during login.');
    console.error(error);
  }
})