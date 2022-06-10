import { Button, Link, HStack, Divider } from '@chakra-ui/react'

const RegsiterButton = () => (
    <Link href='/auth?action=register' style={{ textDecoration: 'none' }}>
        <Button size={{ base: 'sm', lg: 'md' }} colorScheme='purple'>Register</Button>
    </Link>
)

const LoginButton = () => (
    <Link href='/auth' style={{ textDecoration: 'none' }}>
        <Button size={{ base: 'sm', lg: 'md' }} colorScheme='linkedin'>Login</Button>
    </Link>
)

const NavbarAuth = () => {
    return (
        <HStack
            mr={{ base: 0, lg: '20px' }}
            spacing={{ base: 3, lg: 5 }}>
            <LoginButton />
            <Divider orientation='vertical' />
            <RegsiterButton />
        </HStack>
    )
}

export default NavbarAuth