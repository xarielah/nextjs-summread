import { Container, Box } from '@chakra-ui/react'

const AuthLayout = ({ children }) => {
    return (
        <Container mt={10}>
            <Box
                p={8}
                boxShadow='xl'
                borderRadius='md'>
                {children}
            </Box>
        </Container>
    )
}

export default AuthLayout