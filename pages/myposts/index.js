import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import ErrorNotFound from '../404';
import Wrongway from '../../components/error/wrongway';
import LoadingComponent from '../../components/loading';
import axios from 'axios';
import { Avatar, Text, HStack, Heading, Box, Container, Link, Show } from '@chakra-ui/react';
import { Accordion, AccordionButton, AccordionIcon, AccordionPanel, AccordionItem } from '@chakra-ui/react';
import ShowActionsBar from '../../components/postowneractions';

const AccordionOfPosts = ({ post }) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          {post.title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel bg="whiteAlpha.400">
        <Box>
          <HStack my={2} justify={'space-between'}>
            <Text color="purple.700" fontSize="1.1rem">
              {post.title}
            </Text>
            <ShowActionsBar post={post} />
          </HStack>
          <HStack my={3} justify="space-around">
            <Text>Created At: {post.createdAt}</Text>
            <Text>Topic: {post.topicID}</Text>
          </HStack>
          <HStack my={3} justify="space-around">
            <Text>Last Updated: {post.lastUpdated ? '' : 'Never'}</Text>
            <Text>Locked: {post.isLocked ? 'Yes' : 'No'}</Text>
          </HStack>
          <Text my={3} textAlign={'center'}>
            Direct Link:{' '}
            <Link href={`${window.location.origin}/post/${post._id}`}>
              {window.location.origin}/post/{post._id}
            </Link>{' '}
          </Text>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

const MyPosts = () => {
  const fetcher = url => axios.get(url).then(res => res.data.posts);
  const url = process.env.PROD ? process.env.PROD : process.env.LOCAL;

  const { data: session, status } = useSession();
  const { data: posts, error } = useSWR(`${url}/api/actions/get?user=${session ? session.user.email : null}`, fetcher);

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
        <Heading my={3} color="purple.700" fontSize={'1.75rem'}>
          {session.user.name}
        </Heading>
        <Text>{session.user.email}</Text>
      </Box>

      <Heading my={5} fontWeight={'bold'} fontSize="1.25rem" color="purple.700">
        My Posts ({posts.length})
      </Heading>
      <Accordion allowToggle allowMultiple>
        {posts.map((post, index) => (
          <AccordionOfPosts key={index} post={post} />
        ))}
      </Accordion>
    </Container>
  );
};

export default MyPosts;
