import {
    Box,
    Flex
} from '@chakra-ui/react'
import Logo from '../components/logo'

const Navbar = () => {
    return (
        <Box
            bg="gray.100"
            p="3">
            <Flex>
                <Logo />
                {/* TODO: Implement login */}
            </Flex>
        </Box>
    )
}

export default Navbar