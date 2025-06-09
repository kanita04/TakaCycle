const context = `
TakaCycle is a Nairobi-based green tech startup founded by Zawadi Mwenda, an urban planner passionate about recycling and community impact. 
TakaCycle helps residents recycle smarter using a mobile app, EcoPoints rewards system, and smart drop-off bins.
Users track recyclables, earn points, and redeem them for discounts at local businesses.
TakaCycle’s mission is to reduce waste, empower communities, and create a cleaner future.
You can support TakaCycle by using the app, joining the marketplace, or reaching out via our contact form.
`;

// Elements
const input = document.getElementById('chat-input');
const sendBtn = document.getElementById('chat-send');
const display = document.getElementById('chat-display');
const sampleBtns = document.querySelectorAll('.sample-btn');

// Chat handler
async function handleChat(question) {
  if (!question.trim()) {
    alert("Please enter a question.");
    return;
  }

  addMessage(question, 'user');

  try {
    const res = await puter.ai.chat({
      messages: [
        { role: "system", content: context },
        { role: "user", content: question }
      ]
    });
    addMessage(res.choices[0].message.content, 'bot');
  } catch (err) {
    addMessage("Oops! Something went wrong. Try again later.", 'bot');
  }

  input.value = '';
}

// Add message to chat display
function addMessage(msg, type) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;
  bubble.textContent = msg;
  display.appendChild(bubble);
  display.scrollTop = display.scrollHeight;
}

// Event listeners
sendBtn.addEventListener('click', () => handleChat(input.value));
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') handleChat(input.value);
});
sampleBtns.forEach(btn =>
  btn.addEventListener('click', () => handleChat(btn.textContent))
);