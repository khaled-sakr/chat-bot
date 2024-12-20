import axios from "axios";
import React from "react";
import { GiReturnArrow } from "react-icons/gi";
import { TypeAnimation } from "react-type-animation";

const Chat = ({ messages, messagesEndRef, setMessages, toggleItem }) => {
  const handleSimilarQuestion = async (id) => {
    const similarQuestion = messages.find((msg) => msg.id === id);
    if (!similarQuestion) return;

    try {
      const response = await axios.post("https://test-qf4q.onrender.com/api/", {
        question: similarQuestion.text,
      });

      const newMessages = [
        ...messages,
        { text: similarQuestion.text, sender: "user" },
      ];

      if (response.data && response.data.answer) {
        newMessages.push({
          text: response.data.answer,
          sender: "bot",
          icon: "https://i.postimg.cc/YSzf3QQx/chatbot-1.png",
          isHtml: true,
        });
      } else {
        newMessages.push({
          text: "عذرًا، لم أتمكن من العثور على إجابة لهذا السؤال.",
          sender: "bot",
          icon: "https://i.postimg.cc/wB80F6Z9/chatbot.png",
        });
      }

      setMessages(newMessages);
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال السؤال:", error);
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
  return (
    <div
      dir="rtl"
      className="chat-container m-auto top-24 absolute left-1/2 -translate-x-1/2 transform  w-full h-3/6  p-2 mt-5 overflow-y-scroll overflow-hidden "
    >
      {/* <div className="chat-container"> */}
      <div className="chat-messages mx-auto flex-1 gap-10">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message xs:w-9/12 sm:w-6/12 md:w-4/12 w-full mx-auto  ${msg.sender}`}
          >
            <div className="message-text mx-auto">
              {msg.isHtml ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: msg.text,
                  }}
                />
              ) : msg.type === "multipleAnswers" ? (
                msg.collapsibleItems.map((item, itemIndex) => (
                  <div key={itemIndex} className="collapsible-item">
                    <button
                      onClick={() => toggleItem(index, itemIndex)}
                      className="collapsible-button"
                    >
                      {item.title}
                    </button>
                    {item.isExpanded && (
                      <div
                        className="collapsible-content"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    )}
                  </div>
                ))
              ) : (
                <TypeAnimation
                  sequence={[msg.text, () => {}]}
                  speed={70}
                  repeat={0}
                  wrapper="div"
                />
              )}
            </div>
            {msg.sender === "bot" && msg.isButton && (
              <button
                onClick={() => handleSimilarQuestion(msg.id)}
                className="similar-question-button"
              >
                <GiReturnArrow /> {msg.text}
              </button>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Chat;
