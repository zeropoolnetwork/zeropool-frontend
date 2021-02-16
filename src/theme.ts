import { createMuiTheme } from '@material-ui/core/styles'

const COLOR_PRIMARY = '#020941';

export const theme = createMuiTheme({
  palette: {
    action: {
      disabledBackground: 'set color of background here',
      disabled: 'set color of text here',
    },
    primary: {
      main: COLOR_PRIMARY,
    }
  },

  typography: {
    button: {
      // fontSize: '1rem',
    },
  },

  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: COLOR_PRIMARY,
      }
    },

    MuiButton: {
      root: {
        fontSize: '1rem',
        fontFamily: '"Exo 2", "Roboto", "Helvetica", "Arial", sans-serif',
        margin: '5px',
      },
    },

    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: '#eee',
      }
    }
  },
});
