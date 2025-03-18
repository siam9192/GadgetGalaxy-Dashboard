import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ETheme, TTheme } from "../../types/util.type";

const ThemeToggler = () => {
  const [theme, setTheme] = useState<TTheme>(() => {
    const storedTheme = localStorage.getItem("theme") as TTheme;
    return Object.values(ETheme).includes(storedTheme as any) ? storedTheme : ETheme.DARK;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle(ETheme.DARK, theme === ETheme.DARK);
  }, [theme]);

  const toggle = () => {
    if (theme === ETheme.DARK) setTheme(ETheme.LIGHT);
    else setTheme(ETheme.DARK);
  };
  return (
    <button onClick={toggle} className="text-4xl  text-primary ">
      {theme === ETheme.DARK ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};

export default ThemeToggler;
