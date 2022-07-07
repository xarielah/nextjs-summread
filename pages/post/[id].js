import axios from 'axios';
import FourOFour from '../../pages/404';
import { Heading, Divider, Text, Button, Box, Link } from '@chakra-ui/react';
import Layout from '../../components/layout/resultsLayout';
import Head from 'next/head';
import PostLocked from '../../components/postlocked';
import { useSession } from 'next-auth/react';
import AnimationLayout from '../../components/layout/animationLayout';
import LoadingComponent from '../../components/loading';
import ShowActionsBar from '../../components/postowneractions';
import CommentsSection from '../../components/comments';

export async function getServerSideProps(context) {
  const { id } = context.query;

  const data = await axios.get(`http://localhost:3000/api/actions/get?id=${id}`).catch(e => console.log(e));
  const post = data ? data.data.post : null;

  return {
    props: { post },
  };
}

const Post = ({ post }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <LoadingComponent />;
  if (!post) return <FourOFour />;
  if (post.isLocked && !session) return <PostLocked />;

  const postDate = new Date(post.createdAt);
  const dateSeparator = '/';
  const createdAt = `${postDate.getUTCDate() > 9 ? postDate.getUTCDate() : '0' + postDate.getUTCDate()}${dateSeparator}${
    postDate.getUTCMonth() + 1 > 9 ? postDate.getUTCMonth() + 1 : '0' + (postDate.getUTCMonth() + 1)
  }${dateSeparator}${postDate.getUTCFullYear()}`;

  const postUpdate = new Date(post.lastUpdated);

  const lastUpdated = `${postUpdate.getUTCDate() > 9 ? postUpdate.getUTCDate() : '0' + postUpdate.getUTCDate()}${dateSeparator}${
    postUpdate.getUTCMonth() + 1 > 9 ? postUpdate.getUTCMonth() + 1 : '0' + (postUpdate.getUTCMonth() + 1)
  }${dateSeparator}${postUpdate.getUTCFullYear()}`;

  return (
    <AnimationLayout>
      <Head>
        <title>
          {post.topicID} || {post.title}
        </title>
      </Head>
      <Layout>
        {post.authorID === session?.user?.email && (
          <Box align="right" my={5}>
            <ShowActionsBar post={post} />
          </Box>
        )}
        <Box align="center" mb={8}>
          <Box bgColor="gray.200" px={{ base: 5, md: 8 }} pt={5} pb={8} maxWidth={'max-content'}>
            <Heading size="3xl" fontStyle={'italic'}>
              {post.topicID}
            </Heading>
          </Box>
        </Box>
        <Box>
          <Heading as="h1" size="xl">
            {post.title}
          </Heading>
          <Text fontSize={'.8em'}>
            Posted by: {post.authorName} {`\/\/`} {createdAt}
          </Text>
          {post.lastUpdated && (
            <Text fontStyle={'italic'} color="gray.600" fontSize=".7em">
              Last edited at {lastUpdated}
            </Text>
          )}
          <Divider my={2} />
        </Box>
        <Box p={2}>
          <Heading as="h4" size="sm">
            Description:
          </Heading>
          <Text ml={4}>{post.description}</Text>
        </Box>
        <Divider my={2} />
        <Box align="center" mt={3}>
          <Link href={post.fileUrl} style={{ textDecoration: 'none' }}>
            <Button colorScheme={'linkedin'}>Download Summary</Button>
          </Link>
        </Box>
        <Divider my={2} />
        <CommentsSection comments={post.comments} />
      </Layout>
    </AnimationLayout>
  );
};

export default Post;
