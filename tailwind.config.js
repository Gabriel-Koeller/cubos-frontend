/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1366px", // Breakpoint customizado para o grid
    },
    extend: {
      colors: {
        // Paleta oficial Cubos Movies
        cubos: {
          bg: "#232225", // Fundo principal
          primary: "#8E4EC6", // Cor principal (roxo)
          white: "#ffffff", // Contraste
          placeholder: "#6F6D78", // Placeholders
        },
        // Cores antigas mantidas para compatibilidade
        primary: {
          50: "#f3f1ff",
          100: "#ebe5ff",
          500: "#8E4EC6",
          600: "#7c44b3",
          700: "#6a3a9f",
        },
        secondary: {
          500: "#6F6D78",
          600: "#545b62",
        },
        // Cores de status
        danger: "#dc3545",
        success: "#28a745",
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "cubos-pattern":
          "url('/src/assets/BACKGROUND-krists-luhaers-543526-unsplash.png')",
      },
      width: {
        "figma-container": "1322px",
        card: "235px",
      },
      height: {
        "figma-container": "782px",
        card: "355px",
        54: "216px",
        66: "264px",
      },
      gap: {
        9: "36px", // gap-9 = 36px
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 8px 24px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
