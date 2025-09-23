import { createStackNavigator } from '@react-navigation/stack';
import { AuthHomeScreen } from '@app/screens/auth/AuthHomeScreen';
import LoginScreen from '@app/screens/auth/LoginScreen';
import SignupScreen from '@app/screens/auth/SignupScreen';
import { createStaticNavigation } from '@react-navigation/native';
import { colors } from '@app/constants/colors';

const AuthStack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: 'center',
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: colors.BLACK,
    headerStyle: {
      backgroundColor: colors.WHITE,
      shadowColor: colors.GRAY_500,
    },
    headerTitleStyle: {
      fontSize: 16,
    },
    cardStyle: {
      backgroundColor: 'white',
    },
  },
  screens: {
    AuthHome: {
      screen: AuthHomeScreen,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: LoginScreen,
      options: {
        title: 'Login',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      },
    },
    Signup: {
      screen: SignupScreen,
      options: {
        title: 'Sign up',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      },
    },
  },
});

const AuthNavigation = createStaticNavigation(AuthStack);

export default AuthNavigation;
