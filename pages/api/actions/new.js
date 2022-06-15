import ConnectDB from "../../../utils/connect"
import Summary from "../../../models/summarySchema"
import AWS from 'aws-sdk'
import formidable from "formidable"
import fs from 'fs'

const s3Client = new AWS.S3({
    endpoint: `https://${process.env.DO_SPACES_URL}`,
    region: 'fra1',
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET
    }
})

export const config = {
    api: {
        bodyParser: false
    }
}

export async function fileHandler(req, res) {
    const form = formidable()
    const now = new Date()
    const fileName = `${now.getTime()}`

    const allowedFileTypes = [
        'pptx',
        'docx',
        'xls',
        'xlsx',
        'doc',
        'pdf'
    ]

    const statusUpload = form.parse(req, async (err, fields, files) => {
        const fileType = files.file?.originalFilename?.split('.').pop()

        console.log(fields)

        if (!files.file) {
            return {
                status: 400,
                message: 'no files'
            }
        }

        if (allowedFileTypes.indexOf(fileType) === -1) {
            console.log('bad file type')
            return {
                status: 405,
                message: 'bad file type'
            }
        }

        try {
            return s3Client.putObject({
                Bucket: process.env.DO_SPACES_BUCKET,
                Key: `${fileName}.${files.file.originalFilename.split('.').pop()}`,
                // Key: files.file.originalFilename,
                Body: fs.createReadStream(files.file.filepath),
                ACL: "public-read"
            }, async () => true)
        } catch (error) {
            console.log(error)
            throw new Error('Error Occured While Uploading File')
        }
    });

    // const newSummary = await Summary.create({
    //     title,
    //     description,
    //     isLocked,
    //     topic,
    //     authorName,
    //     authorID,
    //     fileUrl: `https://${process.env.DO_SPACES_BUCKET}/${process.env.DO_SPACES_URL}`
    // })
    return statusUpload
}

export default async function createNewSumm(req, res) {
    const { method } = req
    // const { title, description, isLocked, authorName, authorID, topic } = req.body

    switch (method) {
        case "POST":
            try {
                await ConnectDB()
                    .then(() => console.log('Connected to db!'))
                    .catch(e => console.log(e))

                const status = await fileHandler(req, res)
                console.dir(status._events.fields)

                return res.status(200).json()
            } catch (error) {
                return res.status(error.status).json({ error })
            }
        default:
            return res.status(405).end('Method is not allowed')
    }
}