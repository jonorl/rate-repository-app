import { TextStyle } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#000000',
    textSecondary: '#ff0000',
    primary: '#00ff00',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: 'System',
  },
  fontWeights: {
    normal: '400' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
  },
};

export default theme;