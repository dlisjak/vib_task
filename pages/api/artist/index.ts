import axiosInstance from '../../../utils/axios';

export const getArtist = async (uuid) => {
  try {
    const { data } = await axiosInstance.get(uuid);
    return { status: 'Successful', artist: data };
  } catch (err) {
    return { status: 'Error', err: (err.response || {}).data || {} };
  }
};

export default async function handler(req, res) {
  const { uuid } = req.query;
  console.log(uuid);
  const response = await getArtist(uuid);

  return res.status(200).json(response);
}
