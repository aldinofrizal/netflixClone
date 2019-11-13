import React from 'react'
import { StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import movieForm from './screens/movieForm'
import tvForm from './screens/tvForm'

const TabNavigator = createBottomTabNavigator({
  Movie: movieForm,
  TvSerie: tvForm,
}, 
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      if (routeName === 'Movie') {
        iconName = `movie`;
        return <MaterialCommunityIcons name={iconName} size={32} color={tintColor} style={styles.icons}/>
      } else if (routeName === 'TvSerie') {
        iconName = `tv`;
        return <FontAwesome name={iconName} size={32} color={tintColor} style={styles.icons}/>;
      }
    },
  }),
  tabBarOptions: {
    showLabel : false,
    activeTintColor: 'red',
    inactiveTintColor: '#0A3241',
  },
});

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  icons: {
    marginTop : 3
  },
});