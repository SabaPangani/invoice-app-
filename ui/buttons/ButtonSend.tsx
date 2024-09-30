import { buttonNames } from "@/lib/const";

export default function ButtonSend() {
  return (
    <button type="submit" className="bg-primary w-full max-w-[170px] h-[56px] rounded-[28px] font-bold text-white hover:bg-secondaryPale transition-all">
      <p>{buttonNames.send}</p>
    </button>
  );
}
