import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, X, Bot, MessageCircle } from 'lucide-react';

interface ChatbotProps {
    initialOpen?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ initialOpen = false }) => {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const [messages, setMessages] = useState([
        { type: 'incoming', text: 'Hi! I am the Make My Clinic AI Assistant.\nHow can I help you today?' },
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [apiUrl, setApiUrl] = useState('');
    const chatboxRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const about_message =
        'At Make My Clinic, we align outpatient care with smart triage algorithms to provide priority and shortest-job routing for the fastest, safest care possible. You are a helpful medical assistant for Make My Clinic.';

    const loadConfig = useCallback(async () => {
        try {
            const key = import.meta.env.VITE_GEMINI_API_KEY;
            if (!key) {
                console.warn("VITE_GEMINI_API_KEY is not defined in the environment.");
            }
            setApiKey(key || '');
            setApiUrl(
                `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${key}`,
            );
        } catch (error) {
            console.error('Error loading config:', error);
        }
    }, [apiKey]);

    useEffect(() => {
        loadConfig();
    }, [loadConfig]);

    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages]);

    const generateResponse = async (message: string) => {
        if (!apiKey) return;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: message + "\n\nContext:" + about_message }],
                    },
                ],
            }),
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            const data = await response.json();
            if (!response.ok) throw new Error(data.error.message);
            return data.candidates[0].content.parts[0].text.replace(
                /\*\*(.*?)\*\*/g,
                '$1',
            );
        } catch (error) {
            console.error('Error generating response:', error);
            return 'Sorry, our AI servers are currently experiencing heavy load. Please try again later.';
        }
    };

    const handleChat = async () => {
        if (!inputMessage.trim()) return;

        const newMessages = [
            ...messages,
            { type: 'outgoing', text: inputMessage },
            { type: 'incoming', text: 'Thinking...' },
        ];
        setMessages(newMessages);
        setInputMessage('');

        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit';
        }

        const response = await generateResponse(inputMessage);

        setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1].text = response || "Error";
            return updated;
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-poppins">
            {/* Floating Action Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.8)] transition-all transform hover:scale-110 border border-yellow-400/50"
                >
                    <Bot size={28} />
                </button>
            )}

            {/* Chat Window */}
            <div
                className={`absolute bottom-0 right-0 origin-bottom-right transition-all duration-300 ease-out ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
                    } w-80 sm:w-96 flex flex-col bg-[#0B0F19]/90 backdrop-blur-xl border border-yellow-500/30 rounded-2xl shadow-2xl overflow-hidden h-[500px] max-h-[80vh]`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-900/50 to-amber-900/50 border-b border-yellow-500/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center border border-yellow-500/50">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-white tracking-wide">Smriti AI</h2>
                            <p className="text-[10px] text-yellow-500 font-semibold uppercase tracking-wider flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse mr-1"></span> Online
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Message Area */}
                <div ref={chatboxRef} className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-yellow-500/20 scrollbar-track-transparent">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex w-full ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-lg ${message.type === 'outgoing'
                                    ? 'bg-yellow-600 text-white rounded-tr-none'
                                    : 'bg-white/10 text-gray-200 border border-white/10 rounded-tl-none backdrop-blur-md'
                                    }`}
                                style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-black/20 border-t border-white/10">
                    <div className="flex items-end gap-2 bg-gray-900/80 border border-white/10 rounded-xl p-1.5 shadow-inner focus-within:border-yellow-500/50 focus-within:ring-1 focus-within:ring-yellow-500/50 transition-all">
                        <textarea
                            ref={textareaRef}
                            value={inputMessage}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask anything..."
                            className="flex-grow p-2 bg-transparent text-white text-sm focus:outline-none resize-none min-h-[40px] max-h-[120px]"
                            rows={1}
                        />
                        <button
                            onClick={handleChat}
                            disabled={!inputMessage.trim()}
                            className="p-2.5 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-0.5"
                        >
                            <Send size={18} className="ml-0.5" />
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold flex items-center justify-center gap-1">
                            Powered by Gemini <Bot size={10} className="text-yellow-500" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
