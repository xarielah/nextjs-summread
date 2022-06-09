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

import NFBunny from './../public/images/404-bunny.png'

const ErrorNotFound = () => {
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
                        Awww... You Might Be Lost?
                    </Heading>
                    <Text my={5} fontSize={{ base: '1.3rem', lg: '1.5rem' }}>
                        It&apos;s totally okay to feel lost!<br />
                        Not all of us find our path at the same time...
                        But we all do find a way that is for sure!
                    </Text>
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

export default ErrorNotFound