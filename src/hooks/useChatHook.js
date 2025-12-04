import { useState, useEffect, useRef } from "react";

// -------------------------
// Session Hook
// -------------------------
export function useChatSession() {
    const getSessionId = () => {
        let id = localStorage.getItem("session_id");
        if (!id) {
            id = "sess_" + Math.random().toString(36).substring(2) + Date.now();
            localStorage.setItem("session_id", id);
        }
        return id;
    };
    return { getSessionId };
}

// -------------------------
// Chat Messages Hook
// -------------------------
export function useChatMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatWindowRef = useRef(null);

    const sanitizeHTML = (str) => {
        const temp = document.createElement("div");
        temp.innerHTML = str;
        const allowedTags = ["A", "BR", "STRONG", "H1", "H2"];
        const elements = temp.getElementsByTagName("*");

        for (let i = elements.length - 1; i >= 0; i--) {
            const el = elements[i];
            if (!allowedTags.includes(el.tagName)) {
                el.replaceWith(document.createTextNode(el.innerHTML));
            } else if (el.tagName === "A") {
                el.setAttribute("target", "_blank");
                el.setAttribute("rel", "noopener noreferrer");
            }
        }
        return temp.innerHTML;
    };

    const appendMessage = (sender, text, isHtml = false) => {
        const sanitizedText = isHtml ? sanitizeHTML(text) : text;
        setMessages((prev) => [...prev, { sender, text: sanitizedText, isHtml }]);
        setTimeout(() => {
            if (chatWindowRef.current)
                chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }, 50);
    };

    const sendMessage = async (message, getSessionId, RENDER_URL) => {
        if (!message.trim()) return;

        appendMessage("user", message);
        setLoading(true);

        try {
            const res = await fetch(`${RENDER_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, session_id: getSessionId() }),
            });
            const data = await res.json();

            // Remove typing animation
            setMessages((prev) => prev.filter((msg) => !msg.text.includes("typing-dot")));
            
            appendMessage("bot", data.reply, true);
        } catch (err) {
            setMessages((prev) => prev.filter((msg) => !msg.text.includes("typing-dot")));
            appendMessage("bot", "Don't understand, please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { messages, appendMessage, sendMessage, loading, chatWindowRef };
}

// -------------------------
// FAQ Hook
// -------------------------
export function useFAQ(RENDER_URL) {
    const [faqs, setFaqs] = useState([]);
    const faqContainerRef = useRef(null);

    useEffect(() => {
        const loadFAQ = async () => {
            try {
                const res = await fetch(`${RENDER_URL}/api/admin/faq`);
                const data = await res.json();
                const randomFAQs = data.sort(() => 0.5 - Math.random()).slice(0, 4);
                setFaqs(randomFAQs);
            } catch (err) {
                console.error(err);
            }
        };
        loadFAQ();
    }, [RENDER_URL]);

    const handleFAQWheel = (e) => {
        e.preventDefault();
        const container = e.currentTarget;

        container.scrollBy({
            left: e.deltaY,
        });
    };

    useEffect(() => {
        const el = faqContainerRef.current;
        if (!el) return;

        el.addEventListener("wheel", handleFAQWheel, { passive: false });

        return () => {
            el.removeEventListener("wheel", handleFAQWheel);
        };
    }, []);



    return { faqs, faqContainerRef, handleFAQWheel };
}

// -------------------------
// Chat Visibility Hook
// -------------------------
export function useChatVisibility() {
    const [chatVisible, setChatVisible] = useState(false);
    const [greeted, setGreeted] = useState(false);

    const openChat = (appendMessage) => {
        setChatVisible(true);
        if (!greeted && appendMessage) {
            setTimeout(() => {
                appendMessage(
                    "bot",
                    "Hello, I'm your Chatbot AI Library. You can freely ask me about the library."
                );
            }, 500);
            setGreeted(true);
        }
    };

    const closeChat = () => setChatVisible(false);

    return { chatVisible, openChat, closeChat };
}
