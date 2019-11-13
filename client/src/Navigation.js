import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import TabNav from './TabNav'
import Detail from './screens/detail'
import Home from './screens/home'

const RouteConfigs = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            title: 'Home'
        })
    },
    Detail: {
        screen: Detail,
        navigationOptions: ({ navigation }) => ({
            title: 'detail'
        })
    },
    AddForm: {
        screen: TabNav,
        navigationOptions: ({ navigation }) => ({
            title: 'add form'
        })
    }
}

const StackNavigatorConfig = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#379191',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
}

const stackNav = createStackNavigator(RouteConfigs, StackNavigatorConfig);
export default createAppContainer(stackNav)