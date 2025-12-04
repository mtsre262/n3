import React, { useState, useRef, useEffect } from 'react';
import { sendMessageStream } from '../services/geminiService';
import { Message, Sender } from '../types';
import { SendIcon, BotIcon } from './IconComponents';
import { GenerateContentResponse } from '@google/genai';

const ChatTutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'أهلاً بك يا طالب العلم. أنا معلمك للغة العربية. كيف يمكنني مساعدتك في إعراب الجملة الفعلية اليوم؟',
      sender: Sender.AI,
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: Sender.USER,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const streamResult = await sendMessageStream(userMsg.text);
      
      const aiMsgId = (Date.now() + 1).toString();
      const initialAiMsg: Message = {
        id: aiMsgId,
        text: '', // Start empty
        sender: Sender.AI,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, initialAiMsg]);

      let accumulatedText = '';
      
      for await (const chunk of streamResult) {
        const c = chunk as GenerateContentResponse;
        const text = c.text;
        if (text) {
          accumulatedText += text;
          setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId ? { ...msg, text: accumulatedText } : msg
          ));
        }
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "عذراً، حدث خطأ في الاتصال. حاول مرة أخرى.",
        sender: Sender.AI,
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-night-800 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-night-900 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-300">
          <BotIcon />
        </div>
        <div>
          <h3 className="font-bold text-white">المعلم الآلي</h3>
          <p className="text-xs text-blue-400">متاح للمساعدة الفورية</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === Sender.USER ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-sm leading-7 ${
                msg.sender === Sender.USER
                  ? 'bg-blue-700 text-white rounded-br-none'
                  : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
              }`}
            >
              {/* Simple Markdown-like rendering for bold text */}
              {msg.text.split('**').map((part, i) => 
                i % 2 === 1 ? <strong key={i} className="text-blue-300 font-bold">{part}</strong> : part
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
            <div className="bg-slate-800 rounded-2xl rounded-bl-none p-4 border border-slate-700">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-night-900 border-t border-slate-800">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اسأل عن إعراب جملة أو قاعدة..."
            className="w-full bg-night-800 text-white placeholder-slate-500 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="absolute left-2 top-2 bottom-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTutor;