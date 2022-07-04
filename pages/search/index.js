import Layout from '../../components/layout/resultsLayout'
import ViewResults from '../../components/searchpage/results'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
    Box,
} from '@chakra-ui/react'

export async function getServerSideProps(context) {
    const { q, page } = context.query
    const setPage = !page || isNaN(page) ? 1 : page
    console.log(setPage)
    const res = await fetch(`http://localhost:3000/api/search/get?q=${q}&page=${!page || !isNaN(page) ? parseInt(setPage) : 1}`)
    const data = await res.json()

    return {
        props: {
            data,
            page: setPage
        }
    }
}


const Search = ({ data, page }) => {
    let { query: { q } } = useRouter()
    const query = q && q.trim()

    return (
        <Layout query={query}>
            <Box>
                <ViewResults page={page} data={data} />
            </Box>
        </Layout>
    )
}

export default Search