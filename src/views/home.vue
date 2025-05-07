<template>

    <div class="chat-container">
      <h2>imlabot</h2>
      <div class="chat-box" ref="chatBox">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.sender === 'user' ? 'user' : 'bot']"
        >
          <p>{{ msg.text }}</p>
        </div>
      </div>
  
      <div class="input-area">
        <textarea
          v-model="userInput"
          placeholder="Mesajınızı yazın..."
        ></textarea>
        <button type="submit" @click="sendMessage">Gönder</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, nextTick } from "vue";
  import axios from "axios";
  const userInput = ref("");
  const messages = ref([]);
  const chatBox = ref(null);
  
  const sendMessage = async () => {
    if (!userInput.value.trim()) return;
  
    // Kullanıcı mesajını ekle
    messages.value.push({ text: userInput.value, sender: "user" });
  
    const prompt = `Aşağıdaki cümledeki yazım ve noktalama hatalarını düzelt:\n"${userInput.value}"`;
  
    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );
  
      const reply = res.data.choices[0].message.content.trim();
      messages.value.push({ text: reply, sender: "bot" });
    } catch (err) {
      messages.value.push({
        text: "Hata oluştu. Lütfen tekrar deneyin.",
        sender: "bot",
      });
      console.error(err);
    }
  
    userInput.value = "";
  
    // Scroll to bottom
    nextTick(() => {
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    });
  };
  </script>
  
  <style scoped>
  .chat-container {
    max-width: 600px;
    margin: 40px auto;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 20px;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 10px;
  }
  
  .chat-box {
    height: 400px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .message {
    max-width: 75%;
    padding: 10px 14px;
    border-radius: 12px;
    line-height: 1.4;
    white-space: pre-line;
  }
  
  .user {
    align-self: flex-end;
    background-color: #d1e7dd;
  }
  
  .bot {
    align-self: flex-start;
    background-color: #8fc718;
  }
  
  .input-area {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  textarea {
    flex: 1;
    height: 60px;
    resize: none;
    border-radius: 8px;
    padding: 10px;
  }
  
  button {
    padding: 10px 16px;
    border-radius: 8px;
    background-color: #0a9b33;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  