import Summary from '../../../models/summarySchema'
import nextConnect from 'next-connect'
import ConnectDB from '../../../utils/connect'

const app = nextConnect()


export default async function getSearchResults(req, res) {
    let { query: { q, page } } = req
    const limit = 10
    page = page - 1


    try {
        await ConnectDB()
        const results = await Summary.find({ $text: { $search: q.trim() } }).skip(page * limit).limit(limit)
        const count = (await Summary.find({ $text: { $search: q.trim() } })).length

        return res.status(200).json({
            searchTerm: q,
            count: count,
            results
        })

    } catch (error) {
        return res.json({ error })
    }
}

