import {
    Box,
    Heading,
    Link,
    useColorModeValue
} from '@chakra-ui/react'


const Logo = () => (
    <Box>
        <Link href="/">
            <Heading
                as="h1"
                fontSize={'1.25rem'}
                fontWeight={'bold'}
                color={useColorModeValue('#20202395', '#ccc')}>
                AcademicSummeries
            </Heading>
        </Link>
    </Box>
)

export default Logo