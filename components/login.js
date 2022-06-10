import {
    FormLabel,
    Box,
    Text,
    Button,
    Input,
    InputGroup,
    Stack,
    InputRightElement
} from "@chakra-ui/react"
import { EmailIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { useForm, Controller } from "react-hook-form"
import { useState } from 'react'
import axios from "axios"
import DisplayAlert from "./alert/alert"

const handleLogin = async (data, successfulLogin, badLogin) => {
    try {
        await axios.post('/api/auth/login', data)
        successfulLogin()
    } catch (error) {
        badLogin()
    }
}

const LoginPage = () => {
    const [success, setSuccess] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const { handleSubmit, control, reset, formState: { errors, isValid, isSubmitting } } = useForm({
        mode: 'all',
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const swap = () => setShowPass(prev => !prev)
    const successfulLogin = () => {
        setLoginError(false)
        setSuccess(true)
        reset()
        window.location = '/'
    }

    const badLogin = () => {
        setSuccess(false)
        setLoginError(true)
        reset()
    }

    const onSubmit = async data => await handleLogin(data, successfulLogin, badLogin)

    const rules = {
        required: true
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                {loginError && <DisplayAlert type={'error'}>
                    Bad credentials / Email doesn&apos;t exist...
                </DisplayAlert>}
                {success && <DisplayAlert type={'success'}>
                    Logged In! You&apos;re being redirected...
                </DisplayAlert>}
                <Box>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Controller
                        name="email"
                        rules={{
                            required: true,
                            pattern: emailRegex
                        }}
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Input isInvalid={errors.email} id="email" {...field} />
                                <InputRightElement>
                                    <EmailIcon />
                                </InputRightElement>
                            </InputGroup>
                        )}
                    />
                    {errors.email && <Text as="sub" color={'red'}>Email is missing / wrong format</Text>}
                </Box>

                <Box>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Controller
                        name="password"
                        rules={rules}
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Input isInvalid={errors.password} id="password" type={showPass ? 'text' : 'password'} {...field} />
                                <InputRightElement>
                                    {showPass ? <UnlockIcon onClick={swap} /> : <LockIcon onClick={swap} />}
                                </InputRightElement>
                            </InputGroup>
                        )}
                    />
                    {errors.password && <Text as="sub" color={'red'}>Password is required</Text>}
                </Box>
            </Stack>
            <Button mt={5} w="100%" type="submit" isLoading={isSubmitting} isDisabled={!isValid} colorScheme={'purple'}>Submit</Button>
        </form>
    )
}

export default LoginPage