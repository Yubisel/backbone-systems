import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    // mode: "dark", 
    primary: {
      main: '#273377',
    },
    secondary: {
      main: '#2e7031',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
