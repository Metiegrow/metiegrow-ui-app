export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        dark: '#000000',
        white: '#FFFFFF',
        cardblack: '#232323',
        secondary: '#131313',
        found: '#B8B8B8',
        borders: '#646464',
        whites: '#C3C3C3',
        borderfound: '#373737',
        borderfoun: '#565656',
        textgreen: '#50FFB9',
        textorange: '#FF723B',
        bgthinblack: '#090300',
        founday: '#A82EFF',
        textyellow: '#FAFE43',
        purple: {
          primary: '#BC5FFF',
        },
        text: {
          textgray: '#979797',
          textinput: '9A9A9A',
          textblack: '#232323',
          textwhite: '#FFFFFF',
          foundationgray: '#959497',
          searchbtngray: '#B7B7B9',
          graytext: '#646464',
        },

        accent: {
          green: '#50FFB9',
          yellow: '#FAFD43',
          red: '#FF0D0D',
          blue: '#14C0FE',
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  safelist: [
    {
      pattern: /^ant-/,
    },
  ],
  important: true,
};
