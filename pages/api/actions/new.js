import ConnectDB from '../../../utils/connect';
import Summary from '../../../models/summarySchema';
import AWS from 'aws-sdk';
import formidable from 'formidable';
import fs from 'fs';

const s3Client = new AWS.S3({
  endpoint: `https://${process.env.DO_SPACES_URL}`,
  region: 'fra1',
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function createNewSumm(req, res) {
  const { method } = req;
  const form = formidable();
  const now = new Date();
  const fileGenericName = `${now.getTime()}`;

  const allowedFileTypes = ['pptx', 'docx', 'xls', 'xlsx', 'doc', 'pdf'];

  switch (method) {
    case 'POST':
      try {
        await ConnectDB()
          .then(() => console.log('Connected to db!'))
          .catch(e => console.log(e));

        form.parse(req, async (err, fields, files) => {
          const fileType = files.file?.originalFilename?.split('.').pop();

          if (!files.file) {
            return res.status(400).json({
              status: 400,
              message: 'no files',
            });
          }

          if (allowedFileTypes.indexOf(fileType) === -1) {
            return res.status(400).json({
              message: 'bad file type',
            });
          }

          const fileName = `${fileGenericName}.${fileType}`;

          try {
            s3Client.putObject(
              {
                Bucket: process.env.DO_SPACES_BUCKET,
                Key: `${fileName}`,
                Body: fs.createReadStream(files.file.filepath),
                ACL: 'public-read',
              },
              async () => true
            );

            const newSummary = await Summary.create({
              ...fields,
              fileUrl: `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_URL}/${fileName}`,
            });

            return res.status(200).json(newSummary);
          } catch (error) {
            console.log(error);
            throw new Error('Error Occured While Uploading File');
          }
        });
        return res.status(200);
      } catch (error) {
        console.log(error);
        return res.status(500).end();
      }
    default:
      return res.status(405).end('Method is not allowed');
  }
}
