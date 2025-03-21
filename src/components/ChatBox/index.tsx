import { useState, useRef, useEffect } from 'react';
interface Message {
  text: string;
  isUser: boolean;
}

interface ChatBoxProps {
  isOpen: boolean;
  setShowChatBox: (show: boolean) => void;
  setShowPopup: (show: boolean) => void;
}

export default function ChatBox({
  isOpen,
  setShowChatBox,
  setShowPopup,
}: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setMessages((prev) => [...prev, { text: inputText, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/defiInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: inputText }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.result, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }

    setInputText('');
  };

  const handleBackClick = () => {
    setShowPopup(true);
    handleCancelClick();
  };

  const handleCancelClick = () => {
    setShowChatBox(false);
    setMessages([]);
    setInputText('');
  };

  if (!isOpen) return null;

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
              <div className="flex-1 w-full overflow-y-auto mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.isUser ? 'text-right' : 'text-left'
                    }`}>
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        message.isUser
                          ? 'bg-blue-400 text-white'
                          : 'bg-white text-black'
                      }`}>
                      {message.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-center w-full my-4">
                    <div className="bg-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0ms' }}></div>
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: '200ms' }}></div>
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Question Input */}
            <div className="w-full mt-10">
              <div className="flex p-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Ask anything.."
                  className="bg-gray-800 flex-1 text-white px-4 py-2 rounded-lg outline-none"
                />
                <img
                  src="/AIChat/send.svg"
                  className="h-10 ml-3 cursor-pointer"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
