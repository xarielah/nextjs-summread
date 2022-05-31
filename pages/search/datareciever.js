import useSWR from "swr";
import axios from 'axios'

export default async function GetSearchResults(q) {
    const fetcher = (url) => axios.get(url).then(res => res.data)
    const { data } = useSWR('/api/search', fetcher)
    if (data) return data
    else return ({})
}