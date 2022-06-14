import {
    Box,
    Flex
} from '@chakra-ui/react'
import Logo from '../components/logo'
import NavbarAuth from './navbarAuth'

export async function getServerSideProps(context) {
    console.log(context.req)

    return {
        props: {}
    }
}

const Navbar = () => {
    return (
        <Box
            bg="gray.100"
            p="3">
            <Flex justify={'space-between'}>
                <Logo />
                <NavbarAuth />
            </Flex>
        </Box>
    )
}

export default Navbar