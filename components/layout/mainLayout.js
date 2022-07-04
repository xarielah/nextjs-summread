import Head from 'next/head';
import Navbar from '../navbar';
import AnimationLayout from './animationLayout';
import { Container, Box } from '@chakra-ui/react';

const MainLayout = ({ children }) => (
  <Box as="main" pb={8}>
    <Head>
      <title>Academic Summaries for Free!</title>
      <meta name="description" content="Summaries for all Academic Topics!" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <Navbar />
    <AnimationLayout>
      <Container maxW="1500px">{children}</Container>
    </AnimationLayout>
  </Box>
);

export default MainLayout;
