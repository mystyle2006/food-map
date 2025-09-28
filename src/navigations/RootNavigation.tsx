import DrawerNavigation from '@app/navigations/DrawerNavigation';
import AuthNavigation from '@app/navigations/AuthNavigation';
import { useAuth } from '@app/hooks/useAuth';
import RetryErrorBoundary from '@app/components/RetryErrorBoundary';

export const RootNavigation = () => {
  const { isLogin } = useAuth();
  return (
    <RetryErrorBoundary>
      {isLogin ? <DrawerNavigation /> : <AuthNavigation />}
    </RetryErrorBoundary>
  );
};
