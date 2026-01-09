import { css, DefaultTheme } from 'styled-components'
import _get from 'lodash/get'
import breakpoints from '@/constants/breakpoints'

export const BRAND_NAME = 'whea·ti·ful·ly'

type StyleArg = ReturnType<typeof css> | TemplateStringsArray

export const createResponsiveStyle = (
  bp: keyof typeof breakpoints,
  style: StyleArg
) => {
  return css`
    @media screen and (min-width: ${breakpoints[bp]}px) {
      ${style}
    }
  `
}

createResponsiveStyle.mobile = (style: StyleArg) => {
  return css`
    @media screen and (max-width: ${breakpoints.md}px) {
      ${style}
    }
  `
}

createResponsiveStyle.desktop = (style: StyleArg) => {
  return css`
    @media screen and (min-width: ${breakpoints.md}px) {
      ${style}
    }
  `
}

export const getColor =
  (color: keyof ThemeType['colors']) =>
  ({ theme }: { theme: DefaultTheme }) => {
    return _get(theme, `colors.${color}`, theme.colors.text_1)
  }

type ThemeType = typeof theme

export const getStyle = <
  A extends keyof ThemeType,
  B extends keyof ThemeType[A]
>(
  ...args: [A, B]
) => {
  return (props: { theme: DefaultTheme }) => _get(props.theme, args.join('.'))
}

const wheaty_1 = '#F6BB63'
const primary_1 = '#222528'
const secondary_1 = '#484F55'
const text_1 = '#FFE3B9'
const text_2 = '#B2A086'
const grad_1 = '#42484D'
const grad_2 = '#373C40'
const grad_3 = '#262B31'
const gradient =
  'linear-gradient(3.39deg, rgba(38, 43, 49, 0.5) 4.14%, rgba(55, 60, 64, 0.5) 35.13%, rgba(66, 72, 77, 0.5) 98.58%)'

export const wheaties = {
  0: '#36302a',
  1: '#4d4130',
  2: '#62523a',
  3: '#816943',
  4: '#ac874e', // active 👌
  5: '#d6a55a',
  6: '#e9c485',
  7: '#f4ddb1',
  8: '#f8f0da',
  9: '#fbf7ec',
}

export const theme: DefaultTheme = {
  colors: {
    wheaty_1,
    primary_1,
    secondary_1,
    text_1,
    text_2,
    grad_1,
    grad_2,
    grad_3,

    // deprecate
    wheaty_3: '#B2A086', // more monoy than wheaty tbh
    wheaty_4: '#867A69', // more monoy than wheaty tbh
    mono_2: '#484F55',
    mono_3: '#F3EEED',
    bg_1: '#082032',
    bg_2: '#1C405B',
  },
  shadows: {
    button: '0px 1px 1px rgba(0, 0, 0, 0.25)',
    small: '0px 2px 2px rgba(0, 0, 0, 0.25)',
    big: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    up: '0px -1px 2px rgba(0, 0, 0, 0.25)',
  },
  gradient,
  font: 'Mukta Mahee, sans-serif',
  text: {
    body: '1rem',
    h1: '2.488rem',
    h2: '2.074rem',
    h3: '1.728rem',
    h4: '1.44rem',
    h5: '1.2rem',
    small: '0.833rem',
  },
}
