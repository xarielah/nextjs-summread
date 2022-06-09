import { Badge, Box, Text, Heading } from '@chakra-ui/react'
import { } from '@chakra-ui/icons'
import { useState } from 'react'
import SignupPage from '../../components/signup'
import LoginPage from '../../components/login'
import AuthLayout from '../../components/layout/authLayout'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    const { query: { action } } = context
    return {
        props: { action },
    }
}

const Auth = ({ action }) => {
    const initialValue = action === 'register' ? false : true
    const [isLogin, setIsLogin] = useState(initialValue)

    return (
        <Box>
            <AuthLayout>
                {isLogin ? <LoginPage /> : <SignupPage />}
            </AuthLayout>
            <SwapPages isLogin={isLogin} swap={() => setIsLogin(prev => !prev)} />
        </Box>
    )
}

const SwapPages = ({ isLogin, swap }) => (
    < Box align="center" mt={5} >
        {
            isLogin ?
                <Text color={'purple.800'} fontWeight='medium'>
                    Our community is waiting for you!
                    <Badge onClick={swap} ml={'1'}>Signup</Badge>
                </Text >
                :
                <Text color={'purple.800'} fontWeight='medium'>
                    We&apos;d like to see you again!
                    <Badge onClick={swap} ml={'1'}>Login</Badge>
                </Text>
        }
    </Box >
)

export default Auth