// DOM Elements
const inputField = document.getElementById("user-message");
const chatBox = document.getElementById("chat-box");

// Send message function
function sendMessage() {
    const message = inputField.value.trim();
    if (message === "") return;

    addMessage("You", message, "user");
    inputField.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate bot response
    setTimeout(() => {
        const botReply = generateBotReply(message);
        addMessage("Bot", botReply, "bot");
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 600);
}

// Add message to chat box
function addMessage(sender, text, type) {
    const msg = document.createElement("p");
    msg.className = `message ${type}`;
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(msg);
}

// Generate a basic bot reply
function generateBotReply(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
        return "Hello! How can I assist you today?";
    } else if (lowerMsg.includes("how are you")) {
        return "I'm just a bot, but I'm here to help!";
    } else if (lowerMsg.includes("bye")) {
        return "Goodbye! Have a great day!";
    } else {
        return `You said: "${userMessage}"`;
    }
}

// Allow Enter key to send message
document.addEventListener("DOMContentLoaded", () => {
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
s