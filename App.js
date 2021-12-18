import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppLoading from 'expo-app-loading'
import RecipesStack from './routes/RecipesStack';
import getRecipes from './awsS3Utilities/getRecipes';

let recipes = [];
async function getRecipesHelper() {
  await getRecipes(recipes);

  // Fetching the recipes can be quick but we want to leave the splash screen
  // up for a bit, so let's pause for a second:
  await new Promise(resolve => setTimeout(resolve, 1000));
};

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  if (appLoaded) {
    return (
      <PaperProvider>
          <RecipesStack recipes={recipes}/>
      </PaperProvider>
    );
  }
  
  return (
    <AppLoading 
      startAsync={getRecipesHelper}
      onFinish={() => setAppLoaded(true)}
      onError={(error) => alert(error)}
    />
  );
}
