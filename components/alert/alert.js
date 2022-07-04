import { Alert, AlertIcon } from '@chakra-ui/react';

const DisplayAlert = ({ type, children }) => (
  <Alert borderRadius={'md'} my={4} status={type}>
    <AlertIcon />
    {children}
  </Alert>
);

export default DisplayAlert;
