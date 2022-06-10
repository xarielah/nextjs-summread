import {
    Alert,
    AlertIcon
} from '@chakra-ui/react'

const DisplayAlert = ({ type, children }) => (
    <Alert borderRadius={'md'} status={type}>
        <AlertIcon />
        {children}
    </Alert>
)

export default DisplayAlert