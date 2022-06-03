import ConnectDB from "../../../utils/connect"
import Summary from "../../../models/summarySchema"

export default async function createNewSumm(req, res) {
    const { title, description, isLocked, authorName, authorID, topic } = req.body
    const method = req.method

    switch (method) {
        case "POST":
            try {
                await ConnectDB()
                    .then(() => console.log('Connected to db!'))
                    .catch(e => console.log(e))

                const newSummary = await Summary.create({
                    title,
                    description,
                    isLocked,
                    topic,
                    authorName,
                    authorID
                })
                return res.status(200).json({ newSummary })
            } catch (error) {
                return res.status(error.status).json({ error })
            }
        default:
            return res.status(405).end('Method is not allowed')
    }

}