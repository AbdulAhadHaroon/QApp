import { createStackNavigator , createAppContainer} from 'react-navigation';
import Login from '../screens/fbLogin.js';
import Home from '../screens/home.js';
import companyHome from '../screens/companiesHome.js'
import userHome from '../screens/userHome.js'
import companiesHome from '../screens/companiesHome.js';
import addComp from '../screens/addCompany.js'
import compLocation from '../screens/companyLocation'
import companyLocation from '../screens/companyLocation';

const AppStackNavigator = createStackNavigator({    
    Login : {screen : Login} ,
    Home : {screen : Home},
    companyHome : {screen : companiesHome},
    userHome : {screen : userHome} ,
    addComp : {screen : addComp},
    compLocation : {screen : companyLocation}   
})

const Navigator = createAppContainer(AppStackNavigator);

export default Navigator;

 