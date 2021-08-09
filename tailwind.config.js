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
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
