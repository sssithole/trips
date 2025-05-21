document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  // Helper: Load users from localStorage safely
  function loadUsers() {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users'));
      if (Array.isArray(storedUsers)) {
        return storedUsers;
      }
    } catch (e) {
      console.error('Failed to parse users from localStorage:', e);
    }
    return [];
  }

  // Helper: Save users to localStorage
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Signup logic
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      let users = loadUsers();

      // Check if user already exists
      if (users.some(user => user.email === email)) {
        alert('User already exists');
        return;
      }

      // Add new user
      users.push({ email, password });
      saveUsers(users);

      alert('Signup successful! Please log in.');
      window.location.href = 'index.html';
    });
  }

  // Login logic
  if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      // ✅ This is the key part:
      localStorage.setItem('currentUser', JSON.stringify(user));

      alert('Login successful!');
      window.location.href = 'home.html';
    } else {
      alert('Invalid email or password');
    }
  });
}

});
