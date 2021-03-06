import { Box, Heading, Button } from '@chakra-ui/react'
import Wrongway from '../../components/error/wrongway'
import AuthLayout from '../../components/layout/authLayout'
import { useSession, signIn } from 'next-auth/react'
import { BsGoogle } from 'react-icons/bs'
import LoadingComponent from '../../components/loading'
import AnimationLayout from '../../components/layout/animationLayout'

const Auth = () => {
    const { data: session, status } = useSession()
    if (status === 'loading') return <LoadingComponent />
    if (session) return <Wrongway />



    const providers = [{
        name: 'Google',
        Icon: BsGoogle
    }]

    return (
        <AnimationLayout>
            <Box align="center" mt={8}>
                <AuthLayout>
                    <Heading fontStyle="italic" size="lg" mb={10} color="gray.600">Signin Options</Heading>
                    <Box align="center">
                        {providers.map(({ name, Icon }, index) => <Button key={index} leftIcon={<Icon />} colorScheme={'purple'} w="60%" onClick={() => signIn(name.toLowerCase(), { callbackUrl: '/' })}>Sign in via {name}</Button>)}
                    </Box>
                </AuthLayout >
            </Box >
        </AnimationLayout>
    )
}

export default Auth