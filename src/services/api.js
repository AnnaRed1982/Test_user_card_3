import axios from 'axios';

axios.defaults.baseURL = 'https://6421862f86992901b2b5a3ee.mockapi.io';

export const fetchUsers = async (page = 1) => {
  const response = await axios.get('/tweets', {
    params: {
      page,
      limit: 3,
    },
  });
  return response.data;
};

export const fetchUsersAmount = async page => {
  const response = await axios.get('/tweets');
  return response.data;
};

export const fetchUserVoteUpdate = async (id, vote, followers) => {
  const response = await axios.put(`/tweets/${id}`, { vote, followers });
  return response.data;
};
