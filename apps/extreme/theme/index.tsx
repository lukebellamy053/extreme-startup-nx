import {colors, createTheme} from "@mui/material";
import {createMakeStyles} from "tss-react";

export const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: "outlined"
            }
        },
        MuiTypography: {
            defaultProps: {
                color: 'text.primary',
                variantMapping: {
                    h1: 'h2',
                    h2: 'h2',
                    h3: 'h2',
                    h4: 'h2',
                    h5: 'h2',
                    h6: 'h2',
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    body1: 'span',
                    body2: 'span',
                },
            },
        },
    },
    palette: {
        mode: 'dark',
        action: {
            active: 'rgba(255, 255, 255, 0.54)',
            hover: 'rgba(255, 255, 255, 0.04)',
            selected: 'rgba(255, 255, 255, 0.08)',
            disabled: 'rgba(255, 255, 255, 0.26)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
            focus: 'rgba(255, 255, 255, 0.12)'
        },
        background: {
            default: '#2a2d3d',
            paper: '#2a2d3d'
        },
        primary: {
            light: '#66b0ea',
            main: '#2c90e3',
            dark: '#1f71c3',
            contrastText: colors.common.white
        },
        secondary: {
            light: '#66b0ea',
            main: '#2c90e3',
            dark: '#1f71c3',
            contrastText: colors.common.white
        },
        text: {
            primary: '#f6f5f8',
            secondary: '#9699a4'
        }
    }
});

export const {makeStyles} = createMakeStyles({ useTheme: () => theme});
