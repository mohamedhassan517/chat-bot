const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display user message
    appendMessage(userMessage, 'user-message');

    // Clear input
    userInput.value = '';

    // Get bot response
    const botResponse = await getBotResponse(userMessage);

    // Display bot response
    appendMessage(botResponse, 'bot-message');
});

async function getBotResponse(userMessage) {
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error fetching bot response:', error);
        return "Sorry, I couldn't process your request.";
    }
}

function appendMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll
}