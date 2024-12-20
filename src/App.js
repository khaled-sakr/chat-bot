import "./index.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Chat from "./components/Chat";
import ChatForm from "./components/ChatForm";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [useUnaApi, setUseUnaApi] = useState(false);
  const messagesEndRef = useRef(null);
  const [placeholder, setPlaceholder] = useState("اكتب سؤالك هنا..."); // نص placeholder

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addLinkTargetAttribute = (html) => {
    return html.replace(
      /<a /g,
      '<a target="_blank" rel="noopener noreferrer" '
    );
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    const apiUrl = useUnaApi
      ? "https://test-qf4q.onrender.com/api/"
      : "https://test-qf4q.onrender.com/api/";

    try {
      console.log("Sending request to:", apiUrl);
      console.log("Payload:", { question: input });

      const response = await axios.post(apiUrl, { question: input });
      console.log("Response Data:", response.data);

      const updatedMessages = [...newMessages];

      if (useUnaApi) {
        // Handle UNA API response
        if (response.data.answer && response.data.answer.length > 0) {
          response.data.answer.forEach((answer) => {
            if (answer.search_url) {
              // Render a button for the search URL
              updatedMessages.push({
                text: `
                  <div style="text-align: center;">
                    <a href="${answer.search_url}" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       style="
                          background-color: #0a4c5a; 
                          color: white; 
                          padding: 8px 16px; 
                          text-decoration: none; 
                          border-radius: 20px; 
                          font-weight: bold; 
                          display: inline-block; 
                          margin-top: 10px; 
                          text-align: center;">
                       للإطلاع على المزيد من الأخبار إضغط هنا
                    </a>
                  </div>
                `,
                sender: "bot",
                icon: "https://i.postimg.cc/YSzf3QQx/chatbot-1.png",
                isHtml: true,
              });
            } else {
              // Render individual answer content
              const imageHtml = answer.image_url
                ? `<img src="${answer.image_url}" alt="Image" style="width: 100%; height: auto; margin-top: 10px; border-radius: 10px;">`
                : "";

              updatedMessages.push({
                text: `
                  <div style="border: 1px solid #ddd; border-radius: 10px; overflow: hidden; padding: 15px; margin-bottom: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    ${imageHtml}
                    <p style="color: #666; font-size: 12px; margin-top: 10px; text-align: center;">${answer.date}</p>
                    <h3 style="font-size: 18px; color: #333; margin-top: 10px;">${answer.title}</h3>
                    <p style="color: #555; font-size: 14px; line-height: 1.6; margin-top: 10px;">${answer.content}</p>
                    <a href="${answer.link}" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       style="
                          background-color: #0a4c5a; 
                          color: white; 
                          padding: 8px 16px; 
                          text-decoration: none; 
                          border-radius: 20px; 
                          font-weight: bold; 
                          display: inline-block; 
                          margin-top: 10px; 
                          text-align: center;">
                      أكمل القراءة
                    </a>
                  </div>
                `,
                sender: "bot",
                icon: "https://i.postimg.cc/YSzf3QQx/chatbot-1.png",
                isHtml: true,
              });
            }
          });
        } else {
          updatedMessages.push({
            text: "آسف، لم أتمكن من العثور على إجابة.",
            sender: "bot",
            icon: "https://i.postimg.cc/wB80F6Z9/chatbot.png",
          });
        }
      } else {
        // Handle `ask_questions` API response
        if (response.data.answer_type === "multiple") {
          // Process 'multiple' answers
          const answerText = response.data.answer;
          const lines = answerText.split("\n");
          const collapsibleItems = [];
          let currentTitle = "";

          lines.forEach((line) => {
            if (line.startsWith("-")) {
              currentTitle = line; // Keep raw HTML for the title
              collapsibleItems.push({
                title: currentTitle,
                description: "",
                isExpanded: false,
              });
            } else if (currentTitle) {
              collapsibleItems[collapsibleItems.length - 1].description += line; // Keep raw HTML for the description
            }
          });

          updatedMessages.push({
            sender: "bot",
            collapsibleItems,
            type: "multipleAnswers",
          });
        } else if (response.data.answer) {
          updatedMessages.push({
            text: addLinkTargetAttribute(response.data.answer),
            sender: "bot",
            icon: "https://i.postimg.cc/YSzf3QQx/chatbot-1.png",
            isHtml: true,
          });
        } else {
          updatedMessages.push({
            text: "آسف، لم أتمكن من العثور على الإجابة.",
            sender: "bot",
            icon: "https://i.postimg.cc/wB80F6Z9/chatbot.png",
          });
        }
      }

      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error sending message:", error.response || error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "حدث خطأ أثناء معالجة سؤالك. يرجى المحاولة مرة أخرى.",
          sender: "bot",
          icon: "https://i.postimg.cc/wB80F6Z9/chatbot.png",
        },
      ]);
    }
  };

  const toggleItem = (messageIndex, itemIndex) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, msgIdx) => {
        if (msgIdx === messageIndex && msg.type === "multipleAnswers") {
          return {
            ...msg,
            collapsibleItems: msg.collapsibleItems.map((item, idx) =>
              idx === itemIndex
                ? { ...item, isExpanded: !item.isExpanded }
                : item
            ),
          };
        }
        return msg;
      })
    );
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      console.log("Voice recognition started. Speak into the microphone.");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(new Event("submit"));
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: " + event.error);
    };

    recognition.start();
  };

  const handleUnaClick = () => {
    setUseUnaApi(true); // استخدام API الخاص بـ يونا
    setPlaceholder("اسأل عن خبر من منصة يونا..."); // تغيير placeholder
  };

  const handleGeneralClick = () => {
    setUseUnaApi(false); // استخدام API الخاص بالأسئلة العامة
    setPlaceholder("ماذا تريد أن تعرف..."); // تغيير placeholder
  };

  // const stripHtmlTags = (html) => {
  //   const div = document.createElement("div");
  //   div.innerHTML = html;
  //   return div.textContent || div.innerText || "";
  // };

  return (
    <div className="flex h-screen bg-custom-background bg-cover bg-center bg-no-repeat">
      <Header />
      <Chat
        setMessages={setMessages}
        messages={messages}
        messagesEndRef={messagesEndRef}
        toggleItem={toggleItem}
      />
      <ChatForm
        sendMessage={sendMessage}
        input={input}
        setInput={setInput}
        startListening={startListening}
        useUnaApi={useUnaApi}
        handleGeneralClick={handleGeneralClick}
        handleUnaClick={handleUnaClick}
        placeholder={placeholder}
      />

      <Footer />
    </div>
  );
}

export default App;
