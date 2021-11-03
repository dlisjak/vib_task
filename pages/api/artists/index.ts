import axiosInstance from '../../../utils/axios';

export const getArtists = async () => {
  try {
    const { data } = await axiosInstance.get(`3cab6663-7cd8-4365-b8a6-4a1d89305f6a`);
    return { status: 'Successful', artists: data.all_artists };
  } catch (err) {
    return { status: 'Error', err: (err.response || {}).data || {} };
  }
};

export default async function handler(req, res) {
  const response = await getArtists();

  return res.status(200).json(response);
}
