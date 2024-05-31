module.exports = {
  content: ["./**/*.html", "./**/*.js"], // Asegúrate de que esto apunta a tus archivos HTML y JS
  darkMode: "media", // Cambia esto a 'media'
  theme: {
    extend: {
      keyframes: {
        showContent: {
          to: { transform: "translateY(0)", filter: "blur(0)", opacity: "1" },
        },
      },
      animation: {
        showContent: "showContent 0.5s 0.7s ease-in-out forwards",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
