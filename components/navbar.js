import {
    Box,
    Flex
} from '@chakra-ui/react'
import Logo from '../components/logo'
import NavbarAuth from './navbarAuth'

const Navbar = () => {
    return (
        <Box
            bg="gray.100"
            p="3">
            <Flex justify={'space-between'}>
                <Logo />
                <NavbarAuth />
                {/* TODO: Implement login */}
            </Flex>
        </Box>
    )
}

export default Navbar