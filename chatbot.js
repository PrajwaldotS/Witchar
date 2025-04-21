const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

const responses = {
    "hello": "Hi there! Welcome to EngiGuide. How can I assist you today?",
    "how are you": "I'm here to help you explore engineering branches! What would you like to know?",
    "what is your name": "I'm EngiBot, your career guidance assistant!",
    "which engineering branch is best": "It depends on your interests! Do you prefer coding, mechanics, electronics, or something else?",
    "how to choose an engineering branch": "Consider your interests, future career opportunities, and industry demand. Need recommendations?",
    "career scope in engineering": "Engineering offers great careers in software, robotics, AI, mechanical design, civil projects, and more!",
    "bye": "Goodbye! I hope you find the right path. Feel free to come back anytime!",
    "default": "Hmm, I’m not sure about that. Can you ask about engineering fields, careers, or related topics?"
};


const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<img src="assests/ai-assistant_17569423.gif" alt=""><p></p>`;
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



