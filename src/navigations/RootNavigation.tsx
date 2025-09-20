import DrawerNavigation from '@app/navigations/DrawerNavigation.tsx';
import AuthNavigation from '@app/navigations/AuthNavigation.tsx';
import { useAuth } from '@app/hooks/useAuth.tsx';

export const RootNavigation = () => {
  const { isLogin } = useAuth();
  return isLogin ? <DrawerNavigation /> : <AuthNavigation />;
};
