document.getElementById('dataForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const interest = document.getElementById('interest').value;
  const skills = document.getElementById('skills').value;
  const goals = document.getElementById('goals').value;
  const responseDiv = document.getElementById('response');

 responseDiv.innerHTML = `<div style="color:#666;">⏳ Generating response...</div>`;

  try {
    const res = await fetch('http://localhost:3000/api/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age, interest, skills, goals }),
    });

    const data = await res.json();
   responseDiv.innerHTML = `
  <div style="background:#e7f3ff;padding:15px;border-radius:8px;">
    <b>Result:</b><br>${marked.parse(data.message)}
  </div>
`;
  } catch (err) {
  console.error('Error sending data:', err);
  responseDiv.textContent = 'Error sending data: ' + err.message;
}

});
