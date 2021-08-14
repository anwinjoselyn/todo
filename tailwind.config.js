module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      blue: {
        light: '#B5DFFF',
        DEFAULT: '#4AA7ED',
        dark: '#147BC9',
      },
      red: {
        DEFAULT: '#FF2929',
      },
      orange: {
        DEFAULT: '#F57636',
      },
      yellow: {
        DEFAULT: '#FFFF0D',
      },
      green: {
        light: '#BFFFDA',
        DEFAULT: '#15C25E',
        dark: '#209652',
      },
      'primary-text-color': '#00212B',
      'secondary-text-color': '#014559',
      'muted-text-color': '#0280A6',
      'bg-dark': '#AECAD4',
      'bg-other': '#139ED1',
      'bg-light': '#F7FDFF',
      'border-color': '#E6EDF0',
      'border-color-dark': '#AEBCC2',
      gray: {
        darkest: '#1f2d3d',
        dark: '#3c4858',
        DEFAULT: '#c0ccda',
        light: '#e0e6ed',
        lightest: '#f9fafc',
      },
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
    boxShadow: {
      custom1: '0px 7px 29px 0px rgba(100, 100, 111, 0.2)',
      custom2: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      custom3: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
      custom4: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
      custom5:
        'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
