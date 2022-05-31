import {
  Container,
  Box,
  Heading,
  Text,
  Image
} from "@chakra-ui/react"
import logo from '../public/images/book-logo.png'
import SearchInput from "../components/searchbar"

const Website = () => {
  return (
    <Container maxW={'100ch'}>
      <Box
        display={{ md: 'flex' }}
        justify="center"
        align="center">
        <Box flexGrow={1} mt={3}>
          <Image src={logo.src} maxW="400px" alt="logo" />
          <Heading as="h2">
            Search for Academic Summaries
          </Heading>
          <Text color={'dimmedGray'} fontSize=".95rem" as="sub" fontStyle={'italic'}>In search of achieving knowlage faster &amp; better.</Text>
          <Box mt={8}>
            <SearchInput />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Website