import { useRouter } from "next/router"
import { useState } from 'react'
import React from 'react'
import ViewResults from "./results"
import GetSearchResults from './datareciever'

const SearchResults = () => {
    const [results, setResults] = useState()
    let query = useRouter().query.q
    GetSearchResults().then(res => setResults(res))

    if (results) {
        return (
            <ViewResults query={query} />
        )
    }

}

export default SearchResults