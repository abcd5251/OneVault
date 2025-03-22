import { useState, useRef, useEffect } from 'react';
import { useModal } from '@/contexts/ModalContext';
import Modal from '@/components/ui/Modal';
import { Message, ModalType } from '@/types';

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 完全使用 Context
  const { state, openModal, closeModal } = useModal();

  // 只使用 Context 的顯示狀態
  const isVisible = state.activeModal === ModalType.CHAT;

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

  // 更新自定義樣式以匹配截圖 - 移除標題背景色
  const customStyles = {
    container: 'bg-[#4685f5] max-h-[80vh]', // 調整整體背景色以匹配截圖
    header:
      'bg-transparent text-white [text-shadow:2px_2px_0px_#000000cc] [-webkit-text-stroke:1px_#000000] border-b-0', // 移除背景色
    content: 'flex flex-col p-4',
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={closeModal}
      title="AI STRATEGIST"
      icon=""
      showBackButton={true}
      onBack={() => openModal(ModalType.STRATEGY)}
      customStyles={customStyles}>
      <div className="flex flex-col items-center w-full">
        {messages.length === 0 ? (
          <>
            {/* Bear Icon - 更新為圓形白色邊框 */}
            <div className="w-32 h-32 rounded-full bg-[#e87eab] flex items-center justify-center mb-10 mt-8 border-[6px] border-white overflow-hidden">
              <img src="/chatbox/bear.svg" className="h-24" alt="Bear AI" />
            </div>

            {/* Title - 增加文字陰影效果 */}
            <h1 className="text-center text-white text-2xl mb-10 font-bold [text-shadow:2px_2px_0px_#000000] [-webkit-text-stroke:1px_#000000]">
              Ask me anything about this strategy, or tap on a<br />
              question below to get started.
            </h1>

            {/* Question Buttons - 調整為更接近截圖的樣式 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mb-8 px-8">
              <button
                className="bg-[#366be3] hover:bg-blue-700 py-4 px-5 rounded-lg text-white text-left shadow-md border border-blue-400 text-lg"
                onClick={() => setInputText("How does Morpho's lending work?")}>
                How does Morpho&apos;s lending work?
              </button>
              <button
                className="bg-[#366be3] hover:bg-blue-700 py-4 px-5 rounded-lg text-white text-left shadow-md border border-blue-400 text-lg"
                onClick={() =>
                  setInputText(
                    'What makes the Gauntlet WETH Prime Vault different?',
                  )
                }>
                What makes the Gauntlet WETH Prime Vault different?
              </button>
              <button
                className="bg-[#366be3] hover:bg-blue-700 py-4 px-5 rounded-lg text-white text-left shadow-md border border-blue-400 text-lg"
                onClick={() =>
                  setInputText('How is the 3.72% APY calculated?')
                }>
                How is the 3.72% APY calculated?
              </button>
              <button
                className="bg-[#366be3] hover:bg-blue-700 py-4 px-5 rounded-lg text-white text-left shadow-md border border-blue-400 text-lg"
                onClick={() =>
                  setInputText('What risks should I be aware of?')
                }>
                What risks should I be aware of?
              </button>
            </div>
          </>
        ) : (
          // Messages container
          <div className="w-full overflow-y-auto flex-1 mb-4 px-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${msg.isUser ? 'text-right' : 'text-left'}`}>
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

        {/* Input area - 底部輸入框樣式優化 */}
        <div className="w-full px-4 mt-auto">
          <div className="w-full flex items-center bg-[#2d3342] rounded-full p-2 shadow-inner">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 px-4"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 text-white rounded-full p-2 w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700">
              <img src="/chatbox/send.svg" alt="Send" className="w-20 h-20" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
