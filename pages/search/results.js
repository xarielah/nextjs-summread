import ResultsLayout from '../../components/layout/resultsLayout'
import {
    Text,
    Heading
} from '@chakra-ui/react'

const ViewResults = ({ query }) => {
    return (
        <ResultsLayout query={query}>
            <Heading
                as="h5"
                size="sm"
                fontWeight="medium">
                Showing results for &apos;{query}&apos;
            </Heading>
        </ResultsLayout>
    )
}

export default ViewResults