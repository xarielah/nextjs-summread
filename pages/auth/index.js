import { Box, Heading, Button } from '@chakra-ui/react'
import Wrongway from '../../components/error/wrongway'
import AuthLayout from '../../components/layout/authLayout'
import { useSession, signIn } from 'next-auth/react'
import { BsGoogle } from 'react-icons/bs'

export async function getServerSideProps(context) {
    const { query: { action } } = context
    const parameter = action ? action : null

    return {
        props: { parameter }
    }
}

const Auth = () => {
    const { data: session, status } = useSession()
    if (status === 'loading') return <Heading align="center" mt={10}>Loading...</Heading>
    if (session) return <Wrongway />



    const providers = [{
        name: 'Google',
        Icon: BsGoogle
    }]

    return (
        <Box>
            <AuthLayout>
                <Box align="center">
                    {providers.map(({ name, Icon }, index) => <Button key={index} leftIcon={<Icon />} colorScheme={'purple'} w="60%" onClick={() => signIn(name.toLowerCase(), { callbackUrl: '/' })}>Sign in via {name}</Button>)}
                </Box>
            </AuthLayout >
        </Box >
    )
}

export default Auth