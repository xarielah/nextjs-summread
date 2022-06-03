import {
    Container,
    Box,
    Text,
    Stack,
    Heading,
    Link,
    HStack,
    IconButton,
    Button
} from '@chakra-ui/react'
import { useState } from 'react'
import NoResultsFound from '../noresults'
import {
    ChevronLeftIcon,
    ChevronRightIcon
} from '@chakra-ui/icons'

const Pagination = ({ count, currentPage, q, nextPage, prevPage }) => {
    // TODO: Fixated max pages to display
    // Meaning if there are more than 6 pages, display 6
    // When 6 is reachd display relativly more - max 6 button at a time
    const pages = count >= 60 ? [...Array(Math.ceil((count / 10))).keys()] : [...Array(Math.ceil((count / 10))).keys()]

    return (
        <HStack
            mt={8}
            justify="center">
            <IconButton
                onClick={prevPage}
                icon={<ChevronLeftIcon />} />
            {pages.map((page, index) => {
                return (
                    <Box key={index}>
                        <Link href={`/search?q=${q}&page=${page + 1}`}>
                            <Button bg={page + 1 == currentPage && 'gray.200'}>{page + 1}</Button>
                        </Link>
                    </Box>
                )
            })}
            <IconButton
                onClick={nextPage}
                icon={<ChevronRightIcon />} />
        </HStack>
    )
}

const ViewResults = ({ data, page }) => {
    const [currentPage, setCurrentPage] = useState(isNaN(page) ? 1 : page)
    const nextPage = () => setCurrentPage(currentPage + 1)
    const prevPage = () => currentPage !== 0 && setCurrentPage(currentPage - 1)

    if (data.count === 0 || data.searchTerm === '') return <NoResultsFound />
    else {
        return (
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
                                    <Text mt={1} as="p">{item.description}</Text>
                                </Container>
                            )
                        })}
                    </Stack>
                </Box>
                <Pagination
                    q={data.searchTerm}
                    count={data.count}
                    currentPage={currentPage}
                    nextPage={nextPage}
                    prevPage={prevPage} />
            </Box >
        )
    }
}

export default ViewResults