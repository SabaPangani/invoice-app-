import { ChangeEvent } from "react";

type CheckboxProps = {
  id: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean
};

export default function Checkbox({
  id,
  name,
  onChange,
  checked,
}: CheckboxProps) {
  return (
    <div className="w-full flex flex-row items-center gap-2">
      <input
        type="checkbox"
        id={id}
        name={name}
        className="relative appearance-none bg-secondaryPale  hover:border border-primary peer shrink-0 w-4 h-4 outline-none rounded-sm mt-1 cursor-pointer"
        onChange={onChange}
        checked={checked}
      />
      <svg
        className="absolute w-4 h-4 mt-1 hidden peer-checked:block peer-checked:bg-primary pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      >
        <path
          d="M1.5 4.49976L3.62425 6.62402L8.96995 1.27832"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
      <label htmlFor={id} className="w-4 h-4 font-bold cursor-pointer">
        {name}
      </label>
    </div>
  );
}
