import {
    Box,
    Text,
    Heading,
    Image,
    Flex,
    Divider,
    Link,
    Button
} from '@chakra-ui/react'

import NFBunny from './../public/images/locked-bunny.png'

const PostLocked = () => {
    return (
        <Box mt={16}>
            <Flex
                direction={{ base: 'column', lg: 'row' }}
                align="center"
                justify="center">
                <Image src={NFBunny.src} maxW={{ base: '50%', lg: '30%' }} alt="Lost Bunny" />

                <Divider
                    display={{ base: 'block', lg: 'none' }} />

                <Box padding={{ base: '10px', lg: '0' }}>
                    <Heading my={5} fontSize={'3rem'}>
                        Unfortunately this post is locked to the public.
                    </Heading>
                    <Text my={5} fontSize={{ base: '1.3rem', lg: '1.5rem' }}>
                        Post owner locked this post against anonymous users.<br />
                        Please <Link href="/auth" color={'purple.700'} fontStyle="italic" fontWeight="bold">sign-in</Link> to access this summary. Also, more summaries will be available for you if you&apos;re signed in!
                    </Text>
                    <Text>You may also...</Text>
                </Box>

            </Flex>

            <Divider
                mb={'20px'}
                mt={{ base: '20px', lg: '0' }}
                display={{ base: 'none', lg: 'block' }} />

            <Box align="center">
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <Button colorScheme='purple'>Go Back Home!</Button>
                </Link>
            </Box>
        </Box >
    )
}

export default PostLocked