import color from 'color';
import { configureFonts, DefaultTheme} from 'react-native-paper';

const fonts = {
    default: {
        regular: {
            fontFamily: 'noto-sans',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'noto-sans-bold',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'noto-sans',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'noto-sans',
            fontWeight: 'normal',
        },
    },
}

const theme = {
  dark: false,
  mode: 'exact',
  roundness: 5,
  colors: {
    primary: '#fc7930',
    accent: '#479564',
    background: '#ffffff',
    surface: '#ffffff',
    error: '#B00200',
    text: '#000000',
    disabled: '#A6A6A6',
    placeholder: '#A6A6A6',
    backdrop: '#ffffff',
  },
  fonts: configureFonts(fonts),
  animation: {
    scale: 1.0,
  },
};

export default theme;