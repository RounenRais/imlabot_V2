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
  
    const prompt = `
    Sen bir Türkçe dil editörüsün. TDK’nın noktalama kurallarına sıkı sıkıya uymalısın.
Tüm yazım ve noktalama düzeltmelerini TDK’ya göre yap. Özellikle:
- Virgül, nokta, iki nokta gibi işaretleri TDK'ya göre yerleştir.
- "ki", "de", "mi" eklerini ayırmaya dikkat et.
- Gereksiz ünlem veya noktalama kullanma.
- Çift tırnakların doğru kullanımına dikkat et.
- Bağlaçlardan(Ve,Ancak,Veya,Fakat,ama,yada) sonra yada önce noktalama işareti gelmez dikkat et
örnek
Yanlış: "Söz vermek kolaydır, ancak o sözü yerine getirmek zordur." 
Doğru: "Söz vermek kolaydır ancak o sözü yerine getirmek zordur." 

Yalnızca düzeltilmiş cümleyi ver. Açıklama yapma.
    Aşağıdaki cümledeki yazım ve noktalama hatalarını düzelt:\n"${userInput.value}
    "`;
  
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
  
  </style>
  