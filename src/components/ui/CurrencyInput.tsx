import { useState, forwardRef } from 'react';

const currencies = [
  { id: 'usdc', name: 'USDC', icon: '/usdc.svg' },
  { id: 'usdt', name: 'USDT', icon: '/usdt.svg' },
];

interface Props {
  onChange?: (value: { currency: string; amount: string }) => void;
  value?: { currency: string; amount: string };
  name?: string;
}

const CurrencyInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, value, name }, ref) => {
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
    const [amount, setAmount] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleAmountChange = (inputValue: string) => {
      setAmount(inputValue);
      onChange?.({ currency: selectedCurrency.id, amount: inputValue });
    };

    const handleCurrencyChange = (currency: (typeof currencies)[0]) => {
      setSelectedCurrency(currency);
      onChange?.({ currency: currency.id, amount });
      setIsOpen(false);
    };

    return (
      <div className="relative w-full h-[68px]">
        {/* Main container with clip path for angled corner and shadow effect */}
        <div
          className="absolute inset-0 bg-black translate-x-2 translate-y-2 z-0 pointer-events-none"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)',
          }}></div>

        {/* Input container */}
        <div
          className="relative w-full h-full z-10"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)',
          }}>
          {/* Currency selector area */}
          <div className="absolute left-0 top-0 bottom-0 w-[70px] bg-[#0A87FE] z-10">
            <button
              className="w-full h-full flex items-center justify-center focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}>
              <img
                src={selectedCurrency.icon}
                alt={selectedCurrency.name}
                className="w-[38px] h-[38px]"
              />
            </button>

            {/* Arrow indicator */}
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-[22px] h-[22px] bg-[#0A87FE] rounded-full flex items-center justify-center z-20">
              <span className="text-white font-bold text-sm">&gt;</span>
            </div>
          </div>

          {/* Input area */}
          <div className="absolute left-[70px] right-0 top-0 bottom-0 bg-[#1E47AB] flex items-center pl-8">
            <input
              ref={ref}
              name={name}
              type="string"
              value={value?.amount || amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder={`Select the amount of USDC or USDT to deploy..`}
              className="w-full bg-transparent border-none outline-none text-white text-lg font-medium placeholder-gray-200"
              min="0"
              step="0.01"
              onFocus={() => setIsOpen(false)} // Close dropdown when focusing on input
            />
          </div>
        </div>

        {/* Dropdown positioned under the currency icon */}
        {isOpen && (
          <>
            {/* Invisible overlay to handle clicking outside */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}></div>

            {/* Actual dropdown positioned under the currency icon */}
            <div
              className="absolute left-0 top-[68px] w-[150px] bg-white shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}>
              {currencies.map((currency) => (
                <div
                  key={currency.id}
                  className="py-3 px-4 cursor-pointer hover:bg-gray-300"
                  onClick={() => handleCurrencyChange(currency)}>
                  <div className="flex items-center">
                    <img
                      src={currency.icon}
                      alt={currency.name}
                      className="h-8 w-8"
                    />
                    <span className="ml-3 text-black font-bold text-lg">
                      {currency.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  },
);

CurrencyInput.displayName = 'CurrencyInput';

export default CurrencyInput;
