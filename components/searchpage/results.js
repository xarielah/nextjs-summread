import {
    Container,
    Box,
    Text,
    Stack,
    Heading,
    Link

} from '@chakra-ui/react'

const NoResultsFound = () => (
    <>
        No Results Found
    </>
)

const ViewResults = ({ data }) => {
    if (data.count === 0 || data.searchTerm === '') return <NoResultsFound />
    else return (
        <Box>
            <Text>Showing {data.count} results for {data.searchTerm}</Text>
            <Box
                p={5}>
                <Stack spacing={9}>
                    {data.results.map((item, index) => {
                        return (
                            <Container maxW={'120ch'} key={index}>
                                <Box>
                                    <Link href={`/post/${item._id}`}>
                                        <Heading mb={0} size="md" color={'blue.600'}>{item.title}</Heading>
                                    </Link>
                                    <Text fontSize={'.9rem'}>Author: <Link href={`/author/${item.authorID}`}>{item.authorName}</Link></Text>
                                </Box>
                                <Text>{item.description}</Text>
                            </Container>
                        )
                    })}
                </Stack>
            </Box>
        </Box >
    )
}

export default ViewResults