import axios from 'axios';
import { useSession } from 'next-auth/react';
import LoadingComponent from '../../../components/loading';
import WrongWay from '../../../components/error/wrongway';
import NextLink from 'next/link';
import { Box, Container, Button, HStack, Textarea, Select, Link, Input, Switch, FormLabel } from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import categories from '../../../utils/cats';
import Alert from '../../../components/alert/alert';
import ErrorNotFound from '../../404';
import AnimationLayout from '../../../components/layout/animationLayout';

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const url = process.env.PROD ? process.env.PROD : process.env.LOCAL;
  const post = await axios
    .get(`${url}/api/actions/get?id=${id}`)
    .then(res => res.data.post)
    .catch(e => {
      console.log(e);
      return null;
    });

  return {
    props: { post },
  };
}

const EditPost = ({ post }) => {
  const { data: session, status } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: post ? post.title : '',
      description: post ? post.description : '',
      isLocked: post ? post.isLocked : null,
      topicID: post ? post.topicID : '',
    },
  });

  if (!post) return <ErrorNotFound />;
  if (status === 'loading') return <LoadingComponent />;
  if (post.authorID !== session?.user?.email) return <WrongWay />;

  const onSubmit = async data => {
    // TODO: Add 'lastUpdated'
    try {
      const url = process.env.PROD ? process.env.PROD : process.env.LOCAL;
      await axios.post(`${url}/api/actions/edit`, { ...data, id: post._id }).then(res => console.log(res));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimationLayout>
      <Box align="left">
        <Container maxW={'container.md'}>
          <Alert type={'info'}>
            You&apos;re now editing post &apos;{post.title}&apos; (ID: {post._id}).
          </Alert>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel fontWeight={'bold'} color="purple.900" fontSize="1.25rem" mt={5} htmlFor="title">
              Title
            </FormLabel>
            <Controller control={control} name="title" render={({ field }) => <Input id="title" {...field} />} />
            <FormLabel mt={5} fontWeight={'bold'} color="purple.900" fontSize="1.25rem" htmlFor="desc">
              Desc
            </FormLabel>
            <Controller control={control} name="description" render={({ field }) => <Textarea id="desc" {...field} />} />
            <FormLabel fontWeight={'bold'} color="purple.900" fontSize="1.25rem" mt={5} htmlFor="topicID">
              Topic
            </FormLabel>
            <Controller
              control={control}
              name="topicID"
              render={({ field }) => (
                <Select id="topicID" {...field}>
                  {categories.map((cat, index) => (
                    <option value={cat} key={index}>
                      {cat}
                    </option>
                  ))}
                </Select>
              )}
            />
            <FormLabel mt={5} fontWeight={'bold'} color="purple.900" fontSize="1.25rem" htmlFor="isLocked">
              Privacy
            </FormLabel>
            <Controller
              control={control}
              name="isLocked"
              render={({ field }) => (
                <HStack align={'center'} justify="space-between">
                  <FormLabel htmlFor="isLocked">Lock the post &amp; hide from the public</FormLabel>
                  <Switch id="isLocked" colorScheme={'purple'} size="lg" defaultChecked={post.isLocked} {...field} />
                </HStack>
              )}
            />
            <Box align="center" mt={5}>
              <NextLink href={`/post/${post._id}`}>
                <Link mx={3} color={'purple.600'}>
                  Go To Post
                </Link>
              </NextLink>
              <Button mx={3} type={'submit'} isLoading={isSubmitting} colorScheme="purple" size="sm">
                Save Changes
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </AnimationLayout>
  );
};

export default EditPost;
