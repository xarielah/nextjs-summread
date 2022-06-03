import Summary from '../../../models/summarySchema'
import nextConnect from 'next-connect'
import ConnectDB from '../../../utils/connect'

const app = nextConnect()


export default async function getSearchResults(req, res) {
    const { query: { q } } = req

    try {
        await ConnectDB()

        // const results = await Summary.find({ $or: [{ title: { $regex: q } }, { description: { $regex: q } }, { authorName: { $regex: q } }] })
        const results = await Summary.find({ $text: { $search: q.trim() } })

        return res.status(200).json({
            searchTerm: q,
            count: results.length,
            results
        })
    } catch (error) {
        return res.json({ error })
    }
}

