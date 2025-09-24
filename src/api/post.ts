import { Post } from '@app/types/domains';
import axiosInstance from '@app/api/axios';

async function createPost(body: Omit<Post, 'id'>): Promise<Post> {
  const { data } = await axiosInstance.post('/posts', body);

  return data;
}

async function getPost(id: number): Promise<Post> {
  const { data } = await axiosInstance.get(`/posts/${id}`);

  return data;
}

export { createPost, getPost };
