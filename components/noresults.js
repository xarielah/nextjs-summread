import {
    Container,
    Box,
    Text,
    Stack,
    Heading,
    Link,
    Divider,
    Image,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import NotFoundBunny from '../public/images/not_found_bunny.png'


export default function NoResultsFound() {
    return (
        <Container mt={20} w="100%">
            <Box>
                <Stack direction={{ base: 'column', md: 'row' }} justify={'center'} align="center" h="130px" p={4}>
                    <Image maxW="100px" src={NotFoundBunny.src} alt={'not found logo'} />
                    <Divider orientation='vertical' />
                    <Box>
                        <Heading color="purple.900" size="lg">No Results Found</Heading>
                        <Text as="sub" fontSize=".9rem">
                            You can contribute to this field by yourself!<br />
                            Simply <NextLink href='/actions/addnew'><Link fontWeight={'medium'} color="purple.900">add a new summary</Link></NextLink> and wait for your post to get approved.
                        </Text>
                    </Box>
                </Stack>
            </Box>
        </Container>
    )
}