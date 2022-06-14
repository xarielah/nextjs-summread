import { Button, Link, HStack, Divider } from '@chakra-ui/react'

const RegsiterButton = () => (
    <Link href='/auth?action=register' m={0} style={{ textDecoration: 'none' }}>
        <Button size={{ base: 'sm', lg: 'md' }}>Register</Button>
    </Link>
)

const LoginButton = () => (
    <Link href='/auth' style={{ textDecoration: 'none' }}>
        <Button size={{ base: 'sm', lg: 'md' }} >Login</Button>
    </Link>
)

const NavbarAuth = () => {
    return (
        <HStack
            mr={{ base: 0, lg: '20px' }}>
            <LoginButton />
            {/* <Divider orientation='vertical' /> */}
            <RegsiterButton />
        </HStack>
    )
}

export default NavbarAuth