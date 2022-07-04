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
    Flex,

} from '@chakra-ui/react'
import BadFileType from '../../components/alert/pop'
import Head from 'next/head'
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import Wrongway from '../../components/error/wrongway'
import LoadingComponent from '../../components/loading.js'
import axios from 'axios'
import { useState } from 'react'
import FormData from 'form-data'
import SuccessPost from '../../components/success'
import AnimationLayout from '../../components/layout/animationLayout'


const NewSummaryForm = ({ user, successPost, setSuccess: setSuccessPost }) => {
    const [docFile, setDocFile] = useState(null)
    const [fileError, setFileError] = useState(false)
    const [postData, setPostData] = useState({})

    const allowedFileTypes = [
        'pptx',
        'docx',
        'xls',
        'xlsx',
        'doc',
        'pdf'
    ]

    const isBadFile = (ex) => !allowedFileTypes.includes(ex)

    const setFileState = (file) => {
        const fileExtension = file?.name?.split('.').pop()

        if (isBadFile(fileExtension)) {
            setDocFile(null)
            setFileError((prev) => !prev)

        } else setDocFile(file)
    }

    const closeModal = () => setFileError(false)

    const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            topic: 'Other',
            isLocked: true,
            file: ''
        }
    })

    const onSubmit = async (data) => {
        if (docFile === null) return setFileError(true)

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
            .then(res => {
                setSuccessPost(true)
                setPostData(res.data)
            })
    }
    if (successPost) return <SuccessPost data={postData} successPost={successPost} />
    return (
        <>
            {fileError && <BadFileType close={closeModal} message={'File format is not allowed, please add a different file that is allowed.'} />}

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    p={{ base: 0, lg: 5 }}
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
                                rules={{ minLength: 20, maxLength: 100, required: true }}
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
                                                        <option value="Other">Other</option>
                                                        <option value="Psychology">Psychology</option>
                                                        <option value="Criminology">Criminology</option>
                                                        <option value="Computer &amp; Tech">Computer &amp; Tech</option>
                                                        <option value="Anthropology">Anthropology</option>
                                                        <option value="Communications">Communications</option>
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
                                rules={{ minLength: 100, maxLength: 600, required: true }}
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

                            <Input onChange={(e) => setFileState(e.target.files[0])} type="file" bg="white" mt={1} p={1} />

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
        </>
    )
}

const AddNewSummary = () => {
    const [successPost, setSuccessPost] = useState(false)
    const { data: session, status } = useSession()
    if (status === 'loading') return <LoadingComponent />
    if (!session) return <Wrongway />

    const setSuccess = () => setSuccessPost(true)

    return (
        <AnimationLayout>
            <Head>
                <title>Post a new summary</title>
            </Head>
            <Container
                maxW={'container.lg'}
                mt={8}>
                <Box
                    p={3}>

                    <NewSummaryForm user={session.user} successPost={successPost} setSuccess={setSuccess} />

                </Box>
            </Container>
        </AnimationLayout>
    )
}

export default AddNewSummary