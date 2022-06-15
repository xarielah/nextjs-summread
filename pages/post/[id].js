import axios from 'axios'
import FourOFour from "../../pages/404"
import {
    Heading,
    Divider,
    Text,
    Button,
    Box,
    Flex,
    Container,
    Badge,
    Link,
} from '@chakra-ui/react'
import Layout from '../../components/layout/resultsLayout'
import Head from 'next/head'

export async function getServerSideProps(context) {
    const { id } = context.query

    const data = await axios.get(`http://localhost:3000/api/actions/get?id=${id}`).catch(e => console.log(e))
    const post = data ? data.data.post : null

    return {
        props: { post }
    }
}

const Post = ({ post }) => {
    if (!post) return <FourOFour />
    const postDate = new Date(post.createdAt)
    const dateSeparator = '/'
    const createdAt = `${postDate.getUTCDate() > 9 ? postDate.getUTCDate() : '0' + postDate.getUTCDate()}${dateSeparator}${(postDate.getUTCMonth() + 1) > 9 ? postDate.getUTCMonth() + 1 : '0' + (postDate.getUTCMonth() + 1)}${dateSeparator}${postDate.getUTCFullYear()}`
    console.log(post.isLocked)
    return (
        <>
            <Head>
                <title>{post.topicID} || {post.title}</title>
            </Head>
            <Layout>
                <Box align="center" mb={8}>
                    <Box bgColor="gray.200" px={{ base: 5, md: 8 }} pt={5} pb={8} width={'max-content'}>
                        <Heading size="3xl" fontStyle={'italic'} >{post.topicID}</Heading>
                    </Box>
                </Box>
                <Box>
                    <Heading as="h1" size="xl">{post.title}</Heading>
                    <Text as="sub">Posted by: {post.authorName} {`\/\/`} {createdAt}</Text>
                    <Divider my={2} />
                </Box>
                <Box p={2}>
                    <Heading as="h4" size="sm">Description:</Heading>
                    <Text ml={4}>{post.description}</Text>
                </Box>
                <Divider my={2} />
                <Box align="center" mt={3}>
                    <Link href={post.fileUrl} style={{ textDecoration: 'none' }} ><Button colorScheme={'linkedin'}>Download Summary</Button></Link>
                </Box>
            </Layout>
        </>
    )
}

export default Post