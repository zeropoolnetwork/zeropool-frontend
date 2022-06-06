import { createTheme } from '@mui/material'
import { Theme } from '@mui/material/styles'

const COLOR_PRIMARY = '#020941'
const COLOR_BLUE_PRIMARY = '#2699fb'
const COLOR_BLUE_SECCONDARY = '#84c6ff'
// const COLOR_BLUE_LIGHT = '#c4e1fa';
const WHITE = 'white'
const GREEN = '#4be3fa'
const INPUT_UNDERLINE_COLOR = COLOR_BLUE_SECCONDARY

export const theme = createTheme({
  palette: {
    action: {
      disabledBackground: COLOR_BLUE_SECCONDARY,
      disabled: 'set color of text here',
    },
    primary: {
      main: COLOR_PRIMARY,
    },
  },

  components: {
    MuiAppBar: {
      // styleOverrides: ({ ownerState }) => ({
      //   ...ownerState.color === 'primary' && {
      //     backgroundColor: COLOR_PRIMARY,
      //   },
      // }),
    },

    MuiButton: {
      styleOverrides: {
        root: {
          color: WHITE,
          fontSize: '1rem',
          fontFamily: '"Exo 2", "Roboto", "Helvetica", "Arial", sans-serif',
          margin: '5px',
        },
        outlinedPrimary: {
          backgroundColor: COLOR_PRIMARY,
          border: `solid 2px ${COLOR_BLUE_PRIMARY}`,
          color: WHITE,
          ':hover': {
            backgroundColor: COLOR_PRIMARY,
            border: `solid 2px ${COLOR_BLUE_SECCONDARY}`,
          },
        },
        containedPrimary: {
          // backgroundColor: 'linear-gradient(90deg, rgba(132,198,255,1) 10%,
          // rgba(38,153,251,1) 100%)',
          backgroundColor: COLOR_BLUE_PRIMARY,
          color: WHITE,
          ':hover': {
            backgroundColor: COLOR_BLUE_SECCONDARY,
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: COLOR_PRIMARY,
          padding: 0,
          ':hover': {
            backgroundColor: COLOR_PRIMARY,
          },
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        barColorPrimary: {
          backgroundColor: GREEN,
        },
        colorPrimary: {
          backgroundColor: COLOR_PRIMARY,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        root: {
          minWidth: '350px',
        },
      },
    },

    MuiInputLabel: {},

    MuiInput: {
      styleOverrides: {
        root: {
          color: WHITE,
          ':after': {
            borderBottomColor: INPUT_UNDERLINE_COLOR,
          },
          ':not(.Mui-disabled):after': {
            borderBottomColor: INPUT_UNDERLINE_COLOR,
          },
          ':hover:not(.Mui-disabled):after': {
            borderBottomColor: INPUT_UNDERLINE_COLOR,
          },
          ':not(.Mui-disabled):before': {
            borderBottomColor: INPUT_UNDERLINE_COLOR,
          },
          ':hover:not(.Mui-disabled):before': {
            borderBottomColor: INPUT_UNDERLINE_COLOR,
          },
        },
        colorSecondary: {
          color: WHITE,
        },
      },
    },
  },
})
