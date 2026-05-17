import { useState } from "react";

function AIAssistant({ language }) {
  const isArabic = language === "ar";

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: isArabic
        ? "مرحبًا، أنا مساعد Planova AI. كيف أستطيع مساعدتك اليوم؟"
        : "Hello, I am Planova AI Assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const studyData = JSON.parse(
    localStorage.getItem("planova-study-planner") || "{}"
  );

  const skillData = JSON.parse(
    localStorage.getItem("planova-skill-planner") || "{}"
  );

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          language,
          studyData,
          skillData,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            data.reply ||
            (isArabic
              ? "حدث خطأ أثناء إنشاء الرد."
              : "An error occurred while generating the reply."),
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: isArabic
            ? "فشل الاتصال بخادم الذكاء الاصطناعي."
            : "Failed to connect to AI server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="dashboard-hero animated-card">
        <div>
          <p className="eyebrow">
            {isArabic ? "المساعد الذكي" : "AI Assistant"}
          </p>

          <h1>{isArabic ? "مساعد Planova AI" : "Planova AI Assistant"}</h1>

          <p className="hero-text">
            {isArabic
              ? "تحدث مع الذكاء الاصطناعي لتنظيم الدراسة وتعلم المهارات."
              : "Chat with AI to organize study plans and learn new skills."}
          </p>
        </div>
      </section>

      <section className="ai-layout">
        <div className="card ai-chat-card">
          <div className="ai-messages">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`ai-message ${
                  message.role === "user" ? "user-message" : "assistant-message"
                }`}
              >
                <div className="ai-avatar">
                  {message.role === "user" ? "You" : "AI"}
                </div>

                <p>{message.text}</p>
              </div>
            ))}

            {loading && (
              <div className="ai-message assistant-message">
                <div className="ai-avatar">AI</div>
                <p>{isArabic ? "جاري التفكير..." : "Thinking..."}</p>
              </div>
            )}
          </div>

          <div className="ai-input-area">
            <input
              type="text"
              placeholder={isArabic ? "اكتب رسالتك..." : "Type your message..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button type="button" onClick={sendMessage} disabled={loading}>
              {loading
                ? isArabic
                  ? "انتظر..."
                  : "Wait..."
                : isArabic
                ? "إرسال"
                : "Send"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AIAssistant;