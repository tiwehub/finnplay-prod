/** @type {import("tailwindcss").Config} */

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "428px",
      xm: "600px",
      md: "768px",
      lg: "1024px",
      xl: "1276px"
    },
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "1276px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        text: "hsl(var(--text))"
      },
      fontFamily: {
        prompt: ["Prompt", "sans-serif"],
        helvetica: ["Helvetica Now Text", "sans-serif"],
        commissioner: ["Commissioner", "sans-serif"]
      }
    }
  },
  plugins: []
};
