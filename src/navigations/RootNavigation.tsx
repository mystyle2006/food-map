import DrawerNavigation from '@app/navigations/DrawerNavigation.tsx';
import AuthNavigation from '@app/navigations/AuthNavigation.tsx';

export const RootNavigation = () => {
  const isLogin = true;
  return isLogin ? <DrawerNavigation /> : <AuthNavigation />;
};
