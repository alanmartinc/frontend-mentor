module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      colors: {
        mygBlue: "hsl(217, 19%, 38%)",
        mydgBlue: "hsl(217, 19%, 24%)",
        mydBlue: "hsl(218, 23%, 16%)",
        lightCyan: "hsl(193, 38%, 86%)",
        neonGreen: "hsl(150, 100%, 66%)",
        hovnGreen: "hsl(150, 100%, 70%)",
      },
      letterSpacing: {
        myWide: "5px",
      },
      boxShadow: {
        neonShadow: "0 0 15px 5px hsl(150, 100%, 76%)",
      },
    },
  },
  plugins: [],
};
