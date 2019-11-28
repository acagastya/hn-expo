// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import AskStories from '../screens/AskStories';
import BestStories from '../screens/BestStories';
import NewStories from '../screens/NewStories';
import TopStories from '../screens/TopStories';

const AppContainer = createBottomTabNavigator(
  {
    Top: {
      screen: TopStories,
      navigationOptions: {
        tabBarOptions: {
          activeTintColor: 'rgb(255, 25, 85)'
        },
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-arrow-dropup-circle"
            color={tintColor}
            size={22}
          />
        )
      }
    },
    Best: {
      screen: BestStories,
      navigationOptions: {
        tabBarOptions: {
          activeTintColor: 'rgb(255, 204, 0)'
        },
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-star"
            color={tintColor}
            size={22}
          />
        )
      }
    },
    New: {
      screen: NewStories,
      navigationOptions: {
        tabBarOptions: {
          activeTintColor: 'rgb(88, 86, 214)'
        },
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-hourglass"
            color={tintColor}
            size={22}
          />
        )
      }
    },
    Ask: {
      screen: AskStories,
      navigationOptions: {
        tabBarOptions: {
          activeTintColor: 'rgb(175, 82, 222)'
        },
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name="ios-help-circle-outline"
            color={tintColor}
            size={22}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      inactiveTintColor: 'rgb(142,142,147)',
      activeTintColor: 'rgb(255, 204, 0)'
    }
  }
);
export default AppContainer;
