// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,jsx}'],
  theme: {
    extend: {
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.1em',
        wider: '0.2em',
        widest: '0.3em',
        custom: '5px', 
      },
      colors: {
        yellowgreen: 'rgb(154, 205, 50)',
        violette: 'rgb(204, 153, 255)',
        // green: '#cad9ad',
        // beige: 'rgb(219, 246, 188)',
        // turquoise: 'rgb(153, 255, 255)',
        // greey: '#2E3349',
        // whiteGrey: '#494B60',
        // blue: '#009AE4',
        // greeeen :'#085C81',
        // blueDark : '#181E36',
        // whiteBlue : '#12acd6',
        canceled : '#FB8B8F',
        pending : '#b3bdc1',
        checked : '#67C7B8',
        pistache :' #809d0d',
        whitegreen : 'rgba(237, 237, 226 , 0.9)',
        green : 'rgb(202, 217, 173)',
        greeClaire : 'rgba(202, 217, 173 ,0.5)',
      },
    },
  },
  plugins: [],
};

