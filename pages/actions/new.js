import {
    Box,
    Divider,
    Container,
    Heading,
    Text,
    Input,
    VStack,
    Textarea,
    Button,
    InputGroup,
    FormLabel,
    Badge,
    InputRightAddon,
    Select,
    Switch,
    Flex
} from '@chakra-ui/react'
import Head from 'next/head'
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import Wrongway from '../../components/error/wrongway'
import LoadingComponent from '../../components/loading.js'
import axios from 'axios'
import { useState } from 'react'
import FormData from 'form-data'



const NewSummaryForm = ({ user }) => {
    const [docFile, setDocFile] = useState(null)
    console.log(user)

    const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            topic: '-1',
            isLocked: true,
            file: ''
        }
    })

    // const { field } = useController({ control, name: 'file' })

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('authorName', user.name)
        formData.append('authorID', user.email)
        formData.append('description', data.description)
        formData.append('topicID', data.topic)
        formData.append('isLocked', data.isLocked)
        formData.append('file', docFile)


        await axios.post('/api/actions/new', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .catch(e => console.log(e))
            .then(res => console.log(res))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Box
                p={5}
                pb={9}>
                <VStack
                    spacing={10}
                    align="stretch">
                    <Box>
                        <Heading as="h4" fontSize="1.4rem" color="purple.900">New Contribution<Badge ml={2}>Posting as &apos;{user.name}&apos;</Badge></Heading>
                        <Text mt={1}>Fill out all the fields, make sure to be informative and short as possible.</Text>
                    </Box>

                    <InputGroup flexDirection={'column'}>
                        <FormLabel fontWeight={'bold'} htmlFor='title' color="purple.900" fontSize="1.25rem">Title:</FormLabel>
                        <Controller
                            name='title'
                            control={control}
                            rules={{ maxLength: 30, required: true }}
                            render={({ field }) => (
                                <InputGroup>
                                    <Input id="title" isInvalid={errors.title} bg="white" {...field} variant={'outline'} placeholder={'Summary title...'} />
                                    <InputRightAddon maxW="30%" p={0}>
                                        <Controller
                                            name="topic"
                                            control={control}
                                            render={({ field }) =>
                                                <Select
                                                    border="none"
                                                    {...field}>
                                                    {/* TODO - Create topics data base */}
                                                    <option value="-1">Other</option>
                                                    <option value="0">Psychology</option>
                                                    <option value="2">Criminology</option>
                                                    <option value="3">Computer &amp; Tech</option>
                                                    <option value="4">Anthropology</option>
                                                    <option value="5">Communications</option>
                                                </Select>
                                            } />
                                    </InputRightAddon>
                                </InputGroup>
                            )} />
                    </InputGroup>

                    <InputGroup flexDirection={'column'}>
                        <FormLabel w={'max-content'} fontWeight={'bold'} htmlFor='description' color="purple.900" fontSize="1.25rem">Description:</FormLabel>
                        <Controller
                            name='description'
                            control={control}
                            rules={{ maxLength: 120, required: true }}
                            render={({ field }) => (
                                <Textarea
                                    isInvalid={errors.description}
                                    id="description"
                                    width="100%"
                                    bg="white"
                                    rows={5}
                                    placeholder="Keeping your description as short and as informative as possible will let the reader get the most of it at the shortest amount of time :)"
                                    {...field} />
                            )}
                        />
                    </InputGroup>

                    <InputGroup flexDirection={'column'}>
                        <Heading fontSize="1.25rem" color="purple.900">Upload Files</Heading>

                        <Input onChange={(e) => setDocFile(e.target.files[0])} isInvalid={errors.file || !docFile} type="file" bg="white" mt={1} p={1} />

                        <Text as="sub" mt={3}>Allowed formats: *.pptx, *.docx *.xls *.xlsx *.doc *.pdf</Text>
                    </InputGroup>

                    <Divider />

                    <InputGroup flexDirection={'column'}>
                        <Heading mb={1} color="purple.900" fontSize="1.25rem" display="block">Privacy Settings<Badge ml={2}>Access &amp; Visibility</Badge></Heading>
                        <Flex
                            flexDirection={'row'}
                            alignItems="center"
                            justifyContent={'space-between'}>
                            <FormLabel htmlFor="isLocked">Lock the post &amp; hide from the public</FormLabel>

                            <Controller
                                control={control}
                                name="isLocked"
                                render={({ field }) => <Switch defaultChecked={false} {...field} mr={5} id="isLocked" size='lg' colorScheme={'purple'} />}
                            />

                        </Flex>
                    </InputGroup>

                    <Button type="submit" colorScheme={'purple'} isLoading={isSubmitting}>Send Post For Review</Button>
                </VStack>
            </Box>
        </form>
    )
}

const ThankYou = () => {
    return (
        <>
            <Box mb={5} bg={'blackAlpha.100'} borderRadius={'xl'} p={8}>
                <Heading as="h4" color={'purple.700'}>Thank you!</Heading>
                <Text as="p" mt={2} color="purple.900" fontSize={'1.2rem'}>
                    Thank you for contributing to our engine. <br />
                    Our main purpose here is to give back to the Academic Community which are you, The Students,
                    a worthy platform to use in case of need. <br /><br />
                    We cannot thank you enough, <b>Academic Summaries Team</b>.
                </Text>
            </Box>

            <Divider />
        </>
    )
}

const AddNewSummary = () => {
    const { data: session, status } = useSession()
    if (status === 'loading') return <LoadingComponent />
    if (!session) return <Wrongway />

    return (
        <>
            <Head>
                <title>Post a new summary | Thank You!</title>
            </Head>
            <Container
                maxW={'container.lg'}
                mt={8}>
                <Box
                    p={3}>

                    <ThankYou />
                    <NewSummaryForm user={session.user} />

                </Box>
            </Container>
        </>
    )
}

export default AddNewSummary