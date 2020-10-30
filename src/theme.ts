import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    action: {
      disabledBackground: 'set color of background here',
      disabled: 'set color of text here'
    }
  },
  typography: {
    button: {
      // fontSize: '1rem',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
        fontFamily: '"Exo 2", "Roboto", "Helvetica", "Arial", sans-serif',
      },
    },
  },
});
