import {
    Heading,
    Link,
    Flex
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { AttachmentIcon } from '@chakra-ui/icons'

const Logo = () => (
    <NextLink href="/">
        <Link style={{ textDecoration: 'none' }} ml={5}>
            <Flex align="center">
                <AttachmentIcon mr={{ base: 0, sm: 1 }} />
                <Heading size="md" display={{ base: 'none', sm: 'inline-flex' }} color={'dimmedGray'} fontStyle={'italic'}>Summread</Heading>
            </Flex>
        </Link>
    </NextLink>
)

export default Logo