// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.1em',
        wider: '0.2em',
        widest: '0.3em',
        custom: '5px', // Adding a custom value for letter-spacing
      },
      colors:{
        'yellowgreen': 'rgb(154,205,50)'
      }
    },
  },
  plugins: [],
};
