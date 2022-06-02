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
    FormControl,
    FormLabel,
    Badge,
    InputRightAddon,
    Select,
    Switch,
    Flex
} from '@chakra-ui/react'
import Head from 'next/head'

// import { } from '@chakra-ui/icons'
import { useForm, Controller } from 'react-hook-form'
const NewSummaryForm = () => {
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            topic: '-1',
            isLocked: true,
            file: ''
        }
    })
    const onSubmit = (data) => console.log(data)
    // console.log(errors)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <Box
                    bg={'gray.300'}
                    pt={8}
                    pb={12}
                    px={8}>
                    <VStack
                        spacing={6}
                        align="stretch">

                        <ThankYou />

                        <Box>
                            <Heading as="h4" fontSize="1.4rem">New Contribution<Badge ml={2}>Posting as &apos;name&apos;</Badge></Heading>
                            <Text mt={1}>Fill out all the fields, make sure to be informative and short as possible.</Text>
                        </Box>

                        <InputGroup flexDirection={'column'}>
                            <FormLabel fontWeight={'bold'} htmlFor='title' fontSize="1.25rem">Title:</FormLabel>
                            <Controller
                                name='title'
                                control={control}
                                rules={{ maxLength: 30, required: true }}
                                render={({ field }) => (
                                    <InputGroup>
                                        <Input id="title" bg="white" {...field} variant={'outline'} placeholder={'Summary title...'} />
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
                            <FormLabel fontWeight={'bold'} htmlFor='description' fontSize="1.25rem">Description:</FormLabel>
                            <Controller
                                name='description'
                                control={control}
                                rules={{ maxLength: 120, required: true }}
                                render={({ field }) => <Textarea
                                    id="description"
                                    width="100%"
                                    bg="white"
                                    rows={5}
                                    placeholder="Keeping your description as short and as informative as possible will let the reader get the most of it at the shortest amount of time :)"
                                    {...field} />}
                            />
                        </InputGroup>

                        <InputGroup flexDirection={'column'}>
                            <Heading fontSize="1.25rem">Upload Files</Heading>
                            <Controller
                                control={control}
                                name="file"
                                render={({ field }) => <Input type="file" bg="white" mt={1} p={1} {...field} />} />
                            <Text as="sub" mt={3}>Allowed formats: *.pptx, *.docx *.xls *.xlsx *.doc *.pdf</Text>
                        </InputGroup>

                        <Divider />

                        <InputGroup flexDirection={'column'}>
                            <Heading mb={1} fontSize="1.25rem" display="block">Privacy Settings<Badge ml={2}>Access &amp; Visibility</Badge></Heading>
                            <Flex
                                flexDirection={'row'}
                                alignItems="center"
                                justifyContent={'space-between'}>
                                <FormLabel htmlFor="isLocked">Lock the post &amp; hide from the public</FormLabel>
                                <Controller
                                    control={control}
                                    name="isLocked"
                                    render={({ field }) => <Switch defaultChecked={false} {...field} id="isLocked" size='md' colorScheme={'purple'} />}
                                />
                            </Flex>
                        </InputGroup>

                        <Button type="submit" colorScheme={'purple'}>Send Post For Review</Button>
                    </VStack>
                </Box>
            </FormControl>
        </form>
    )
}

const ThankYou = () => {
    return (
        <>
            <Box bg={'gray.200'} borderRadius={'xl'} p={8}>
                <Heading as="h4">Thank you!</Heading>
                <Text as="p" mt={2} fontSize={'1.2rem'}>
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
    return (
        <>
            <Head>
                <title>Post a new summary | Thank You!</title>
            </Head>
            <Container
                maxW={'container.md'}
                mt={8}>
                <Box
                    bg={'gray.200'}
                    p={3}>
                    <NewSummaryForm />
                </Box>
            </Container>
        </>
    )
}

export default AddNewSummary