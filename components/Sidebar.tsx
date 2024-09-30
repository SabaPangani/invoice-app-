"use client";
import Image from "next/image";
import Logo from "../app/assets/Logo.png";
import Pfp from "../app/assets/Pfp.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [classTheme, setClassTheme] = useState("");
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setClassTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setClassTheme("dark");
    }
  };

  return (
    <div className="bg-[#373B53] dark:bg-dark1 w-full max-w-[150px] rounded-r-[26px] h-screen flex flex-col items-center justify-between pb-20 absolute left-0 top-0 z-50 large:flex-row large:max-w-full large:h-[80px] large:pb-0 large:rounded-none large:pr-10">
      <div className="bg-primary w-[150px] rounded-r-[26px] h-[152px] relative large:h-[80px]">
        <Image
          src={Logo}
          alt=""
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex flex-col gap-y-12 items-center w-full large:flex-row large:justify-end gap-x-10 large:h-full">
        {classTheme == "dark" ? (
          <i
            className="bi bi-sun-fill scale-150 text-btn-hover cursor-pointer"
            onClick={toggleTheme}
          ></i>
        ) : (
          <i
            className="bi bi-moon-fill scale-150 text-btn-hover cursor-pointer"
            onClick={toggleTheme}
          ></i>
        )}

        <div className="w-full h-[1px] large:w-[1px] large:h-full bg-gray"></div>
        <Image src={Pfp} alt="" />
      </div>
    </div>
  );
}
