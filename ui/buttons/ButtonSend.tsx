import { buttonNames } from "@/lib/const";

export default function ButtonSend() {
  return (
    <button
      type="submit"
      className="bg-primary w-full max-w-[170px] h-[48px] rounded-[28px] font-bold text-white hover:bg-secondaryPale transition-all medium:text-sm"
    >
      <p>{buttonNames.send}</p>
    </button>
  );
}
