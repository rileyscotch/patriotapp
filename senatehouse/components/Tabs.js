import { createBottomTabNavigator } from 'react-navigation'
import SignIn from   './SignIn'
import SignUp from './SignUp'
import SignOut from './SignOut'

const config = {
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
    // SignOut: { screen: SignOut}
}

export default createBottomTabNavigator(config)