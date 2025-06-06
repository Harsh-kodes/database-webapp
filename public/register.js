document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const gmail = document.getElementById('gmail').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gmail, username, password })
    });

    const data = await response.json();

    if (response.status === 201) {
      alert(data.message);
      window.location.href = 'login.html'; // ✅ Redirect to login page
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong');
  }
});
