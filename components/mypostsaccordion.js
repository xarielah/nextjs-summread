import AnimationLayout from './layout/animationLayout';
import { Text, HStack, Link, Box } from '@chakra-ui/react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react';
import ShowActionsBar from './postowneractions';

const AccordionBody = ({ post }) => {
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

const AccordionOfPosts = ({ posts }) => {
  return (
    <Accordion allowToggle allowMultiple>
      {posts.map((post, index) => (
        <AnimationLayout delay={index} key={index}>
          <AccordionBody post={post} />
        </AnimationLayout>
      ))}
    </Accordion>
  );
};

export default AccordionOfPosts;
