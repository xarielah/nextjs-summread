import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
} from '@chakra-ui/react'

const PopUpError = ({ close, message }) => (
    <AlertDialog isOpen>
        <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Whoops seems like something is wrong...
                </AlertDialogHeader>

                <AlertDialogBody>
                    {message}
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button colorScheme={'purple'} align="center" onClick={close}>
                        Got it!
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
)

export default PopUpError