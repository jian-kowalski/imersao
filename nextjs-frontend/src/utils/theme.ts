import { createTheme, Theme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";


// Create a theme instance.
const palette: PaletteOptions ={
    type: "dark",
    primary: {
        main: red[800],
        contrastText: '#FFFFFF',
    },
    background: {
        default: '#242526'
    }
};

const theme: Theme = createTheme({
    palette,
});

export default theme;