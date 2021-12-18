import React from 'react';
import RecipeCard from '../components/RecipeCard';
import { StyleSheet, View, FlatList } from 'react-native';

export default function Recipes({ navigation }) {
    const recipes = navigation.getParam("recipes")
    const openRecipeURL = (recipe) => {
      navigation.navigate("Recipe", {
        recipeName: recipe.name,
        recipeURL: recipe.url
      });
    };
    const renderItem = ({ item }) => {
      return (
        <View>
          <RecipeCard
            recipe={item}
            onRecipeSelection={() => openRecipeURL(item)}
          />
          <View style={styles.verticalSpacer}/>
        </View>
      );
    };

    return (
      <FlatList
        style={styles.scrollView}
        data={recipes}
        renderItem={renderItem}
        keyExtractor={recipe => recipe.origin}
      />
    );
}

const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      paddingVertical: 30,
      paddingHorizontal: 40,
      backgroundColor: 'whitesmoke',
    },
    verticalSpacer: {
      height: 50
    },
  });