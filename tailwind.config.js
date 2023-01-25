/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'app-yellow': '#DDCCAA',
        'app-red': '#E31221',
        'app-gray': '#CED4DA',
        'app-black-dark': '#11101A',
        'app-black': '#212529',
        'app-bg': '#222030',
        'app-link': '#0D6EFD',
        'app-dark-gray': '#6C757D',
      },
      backgroundImage: {
        'app-gradient':
          'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)',
        'app-gradient-dark':
          'linear-gradient(180deg, #11101A 0%, #08080D 50.52%, rgba(0, 0, 0, 90%) 100%)',
        'app-gradient-washed':
          'linear-gradient(112.94deg, rgba(239, 239, 239, 0.3) -1.81%, rgba(239, 239, 239, 0.00514528) 102.5%, rgba(1, 1, 1, 0.00260417) 102.51%, rgba(239, 239, 239, 0.05) 102.52%)',
        'app-slide-one': "url('/assets/images/img-1.png')",
        'app-slide-two': "url('/assets/images/img-2.png')",
        'app-slide-three': "url('/assets/images/img-3.png')",
      },
      fontFamily: {
        helvetica: 'HelveticaNeue',
      },
    },
  },
  plugins: [],
};
