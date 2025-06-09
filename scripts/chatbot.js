// Elements
const input = document.getElementById('chat-input');
const sendBtn = document.getElementById('chat-send');
const display = document.getElementById('chat-display');
const sampleBtns = document.querySelectorAll('.sample-btn');

// Global context variable
let context = "";

fetch('context.txt')
  .then(res => {
    if (!res.ok) throw new Error("Failed to load context.txt");
    return res.text();
  })
  .then(data => {
    context = data;
    console.log("📄 Context loaded:", context.substring(0, 100) + "...");

    // Event listeners
    sendBtn.addEventListener('click', () => handleChat(input.value));
    input.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleChat(input.value);
    });
    sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => handleChat(btn.textContent));
    });

  })
  .catch(err => {
    console.error("❌ Could not load context:", err);
    context = "TakaCycle is a green startup based in Nairobi focused on recycling.";

    // Event listeners
    sendBtn.addEventListener('click', () => handleChat(input.value));
    input.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleChat(input.value);
    });
    sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => handleChat(btn.textContent));
    });
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
  console.log("🔍 Checking Puter:", puter);
  console.log("🔍 Type of puter.ai.chat:", typeof puter?.ai?.chat);

  if (!puter || !puter.ai || typeof puter.ai.chat !== "function") {
    console.error("❌ Puter.ai.chat is not available! Did you forget to load the Puter script?");
    return;
  }

  if (!question.trim()) {
    alert("Please enter a question.");
    return;
  }

  addMessage(question, 'user');
  input.value = '';

  console.log("Sending messages:", [
  { role: 'system', content: context },
  { role: 'user', content: question }
  ]);

  try {
  const res = await puter.ai.chat([
    { role: "system", content: context },
    { role: "user", content: question }
  ]);


    const answer = res.message?.content;
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


