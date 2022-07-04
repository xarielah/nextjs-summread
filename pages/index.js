import {
  Container,
  Box,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react"
import logo from '../public/images/book-logo.png'
import SearchInput from "../components/searchbar"
import AnimationLayout from "../components/layout/animationLayout"

const Website = () => {
  return (
    <AnimationLayout>
      <Container maxW={'100ch'}>
        <Box
          display={{ md: 'flex' }}
          justify="center"
          align="center">
          <Box flexGrow={1} mt={3}>
            <Image src={logo.src} maxW="30%" alt="logo" />
            <Heading as="h2">
              Summread
            </Heading>
            <Text color={'blackAlpha.500'} fontSize=".95rem" as="sub" fontStyle={'italic'}>In search of achieving knowlage faster &amp; better.</Text>
            <Box mt={8}>
              <SearchInput />
            </Box>
          </Box>
        </Box>
      </Container>
    </AnimationLayout>
  )
}

export default Website