import { Post } from '@app/types/domains';
import axiosInstance from '@app/api/axios';

async function createPost(body: Omit<Post, 'id'>): Promise<Post> {
  const { data } = await axiosInstance.post('/posts', body);

  return data;
}

export { createPost };
