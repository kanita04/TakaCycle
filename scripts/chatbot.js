// Elements
const input = document.getElementById('chat-input');
const sendBtn = document.getElementById('chat-send');
const display = document.getElementById('chat-display');
const sampleBtns = document.querySelectorAll('.sample-btn');

// Global context variable
let context = '';

// Load context.txt dynamically
fetch('assets/context.txt')
  .then(res => res.text())
  .then(data => {
    context = data;
  })
  .catch(err => {
    console.error('Failed to load context.txt:', err);
    context = 'TakaCycle is a green startup in Nairobi focused on recycling.'; // fallback
  });

// Add message to display
function addMessage(text, role) {
  const bubble = document.createElement('div');
  bubble.classList.add('chat-bubble', role);
  bubble.textContent = text;
  display.appendChild(bubble);
  display.scrollTop = display.scrollHeight;
}

// Handle sending a message
async function handleChat(question) {
  if (!question.trim()) {
    alert("Please enter a question.");
    return;
  }

  addMessage(question, 'user');
  input.value = '';

  try {
    const res = await puter.ai.chat({
      messages: [
        { role: 'system', content: context },
        { role: 'user', content: question }
      ]
    });

    const answer = res.choices?.[0]?.message?.content;
    if (answer) {
      addMessage(answer, 'bot');
    } else {
      addMessage("Hmm, I didn’t quite get that. Try again?", 'bot');
    }
  } catch (err) {
    console.error(err);
    addMessage("Oops! Something went wrong. Please try again later.", 'bot');
  }
}

// Event listeners
sendBtn.addEventListener('click', () => handleChat(input.value));
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleChat(input.value);
});
sampleBtns.forEach(btn => {
  btn.addEventListener('click', () => handleChat(btn.textContent));
});
