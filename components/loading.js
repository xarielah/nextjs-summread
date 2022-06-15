import { Spinner, Box, Heading } from "@chakra-ui/react"

const LoadingComponent = () => {
    return (
        <Box align="center" mt={200}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='purple.900'
                size='xl'
                mb={2}
            />
            <Heading fontStyle={'italic'} size="md" color="purple.800">Loading...</Heading>
        </Box>
    )
}

export default LoadingComponent