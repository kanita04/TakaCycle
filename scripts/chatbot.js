// Elements
const input = document.getElementById('chat-input');
const sendBtn = document.getElementById('chat-send');
const display = document.getElementById('chat-display');
const sampleBtns = document.querySelectorAll('.sample-btn');

// Global context variable
const context = `
TakaCycle is a Nairobi-based green tech startup founded by Zawadi Mwenda, an urban planner passionate about sustainability and community impact.

The startup began in response to the growing waste management crisis in urban Kenyan communities. Inspired by global models in countries like Germany and South Korea, TakaCycle introduces a gamified recycling system rooted in community empowerment.

Our mission is to transform waste disposal into a rewarding, tech-driven experience. We provide a mobile app that allows users to track recyclable drop-offs, earn EcoPoints, and redeem them for discounts and deals at local businesses. The app uses smart bins equipped with QR scanners and weight sensors to verify drop-offs.

TakaCycle offers:
- A user-friendly mobile app to log recycling activity
- Verified smart drop-off bins across neighborhoods
- A TakaRewards marketplace for redeeming EcoPoints
- A local business partnership program
- A chatbot (TakaBot) that helps users engage with the platform

Our founder Zawadi Mwenda leads a passionate team including Kelvin Otieno (Lead Developer) and Anita Kamau (Product Designer), all committed to creating cleaner cities and empowered communities.

You can support TakaCycle by using the app, recycling at designated points, becoming a marketplace partner, or contacting the team via the website.

TakaCycle’s long-term vision is to expand across Africa, promoting tech-enabled recycling and empowering communities through sustainable innovation.
`;

// Load context.txt dynamically
// fetch('context.txt')
//   .then(res => res.text())
//   .then(data => {
//     context = data;
//   })
//   .catch(err => {
//     console.error('Failed to load context.txt:', err);
//     context = 'TakaCycle is a green startup in Nairobi focused on recycling.'; // fallback
//   });

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

  console.log("Sending messages:", [
  { role: 'system', content: context },
  { role: 'user', content: question }
  ]);

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
