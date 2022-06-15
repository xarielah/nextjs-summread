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

import NFBunny from '../../public/images/logged-bunny.png'

const Wrongway = () => {
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
                        It&apos;s the wrong way buddy...
                    </Heading>
                    <Text my={5} fontSize={{ base: '1.3rem', lg: '1.5rem' }}>
                        I think you might be trying to do some shenanigans here<br />
                        And I don&apos;t like it. You better click that button below!
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

export default Wrongway