import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      wheaty_1: string
      primary_1: string
      secondary_1: string
      text_1: string
      text_2: string
      grad_1: string
      grad_2: string
      grad_3: string

      wheaty_3: string
      wheaty_4: string
      mono_2: string
      mono_3: string
      bg_1: string
      bg_2: string
    }
    shadows: {
      button: string
      small: string
      big: string
      up: string
    }
    gradient: string
    font: string
    text: {
      body: string
      h1: string
      h2: string
      h3: string
      h4: string
      h5: string
      small: string
    }
  }
}
