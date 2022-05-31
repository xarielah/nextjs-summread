import {
    Container,
    Box
} from '@chakra-ui/react'
import SearchInput from '../searchbar'

const ResultsLayout = ({ children, query }) => {
    return (
        <Container maxW="container.lg" mt={7}>
            <SearchInput value={query} />
            <Box mt={8}>
                {children}
            </Box>
        </Container>
    )
}

export default ResultsLayout