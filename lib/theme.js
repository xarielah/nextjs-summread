import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

const styles = {
    global: props => ({
        body: {
            bg: mode('gray.50')(props)
        }
    })
};

const components = {
    Heading: {
        varians: {
            'section-title': {
                textDecoration: 'underline',
                fontSize: 20,
                textUnderlineOffset: 6,
                textDecorationColor: '#525252',
                textDecorationThickness: 4,
                marginTop: 3,
                marginBottom: 4
            }
        }
    },
    Link: {
        styles: {
            textDecoration: 'none'
        }
    }
};

const colors = {
    dimmedGray: '#808080'
};

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false
};

const theme = extendTheme({
    config,
    styles,
    colors,
    components
});

export default theme;
