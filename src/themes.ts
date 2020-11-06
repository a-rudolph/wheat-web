import swiss from '@theme-ui/preset-swiss'

export const defaultTheme = {
  ...swiss,
  button: {
    cursor: 'pointer',
  },
  shadowy: {
    boxShadow: '1px 1px 1px 1px',
  },
  nav: {
    p: 2,
    width: '100vw',
    zIndex: 50,
    position: 'fixed',
    top: 0,
    bg: 'rgb(0,0,0,0.45)',
    boxShadow: '0px 10px 10px 10px rgb(0,0,0,0.45)',
    item: {
      p: 2,
      borderRight: '1px solid',
      borderColor: 'primary',
    },
  },
  mask: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(0,0,0,0.35)',
  },
  height: {
    medium: '32px',
    large: '96px',
    small: '24px',
  },
  logo: {
    transform: 'rotate(140deg)',
  },
}
