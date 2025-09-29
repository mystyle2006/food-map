import {
  appleLogin,
  editProfile,
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
  ResponseToken,
} from '@app/api/auth';
import { queryClient } from '@app/api/query-client';
import { numbers } from '@app/constants/numbers';
import {
  ResponseError,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '@app/types/api/api';
import { Profile } from '@app/types/domains';
import {
  removeEncryptStorage,
  setEncryptStorage,
} from '@app/utils/encrypted-storage';
import { removeHeader, setHeader } from '@app/utils/header';
import { MutationFunction, useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AuthType } from '@app/types/api/auth';
import { queryKeys, storageKeys } from '@app/constants/keys';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useLogin<T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions<AuthType>,
) {
  return useMutation({
    mutationFn: loginAPI,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    ...mutationOptions,
  });
}

function useUpdateProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: (newProfile) => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const { data, isSuccess, isError } = useQuery<AuthType, ResponseError>({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
  });

  useEffect(() => {
    (async () => {
      if (isSuccess && data) {
        setHeader('Authorization', `Bearer ${data.accessToken}`);
        await setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
      }
    })();
  }, [isSuccess, data]);

  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader('Authorization');
        await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      }
    })();
  }, [isError]);

  return { isSuccess, isError };
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<Profile>) {
  return useQuery({
    queryFn: getProfile,
    throwOnError: (error) => Number(error.response?.status) >= 500,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      removeHeader('Authorization');
      await removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
    },
    ...mutationOptions,
  });
}

function useAppleLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(appleLogin, mutationOptions);
}

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

export const useAuth = () => {
  const signupMutation = useSignup();
  const loginMutation = useEmailLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const { data, isSuccess: isLogin } = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const logoutMutation = useLogout();
  const profileMutation = useUpdateProfile();
  const appleLoginMutation = useAppleLogin();

  return {
    auth: {
      id: data?.id || '',
      nickname: data?.nickname || '',
      email: data?.email || '',
      imageUri: data?.imageUri || '',
    },
    signupMutation,
    appleLoginMutation,
    loginMutation,
    logoutMutation,
    isLogin,
    profileMutation,
  };
};
