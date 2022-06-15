import {
    Heading,
    Link
} from '@chakra-ui/react'


const Logo = () => (
    <Link href="/" style={{ textDecoration: 'none' }} ml={5}>
        <Heading size="md" color={'dimmedGray'} fontStyle={'italic'}>Summaread</Heading>
    </Link>
)

export default Logo