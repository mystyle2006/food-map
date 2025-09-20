import {
  getAccessToken,
  getProfile,
  postLogin,
  postSignup,
} from '@app/api/auth';
import { queryClient } from '@app/api/query-client';
import { numbers } from '@app/constants/numbers';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '@app/types/api/api.ts';
import { Profile } from '@app/types/domains';
import {
  removeEncryptStorage,
  setEncryptStorage,
} from '@app/utils/encrypted-storage';
import { removeHeader, setHeader } from '@app/utils/header';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AuthType } from '@app/types/api/auth.ts';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions<AuthType>) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await setEncryptStorage('refreshToken', refreshToken);
      queryClient.fetchQuery({
        queryKey: ['auth', 'getAccessToken'],
      });
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const { data, isSuccess, isError } = useQuery<AuthType>({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
  });

  useEffect(() => {
    (async () => {
      if (isSuccess && data) {
        setHeader('Authorization', `Bearer ${data.accessToken}`);
        await setEncryptStorage('refreshToken', data.refreshToken);
      }
    })();
  }, [isSuccess, data]);

  useEffect(() => {
    (async () => {
      if (isError) {
        removeHeader('Authorization');
        await removeEncryptStorage('refreshToken');
      }
    })();
  }, [isError]);

  return { isSuccess, isError };
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<Profile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: ['auth', 'getProfile'],
    ...queryOptions,
  });
}

export const useAuth = () => {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const { isSuccess: isLogin } = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });

  return { signupMutation, loginMutation, isLogin };
};
