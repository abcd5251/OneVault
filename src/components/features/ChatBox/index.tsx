import { useState, useRef, useEffect } from 'react';
import { usePopup } from '@/contexts/PopupContext';

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 完全使用 Context
  const { state, openPopup, closePopup } = usePopup();

  // 只使用 Context 的顯示狀態
  const isVisible = state.activePopup === 'chat';

  const handleCancelClick = () => {
    closePopup();
  };

  const handleBackClick = () => {
    openPopup('strategy');
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // 添加用戶消息
    setMessages([...messages, { text: inputText, isUser: true }]);

    // 清空輸入
    setInputText('');

    // 模擬AI回覆
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: `Thanks for your question about "${inputText}". This is a simulated AI response.`,
          isUser: false,
        },
      ]);
    }, 1000);
  };

  // 自動滾動到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-900/80 absolute t-0 left-0 w-full h-full z-0"></div>
        <div className="bg-[#1E90FF] text-white rounded-lg shadow-lg p-6 w-[90vw] max-w-[600px] max-h-[600px] flex flex-col z-10 relative">
          {/* Header */}
          <div className="w-full flex items-center justify-between p-4">
            <img
              src="/AIChat/back.svg"
              className="h-10 absolute left-2 top-2 cursor-pointer"
              onClick={handleBackClick}
            />
            <img
              src="/AIChat/topic.svg"
              className="h-5 absolute right-55 top-5 cursor-pointer"
            />
            <img
              src="/morpho/cancel.svg"
              className="h-10 absolute right-2 top-2 cursor-pointer"
              onClick={handleCancelClick}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col items-center px-4 flex-1 overflow-hidden">
            {/* Bear Icon */}
            <img src="/AIChat/bear.svg" className="h-20" />

            {messages.length === 0 ? (
              <>
                {/* Title */}
                <h1 className="text-center text-white mb-6">
                  Ask me anything about this strategy, <br /> or tap on a
                  question below to get started.
                </h1>

                {/* Question Buttons */}
                <div className="grid grid-cols-4 gap-4 w-full max-w-lg">
                  <button
                    className="bg-blue-400 p-2 rounded-lg text-xs text-white"
                    onClick={() =>
                      setInputText("How does Morpho's lending work?")
                    }>
                    How does Morpho&apos;s lending work?
                  </button>
                  <button
                    className="bg-blue-400 p-2 rounded-lg text-xs text-white"
                    onClick={() =>
                      setInputText(
                        'What makes the Gauntlet WETH Prime Vault different?',
                      )
                    }>
                    What makes the Gauntlet WETH Prime Vault different?
                  </button>
                  <button
                    className="bg-blue-400 p-2 rounded-lg text-xs text-white"
                    onClick={() =>
                      setInputText('How is the 3.72% APY calculated?')
                    }>
                    How is the 3.72% APY calculated?
                  </button>
                  <button
                    className="bg-blue-400 p-2 rounded-lg text-xs text-white"
                    onClick={() =>
                      setInputText('What risks should I be aware of?')
                    }>
                    What risks should I be aware of?
                  </button>
                </div>
              </>
            ) : (
              // Messages container
              <div className="w-full overflow-y-auto flex-1 mb-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      msg.isUser ? 'text-right' : 'text-left'
                    }`}>
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        msg.isUser
                          ? 'bg-blue-700 text-white'
                          : 'bg-blue-100 text-blue-900'
                      }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef}></div>
              </div>
            )}

            {/* Input area */}
            <div className="w-full flex items-center bg-blue-600 rounded-full p-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder="Type your question here..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-blue-200 px-4"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-white text-blue-500 rounded-full p-2 w-10 h-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
