import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import IMC from '../pages/imcpage/imc'
import Register from '../pages/register/register'
import ResetPassword from '../pages/resetpassword/resetpassword'
import initialPage from '../pages/initialpage/initialpage'
import Login from '../pages/login/login';
import completeRegister from '../pages/register/completeregister'
import UserPage from '../pages/userpage/userpage'



const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <stackRoutes.Screen
            name="Login"
            component={Login}
        />
        <stackRoutes.Screen
            name="Register"
            component={Register}
        />
        <stackRoutes.Screen
            name="ResetPassword"
            component={ResetPassword}
        />
        <stackRoutes.Screen
            name="initialPage"
            component={initialPage}
        />
        <stackRoutes.Screen
            name="IMC"
            component={IMC}
        />
        <stackRoutes.Screen
            name="completeRegister"
            component={completeRegister}
        />
        <stackRoutes.Screen
            name="UserPage"
            component={UserPage}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes;