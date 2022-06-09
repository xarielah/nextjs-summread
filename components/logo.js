import {
    Heading,
    Link
} from '@chakra-ui/react'


const Logo = () => (
    <Link href="/" style={{ textDecoration: 'none' }} ml={5}>
        <Heading size="md" color={'dimmedGray'} fontStyle={'italic'}>For Students, By Students</Heading>
    </Link>
)

export default Logo