import React from 'react';
import Recipe from '../screens/Recipe';
import Recipes from '../screens/Recipes';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

export default function RecipesStack({ recipes }) {
  const screens = {
    Recipes: {
      screen: Recipes,
      params: { recipes: recipes },
      navigationOptions: {
        headerShown: true,
        headerTitleStyle: {
          color: "white"
        },
        headerStyle: {
          backgroundColor: "#275cb2"
        },
        headerTintColor: "white"
      }
    },
    Recipe: {
      screen: Recipe,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: navigation.getParam("recipeName"),
          headerTitleStyle: {
            color: "white"
          },
          headerStyle: {
            backgroundColor: "#275cb2"
          },
          headerTintColor: "white"
        };
      }
    }
  };
  const AppNavigator = createStackNavigator(screens);
  const AppContainer = createAppContainer(AppNavigator);
  return (
    <AppContainer/>
  );
}