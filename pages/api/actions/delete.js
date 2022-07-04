import Summary from '../../../models/summarySchema';

//  NOTE: This function only delete database's listing
//  Deletion from the bucket wont be implemented since bucket isn't active anymore

export default async function deletePost(req, res) {
  const { id } = req.body;
  try {
    const resp = await Summary.findByIdAndDelete(id);
    return res.status(200).json(resp).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
