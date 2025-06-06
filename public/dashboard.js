window.addEventListener('DOMContentLoaded', async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    alert('No user data found. Please log in.');
    window.location.href = 'login.html';
    return;
  }

  // Show logged-in user info
  document.getElementById('userInfo').innerHTML = `
    <h2>Welcome, ${user.username} 👋</h2>
    <p><strong>Your Gmail:</strong> ${user.gmail}</p>
    <p><strong>Your Password:</strong> ${user.password}</p>
    <hr/>
    <h3>All Registered Users:</h3>
    <ul id="allUsersList"></ul>
  `;

  // Fetch all users
  try {
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    const list = document.getElementById('allUsersList');
    users.forEach(u => {
      const li = document.createElement('li');
      li.textContent = `Username: ${u.username}, Gmail: ${u.gmail}`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
});
