export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  
 theme: {
    extend: {
      colors: {
        customBg: 'var(--bg-primary)',
        customText: 'var(--text-primary)',
        accent: 'var(--accent-color)',
      },
    },
  },
  plugins: [],
};