import Summary from '../../../models/summarySchema'
import ConnectDB from '../../../utils/connect'

export default async function getSearchResults(req, res) {
    let { query: { q, page } } = req
    const limit = 10
    page = page - 1


    try {
        await ConnectDB().then(() => console.log('DB Connection successful'))
        const results = await Summary.find({ $text: { $search: q.trim() } }).skip(page * limit).limit(limit)
        const count = (await Summary.find({ $text: { $search: q.trim() } })).length

        return res.status(200).json({
            searchTerm: q,
            count: count,
            results
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

