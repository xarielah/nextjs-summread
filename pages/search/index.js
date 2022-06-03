import Layout from '../../components/layout/resultsLayout'
import ViewResults from '../../components/searchpage/results'
import { useRouter } from 'next/router'
import {
    Text,
    Box
} from '@chakra-ui/react'

export async function getServerSideProps(context) {
    const { q } = context.query
    const res = await fetch(`http://localhost:3000/api/search/get?q=${q}`)
    const data = await res.json()

    return {
        props: { data }, // will be passed to the page component as props
    }
}

const Search = ({ data }) => {
    let { query: { q } } = useRouter()
    const query = q && q.trim()

    return (
        <Layout query={query}>
            <Box>
                <ViewResults data={data} />
            </Box>
        </Layout>
    )
}

export default Search