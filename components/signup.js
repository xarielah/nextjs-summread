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

const SignupPage = () => {
    const [showPass, setShowPass] = useState(false)
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            isPrivate: false
        }
    })
    const onSubmit = data => console.log(data)
    const swap = () => setShowPass(prev => !prev)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
                <Box>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Controller
                        name='firstName'
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Input id="firstName" {...field} />
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
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Input id="lastName" {...field} />
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
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Input id="email" {...field} />
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
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Input id="password" type={showPass ? 'text' : 'password'} {...field} />
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
                                <FormLabel htmlFor="privacy">Profile is private</FormLabel>
                                <Switch colorScheme={'purple'} id="privacy" {...field} />
                            </InputGroup>
                        )}
                    />
                </Box>
            </Stack>
            <Button type="submit" colorScheme={'purple'} w="100%" mt={5}>Register</Button>
        </form>
    )
}

export default SignupPage