function ApyBadge({ apy }: { apy: string }) {
  return (
    <div className="flex items-center">
      <img
        src="/icons/like.svg"
        className="w-12 h-12 object-contain -mr-4 z-10"
        alt="APY Icon"
      />

      <div className="flex items-center bg-black rounded-lg py-2 px-3 pl-5 h-10">
        <span
          style={{
            textShadow: '-2px 1px 0px #000000',
            fontFamily: 'Lilita One, cursive',
            letterSpacing: '1%',
          }}
          className="text-[25px] not-first:-text-[25px] mr-2">
          APY:
        </span>
        <span
          style={{
            textShadow: '-2px 1px 0px #000000',
            fontFamily: 'Lilita One, cursive',
            letterSpacing: '1%',
          }}
          className="text-[25px] text-[#C689FF]">
          {apy}
        </span>
      </div>
    </div>
  );
}

export default ApyBadge;
