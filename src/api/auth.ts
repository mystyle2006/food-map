import { Profile } from '@app/types/domains';
import { getEncryptStorage } from '@app/utils/encrypted-storage';
import axiosInstance from '@app/api/axios';

type RequestUser = {
  email: string;
  password: string;
};

async function postSignup({ email, password }: RequestUser): Promise<void> {
  await axiosInstance.post('/auth/signup', { email, password });
}

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

async function postLogin({
  email,
  password,
}: RequestUser): Promise<ResponseToken> {
  const { data } = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });

  return data;
}

async function getProfile(): Promise<Profile> {
  const { data } = await axiosInstance.get('/auth/me');

  return data;
}

async function getAccessToken(): Promise<ResponseToken> {
  const refreshToken = await getEncryptStorage('refreshToken');

  const { data } = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
}

async function logout() {
  await axiosInstance.post('/auth/logout');
}

type RequestProfile = Pick<Profile, 'nickname' | 'imageUri'>;

async function editProfile(body: RequestProfile): Promise<Profile> {
  const { data } = await axiosInstance.patch('/auth/me', body);

  return data;
}

export {
  postSignup,
  postLogin,
  getProfile,
  getAccessToken,
  logout,
  editProfile,
};
