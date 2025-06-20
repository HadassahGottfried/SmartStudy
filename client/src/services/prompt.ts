import axiosInstance from './axiosInstance';

export const getCategories = async () => {
  const res = await axiosInstance.get('/categories');
  return res.data;
};

export const getSubCategories = async (categoryId: number) => {
  const res = await axiosInstance.get(`/sub_categories?category_id=${categoryId}`);
  return res.data;
};

export const createPrompt = async (data: {
  prompt: string;
  category_id: number;
  sub_category_id: number;
}) => {
  const res = await axiosInstance.post('/prompts', data);
  return res.data;
};

export const getMyPrompts = async () => {
  const res = await axiosInstance.get('/prompts/my');
  return res.data;
};
export const getPromptsByUserId = async (userId: string) => {
  const res = await axiosInstance.get(`/prompts/user/${userId}`);
  return res.data;
};
