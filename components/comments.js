import { Box, Heading, Text, Input, Container, Button, InputGroup, InputRightAddon } from '@chakra-ui/react';
import AnimationLayout from './layout/animationLayout';
import { useState } from 'react';

const CommentBody = ({ comment }) => (
    <AnimationLayout>
        <>test</>
    </AnimationLayout>
);

const CommentsSection = ({ comments }) => {
    const [commentText, setCommentText] = useState('');
    const onSubmit = e => {
        const comment = commentText.trim();
        setCommentText('');
        e.preventDefault();
    };
    return (
        <Container maxW={'container.md'} mt={4}>
            <Heading fontSize='1.25rem' color='purple.700'>
                Comments
            </Heading>
            <Box>
                {comments.length === 0 || !comments ? (
                    <Text my={5} align='center'>
                        Be the first to comment!
                    </Text>
                ) : (
                    comments.map((comment, index) => <CommentBody key={index} comment={comment} />)
                )}
            </Box>
            <Box align='center'>
                <form onSubmit={onSubmit}>
                    <InputGroup>
                        <Input
                            onChange={e => setCommentText(e.target.value)}
                            borderRadius={'full'}
                            placeholder='Write what you think...'
                        />
                        <InputRightAddon p={0} borderTopRightRadius='full' borderBottomRightRadius='full'>
                            <Button
                                type='submit'
                                colorScheme={'purple'}
                                borderTopRightRadius='full'
                                borderBottomRightRadius='full'
                                px={7}
                            >
                                Send
                            </Button>
                        </InputRightAddon>
                    </InputGroup>
                </form>
            </Box>
        </Container>
    );
};

export default CommentsSection;
