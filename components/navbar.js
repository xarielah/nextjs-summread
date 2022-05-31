import {
    Box,
    Container,
    Flex,
    Heading
} from '@chakra-ui/react'
import Logo from '../components/navLogo'

const Navbar = () => {
    return (
        <Box
            position={'relative'}
            as="nav"
            w="100%"
            bg={'#ffffff40'}
            style={{ backdropFilter: 'blur(10px)' }}
            zIndex={1}
            align="center"
            display="flex">

            <Container
                p={5}
                maxW='container.md'>
                <Logo />
            </Container>
        </Box >
    )
}

export default Navbar