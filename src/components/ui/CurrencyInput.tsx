import { useState, forwardRef } from "react";
import {
  Listbox,
  ListboxOption,
  ListboxOptions,
  ListboxButton,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const currencies = [
  { id: "usdc", name: "USDC", icon: "/usdc.svg" },
  { id: "usdt", name: "USDT", icon: "/usdt.svg" },
];

interface Props {
  onChange?: (value: { currency: string; amount: string }) => void;
  value?: { currency: string; amount: string };
  name?: string;
}

const CurrencyInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, value, name }, ref) => {
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
    const [amount, setAmount] = useState("");

    const handleAmountChange = (inputValue: string) => {
      setAmount(inputValue);
      onChange?.({ currency: selectedCurrency.id, amount: inputValue });
    };

    const handleCurrencyChange = (currency: (typeof currencies)[0]) => {
      setSelectedCurrency(currency);
      onChange?.({ currency: currency.id, amount });
    };

    return (
      <div className="flex w-full items-center mt-5 bg-background-blue pr-3">
        <div className="relative">
          <Listbox value={selectedCurrency} onChange={handleCurrencyChange}>
            <ListboxButton className="relative w-14 cursor-pointer bg-background-light-blue py-2 pl-3 text-left focus:outline-none">
              <div className="flex items-center">
                <img
                  src={selectedCurrency.icon}
                  alt={selectedCurrency.name}
                  className="h-6 w-6 object-contain"
                />
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <ListboxOptions className="absolute mt-1 max-h-60 w-24 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
              {currencies.map((currency) => (
                <ListboxOption
                  key={currency.id}
                  value={currency}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                      active ? "bg-blue-100" : "text-gray-900"
                    }`
                  }
                >
                  <div className="flex items-center">
                    <img
                      src={currency.icon}
                      alt={currency.name}
                      className="h-6 w-6 object-contain"
                    />
                    <span className="ml-2 text-black">{currency.name}</span>
                  </div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>

        <input
          ref={ref}
          name={name}
          type="number"
          value={value?.amount || amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder={`Select the amount of ${selectedCurrency.name} to deposit...`}
          className="flex-1 bg-[#02309D] py-2 px-3 focus:outline-none placeholder:text-sm text-white"
          min="0"
          step="0.01"
        />
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;
