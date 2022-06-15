import {
    Box,
    Flex,
    Text,
    Avatar,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Button,
    Link
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Logo from '../components/logo'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
    const { data: session } = useSession()

    return (
        <Box
            bg="gray.100"
            p="3">
            <Flex justify={'space-between'}>
                <Logo />
                {session ? <LoggedUser user={session.user} /> : <LoginPlease />}
            </Flex>
        </Box>
    )
}

const LoginPlease = () => {
    return (
        <Link href="/auth" mr={5}>
            <Text fontWeight='medium' color="purple.800" textDecoration={'none'}>Login</Text>
        </Link>
    )
}

const LoggedUser = ({ user }) => {
    const firstName = user.name.split(' ')[0]
    return (
        <Menu>
            <MenuButton as={Button}>
                <Box>
                    <Flex justify="center" align="center">
                        <Avatar size={'sm'} mr={2} src={user.avatar} name={`${user.name}'s Avatar!`} />
                        <Text fontWeight={'bold'}>{firstName}</Text>
                        <ChevronDownIcon ml={2} />
                    </Flex>
                </Box>
            </MenuButton>
            <MenuList>
                <MenuItem borderBottom={'1px solid #eee'}>
                    <Flex>
                        <Box>
                            <Avatar size={'md'} mx={2} src={user.avatar} name={`${user.name}'s Avatar!`} />
                        </Box>
                        <Box fontSize=".9rem">
                            <Text>{user.name}</Text>
                            <Text>{user.email}</Text>
                        </Box>
                    </Flex>
                </MenuItem>
                <MenuItem>
                    <Link href="/actions/new">Create New Post</Link>
                </MenuItem>
                <MenuItem><Text onClick={() => signOut({ callbackUrl: '/' })} w="100%" color={'red'} align="center">Logout</Text></MenuItem>
            </MenuList>
        </Menu>
    )
}

export default Navbar