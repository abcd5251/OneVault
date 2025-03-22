import { ChevronRightIcon } from '@heroicons/react/24/solid';

function LinkBadge() {
  return (
    <div className="flex items-center mb-5">
      <div className="flex items-center">
        <img
          src="/icons/link.svg"
          alt="Morpho Link"
          className="w-12 h-12 object-contain -mr-4 z-10"
        />
        <div className="inline-flex items-center bg-[#272C3D] rounded-lg py-2 px-1 pl-5">
          <span
            className="text-gray-200 truncate text-[16px]"
            style={{ letterSpacing: '1%' }}>
            https://app.morpho.org/Vault
          </span>
          <ChevronRightIcon className="w-5 h-5 ml-1 text-gray-300" />
        </div>
      </div>
    </div>
  );
}

export default LinkBadge;
