import { Dialog } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'

const COLOR_PRIMARY = '#020941';
const COLOR_BLUE_PRIMARY = '#2699fb';
const COLOR_BLUE_SECCONDARY = '#84c6ff';
const WHITE = 'white';

export const theme = createMuiTheme({
  palette: {
    action: {
      disabledBackground: COLOR_BLUE_SECCONDARY,
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
      outlinedPrimary: {
        backgroundColor: COLOR_PRIMARY,
        border: `solid 2px ${COLOR_BLUE_PRIMARY}`,
        color: WHITE,
        "&:hover": {
          backgroundColor: COLOR_PRIMARY,
          border: `solid 2px ${COLOR_BLUE_SECCONDARY}`,
        }
      },
      containedPrimary: {
        // backgroundColor: 'linear-gradient(90deg, rgba(132,198,255,1) 10%, rgba(38,153,251,1) 100%)',
        backgroundColor: COLOR_BLUE_PRIMARY,
        color: WHITE,
        "&:hover": {
          backgroundColor: COLOR_BLUE_SECCONDARY,
        }
      },
    },

    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: '#eee',
      }
    },
  
    MuiDialog: {
      root: {
        minWidth: '350px',
      }
    }
  },
});
