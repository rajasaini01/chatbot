// Extras.js - Extra Features for Mental Health Bot ✨

document.addEventListener('DOMContentLoaded', () => {
    greetUser();
  });
  
  function greetUser() {
    const hour = new Date().getHours();
    let greeting = "Hello! 🌼";
  
    if (hour < 12) {
      greeting = "Good morning! ☀️";
    } else if (hour < 18) {
      greeting = "Good afternoon! 🌤️";
    } else {
      greeting = "Good evening! 🌙";
    }
  
    addMessage('bot', greeting + " I'm here to support you.");
  }
  
  let messageCounter = 0;
  
  // Override handleSend from chatbot.js
  const oldHandleSend = handleSend;
  handleSend = function () {
    const text = userInput.value.trim();
    if (text === '') return;
  
    addMessage('user', text);
    showTypingAnimation();
  
    const response = botResponse(text);
    setTimeout(() => {
      removeTypingAnimation();
      addMessage('bot', response);
      messageCounter++;
      if (messageCounter % 4 === 0) {
        sendRandomQuote();
      }
    }, 1500);
  
    userInput.value = '';
  }
  
  function showTypingAnimation() {
    const typing = document.createElement('div');
    typing.className = 'bot typing';
    typing.id = 'typing';
    typing.innerText = 'Bot is typing';
    chatbox.appendChild(typing);
  
    let dots = 0;
    typing.interval = setInterval(() => {
      dots = (dots + 1) % 4;
      typing.innerText = 'Bot is typing' + '.'.repeat(dots);
    }, 400);
    chatbox.scrollTop = chatbox.scrollHeight;
  }
  
  function removeTypingAnimation() {
    const typing = document.getElementById('typing');
    if (typing) {
      clearInterval(typing.interval);
      typing.remove();
    }
  }
  
  function sendRandomQuote() {
    const quotes = [
      "Believe in yourself. You are stronger than you think! 💪",
      "Every day is a second chance. 🌱",
      "Small steps every day lead to big changes. 🚶‍♂️🚶‍♀️",
      "You are doing your best, and that's enough. 🫶"
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setTimeout(() => addMessage('bot', quote), 1000);
  }
  