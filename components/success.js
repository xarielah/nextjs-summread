import {
    Box,
    Container,
    Heading,
    Text,
    Link,
    Divider,
    Button,
    VStack
} from '@chakra-ui/react'
import Head from 'next/head'
import AnimationLayout from './layout/animationLayout'

const Success = ({ data: post, successPost }) => {
    const firstName = post.authorName.split(' ')[0]
    return (
        <AnimationLayout>
            <Head>
                <title>Post Successfuly Created! || {post.title}</title>
            </Head>
            <Box>
                {successPost && <ThankYou />}
                <Box my={4}>
                    <Heading mb={2} size="xl" align="center">Your Post Was Created Successfuly!</Heading>
                    <Container maxW='container.sm' fontSize="1.2rem">
                        <Text>{firstName}, Your post &apos;<b>{post.title}</b>&apos; of category &apos;<b>{post.topicID}</b>&apos; has been created successfuly!</Text>
                    </Container>
                </Box>
                <VStack>
                    <Box align="center" mt={10}>
                        <Link href={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
                            <Button colorScheme="green" w="90%">Go To Yout Post</Button>
                        </Link>
                    </Box>
                </VStack>
            </Box>
        </AnimationLayout>
    )
}

const ThankYou = () => {
    return (
        <>
            <Box mb={5} bg={'blackAlpha.100'} borderRadius={'xl'} p={8}>
                <Heading as="h4" color={'purple.700'}>Thank you!</Heading>
                <Text as="p" mt={2} color="purple.900" fontSize={'1.2rem'}>
                    Thank you for contributing to our engine. <br />
                    Our main purpose here is to give back to the Academic Community which are you, The Students,
                    a worthy platform to use in case of need. <br /><br />
                    We cannot thank you enough, <b>Academic Summaries Team</b>.
                </Text>
            </Box>

            <Divider mb={{ base: 3, lg: 0 }} />
        </>
    )
}

export default Success;