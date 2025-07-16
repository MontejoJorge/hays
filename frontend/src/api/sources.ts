import api from '.';

export const getSources = async () => {
  const response = await api.get('/sources');
  return response.data;
};
