import { createStackNavigator } from '@react-navigation/stack';
import AuthHomeScreen from '@app/screens/auth/AuthHomeScreen';
import LoginScreen from '@app/screens/auth/LoginScreen';
import SignupScreen from '@app/screens/auth/SignupScreen';
import { createStaticNavigation } from '@react-navigation/native';

const AuthStack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: 'center',
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'gray',
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
        title: 'LOGIN',
      },
    },
    Signup: {
      screen: SignupScreen,
      options: {
        title: 'SIGNUP',
      },
    },
  },
});

const AuthNavigation = createStaticNavigation(AuthStack);

export default AuthNavigation;
