import { buttonNames } from "@/lib/const";

export default function ButtonDraft({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <button
      className="bg-dark1 w-full max-w-[170px] h-[48px] rounded-[28px] font-bold text-gray gap-x-4 hover:bg-black transition-all medium:text-sm"
      type="button"
      onClick={handleClick}
    >
      {buttonNames.saveDraft}
    </button>
  );
}
