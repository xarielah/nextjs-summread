import Summary from '../../../models/summarySchema';

export default async function editPost(req, res) {
  const data = req.body;
  const id = data.id;

  try {
    const resp = await Summary.findByIdAndUpdate(id, { ...data, lastUpdated: new Date(Date.now()) }, { new: true });
  } catch (error) {
    console.log(error);
  }

  res.send('hello world');
}
