import {
    FormLabel,
    Box,
    Text,
    Button,
    Input,
    InputGroup,
    Stack,
    InputRightElement,
    Switch
} from "@chakra-ui/react"
import { EmailIcon, LockIcon, UnlockIcon, InfoIcon } from '@chakra-ui/icons'
import { useForm, Controller } from "react-hook-form"
import { useState } from 'react'
import axios from 'axios'
import DisplayAlert from "./alert/alert"

const handleRegister = async (data, successfulReg, badReg) => {
    try {
        await axios.post('/api/auth/register', data).then(res => res.data)
        successfulReg()
    } catch (error) {
        badReg()
    }
}

const SignupPage = () => {
    const [showPass, setShowPass] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorReg, setErrorReg] = useState(false)
    const { handleSubmit, control, formState: { errors, isValid, isSubmitting }, reset } = useForm({
        mode: 'all',
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            isPrivate: false
        }
    })
    const successfulReg = () => {
        setErrorReg(false)
        setSuccess(true)
        reset()
    }
    const badReg = () => {
        setSuccess(false)
        setErrorReg(true)
        reset('password')
    }
    const onSubmit = async data => await handleRegister(data, successfulReg, badReg)
    const swap = () => setShowPass(prev => !prev)

    const stringRules = {
        required: true,
        pattern: /([A-Za-z0-9@\-._\u0590-\u05fe])\w+/g
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
                {success && <DisplayAlert type={'success'}>
                    Registration completed successfuly, redirecting...
                </DisplayAlert>}
                {errorReg && <DisplayAlert type={'error'}>
                    Error has occured...
                </DisplayAlert>}
                <Box>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Controller
                        name='firstName'
                        rules={{
                            maxLength: 20,
                            ...stringRules
                        }}
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Input isInvalid={errors.firstName} id="firstName" {...field} />
                                <InputRightElement>
                                    <InfoIcon />
                                </InputRightElement>
                            </InputGroup>
                        )}
                    />
                </Box>

                <Box>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Controller
                        name='lastName'
                        rules={{
                            maxLength: 20,
                            ...stringRules
                        }}
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Input
                                    isInvalid={errors.lastName}
                                    id="lastName"
                                    {...field} />
                                <InputRightElement>
                                    <InfoIcon />
                                </InputRightElement>
                            </InputGroup>
                        )}
                    />
                </Box>
                <Box>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Controller
                        name='email'
                        rules={{
                            maxLength: 30,
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
                </Box>
                <Box>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Controller
                        name='password'
                        rules={{
                            minLength: 8,
                            maxLength: 20,
                            ...stringRules
                        }}
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
                </Box>

                <Box>
                    <FormLabel htmlFor="privacy">Privacy</FormLabel>
                    <Controller
                        name='isPrivate'
                        control={control}
                        render={({ field }) => (
                            <InputGroup
                                display={'flex'}
                                justifyContent='space-between'>
                                <Box>
                                    <FormLabel mb={0} htmlFor="privacy">
                                        Set as private
                                    </FormLabel>
                                    <Text as="sub">- Private profile&apos;s data will not be displayed</Text>
                                </Box>
                                <Switch colorScheme={'purple'} id="privacy" {...field} />
                            </InputGroup>
                        )}
                    />
                </Box>
            </Stack>
            <Button type="submit" isDisabled={!isValid} isLoading={isSubmitting} colorScheme={'purple'} w="100%" mt={5}>Register</Button>
        </form>
    )
}

export default SignupPage