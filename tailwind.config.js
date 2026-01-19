module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
   theme: {
     extend: {
       animation: {
         'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
         'pulse-slower': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
         'pulse-medium': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
         'beam': 'beam 3s ease-in-out infinite',
       },
       keyframes: {
         beam: {
           '0%, 100%': { opacity: 0 },
           '50%': { opacity: 1 },
         }
       }
    }
   },
  plugins: [],
}