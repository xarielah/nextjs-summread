import ConnectDB from "../../../utils/connect"
import Summary from "../../../models/summarySchema"

export default async function getDocument(req, res) {
    const { id } = req.query

    try {
        await ConnectDB()
        const post = await Summary.findById(id)
        res.status(200).json({ post })
    } catch (error) {
        res.status(500).end()
    }
}