import ConnectDB from '../../../utils/connect';
import Summary from '../../../models/summarySchema';

export default async function getDocument(req, res) {
  const { id, user } = req.query;

  if (user && id) return res.status(405).send('Cannot look for user and ID together');

  try {
    await ConnectDB();
    if (id) {
      const post = await Summary.findById(id);
      res.status(200).json({ post });
    }

    if (user) {
      const posts = await Summary.find({ authorID: user });
      res.status(200).json({ posts });
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
