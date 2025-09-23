import DrawerNavigation from '@app/navigations/DrawerNavigation';
import AuthNavigation from '@app/navigations/AuthNavigation';
import { useAuth } from '@app/hooks/useAuth';

export const RootNavigation = () => {
  const { isLogin } = useAuth();
  return isLogin ? <DrawerNavigation /> : <AuthNavigation />;
};
