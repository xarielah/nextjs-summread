import ConnectDB from "../../../utils/connect"
import Summary from "../../../models/summarySchema"

export default async function createNewSumm(req, res) {
    const { title, description, locked, topic } = req.body
    await ConnectDB()
        .then(() => console.log('Connected to db!'))
        .catch(e => console.log(e))

    const newSummary = await Summary.create({
        title,
        description,
        locked,
        topic
    })

    res.status(200).json({ newSummary })
}