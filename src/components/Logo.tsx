import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <>
      <img
        src="/src/assets/logo-cubos-movies-light.png"
        alt="Cubos Movies"
        className={`hidden sm:block h-8 md:h-10 ${className}`}
      />
      <img
        src="/src/assets/logo-cubos-movies-light-mobile.png"
        alt="Cubos Movies"
        className={`sm:hidden h-8 ${className}`}
      />
    </>
  );
};
