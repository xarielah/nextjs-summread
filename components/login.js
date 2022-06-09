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

const LoginPage = () => {
    const [showPass, setShowPass] = useState(false)
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = data => console.log(data)

    const swap = () => setShowPass(prev => !prev)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <Box>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Input id="username" {...field} />
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
                        name="password"
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
            </Stack>
            <Button mt={5} w="100%" type="submit" colorScheme={'purple'}>Submit</Button>
        </form>
    )
}

export default LoginPage