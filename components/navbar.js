import { Box, Flex, Text, Avatar, Menu, MenuButton, MenuItem, MenuList, Button, Link } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import Logo from '../components/logo';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();
  if (status === 'loading') return '';
  return (
    <Box bg="gray.100" p="3">
      <Flex justify={'space-between'} align="center">
        <Logo />
        {session ? <LoggedUser user={session.user} /> : <LoginPlease />}
      </Flex>
    </Box>
  );
};

const LoginPlease = () => {
  return (
    <NextLink href="/auth">
      <Link mr={5}>
        <Text fontWeight="medium" color="purple.800" textDecoration={'none'}>
          Login
        </Text>
      </Link>
    </NextLink>
  );
};

const LoggedUser = ({ user }) => {
  const firstName = user.name.split(' ')[0];
  return (
    <Menu>
      <MenuButton as={Button}>
        <Box>
          <Flex justify="center" align="center">
            <Avatar size={'sm'} mr={2} src={user.image} />
            <Text fontWeight={'bold'}>{firstName}</Text>
            <ChevronDownIcon ml={2} />
          </Flex>
        </Box>
      </MenuButton>
      <MenuList zIndex={10}>
        <MenuItem borderBottom={'1px solid #eee'}>
          <Flex>
            <Box>
              <Avatar size={'md'} mx={2} src={user.image} alt={`${user.name}'s Avatar!`} />
            </Box>
            <Box fontSize=".9rem">
              <Text>{user.name}</Text>
              <Text>{user.email}</Text>
            </Box>
          </Flex>
        </MenuItem>
        <NextLink href="/myposts">
          <Link style={{ textDecoration: 'none' }}>
            <MenuItem fontStyle="italic" fontWeight={'bold'} color="gray.500" py={3}>
              My Posts
            </MenuItem>
          </Link>
        </NextLink>
        <NextLink href="/post/new">
          <Link style={{ textDecoration: 'none' }}>
            <MenuItem fontStyle="italic" fontWeight={'bold'} color="gray.500" py={3}>
              Create New Post
            </MenuItem>
          </Link>
        </NextLink>
        <MenuItem py={3}>
          <Text onClick={() => signOut({ callbackUrl: '/' })} w="100%" color={'red'} align="center">
            Logout
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Navbar;
