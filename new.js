var cursor = document.querySelector("#cursor");
var cursorblur = document.querySelector("#cursor-blur");
document.addEventListener("mousemove", function(dets) {
    cursor.style.left = dets.x + "px";
    cursor.style.top = dets.y + "px";
    cursorblur.style.left = (dets.x - 50) + "px";
    cursorblur.style.top = (dets.y - 50) + "px";
});
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

const responses = {
  "hello": "Hi there! How can I help you?",
  "how are you": "I'm just a bot, but I'm doing great! How about you?",
  "what is your name": "I'm a simple chatbot! You can call me ChatBuddy.",
  "bye": "Goodbye! Have a great day!",
  "default": "Sorry, I don't understand that. Can you ask something else?"
};

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p></p>` : `<img src="icon/ai-assistant_17569423.gif" alt=""><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const getResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  return responses[message] || responses["default"];
};

const handleChat = () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
  setTimeout(() => {
    const botResponse = getResponse(userMessage);
    const incomingChatLi = createChatLi(botResponse, "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }, 600);
};

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

let isDragging = false, offsetX, offsetY;

chatbotToggler.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - chatbotToggler.getBoundingClientRect().left;
  offsetY = e.clientY - chatbotToggler.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  chatbotToggler.style.position = "fixed";
  chatbotToggler.style.left = `${e.clientX - offsetX}px`;
  chatbotToggler.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});