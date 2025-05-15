function sendMessage() {
    const input = document.getElementById("user-message");
    const message = input.value.trim();
    if (message === "") return;

    const chatBox = document.getElementById("chat-box");

    // Add user message
    const userMsg = document.createElement("p");
    userMsg.className = "message user";
    userMsg.innerHTML = `<strong>You:</strong> ${message}`;
    chatBox.appendChild(userMsg);

    // Auto-scroll
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input
    input.value = "";

    // Add bot reply (simple echo)
    setTimeout(() => {
        const botMsg = document.createElement("p");
        botMsg.className = "message bot";
        botMsg.innerHTML = `<strong>Bot:</strong> You said "${message}"`;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}

// Allow Enter key to send message
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("user-message").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
