// Contact form handler
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const responseDiv = document.getElementById('responseMessage');

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    if (response.ok) {
      responseDiv.style.color = '#10b981';
      responseDiv.innerHTML = '<strong>✓ Message sent successfully!</strong>';
      document.getElementById('contactForm').reset();
    } else {
      responseDiv.style.color = '#ef4444';
      responseDiv.innerHTML = '<strong>✗ Error:</strong> ' + (data.error || 'Failed to send message');
    }
  } catch (error) {
    responseDiv.style.color = '#ef4444';
    responseDiv.innerHTML = '<strong>✗ Error:</strong> Server not running. Please try again later.';
  }

  responseDiv.style.display = 'block';
});
