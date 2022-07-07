import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import Wrongway from '../../components/error/wrongway';
import LoadingComponent from '../../components/loading';
import axios from 'axios';
import { Avatar, Text, Heading, Box, Container } from '@chakra-ui/react';
import AccordionOfPosts from '../../components/mypostsaccordion';

const MyPosts = () => {
  const fetcher = url => axios.get(url).then(res => res.data.posts);
  const url = process.env.PROD ? process.env.PROD : process.env.LOCAL;

  const { data: session, status } = useSession();
  const { data: posts, error } = useSWR(
    session ? `${url}/api/actions/get?user=${session ? session.user.email : null}` : null,
    fetcher
  );

  if (status === 'loading' || !posts) return <LoadingComponent />;
  if (!session || error) return <Wrongway />;

  return (
    <Container maxW="container.md">
      <Box align="center" mt={10}>
        <Avatar
          w="150px"
          h="150px"
          borderRadius={'full'}
          boxShadow="lg"
          src={session.user.image}
          alt={`${session.user.name}'s avatar`}
        />
        <Box mt={3}>
          <Heading my={3} m={0} color="purple.700" fontSize={'1.75rem'}>
            {session.user.name}
          </Heading>
          <Text>{session.user.email}</Text>
        </Box>
      </Box>
      <Heading my={5} fontWeight={'bold'} fontSize="1.25rem" color="purple.700">
        My Posts ({posts.length})
      </Heading>

      {posts.length > 0 ? (
        <AccordionOfPosts posts={posts} />
      ) : (
        <Heading fontSize={'1.5rem'} align="center">
          No posts
        </Heading>
      )}
    </Container>
  );
};

export default MyPosts;
