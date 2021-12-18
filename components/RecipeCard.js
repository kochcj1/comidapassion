import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import uploadRecipe from '../awsS3Utilities/uploadRecipe';

export default function RecipeCard({ recipe, onRecipeSelection }) {
  let imgSrc;
  const hasImageData = "imageBase64" in recipe;
  if (hasImageData) {
    imgSrc = "data:image/jpg;base64," + recipe.imageBase64;
  }
  else {
    imgSrc = require('../assets/edit-image.png');
  }

  let cardCover;
  const [imageSource, setImageSource] = useState(imgSrc);
  if (hasImageData) {
    cardCover = (
      <Card.Cover source={{uri: imageSource}} />
    );
  }
  else {
    cardCover = (
      <Card.Cover source={imageSource} />
    );
  }

  const showAlert = () =>
    Alert.alert(
      "Select a Photo For This Recipe",
      "",
      [
        {
          text: "Take Photo...",
          onPress: async () => {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
            if (permissionResult.granted === false) {
              alert("This app doesn't have permission to access your camera.");
              return;
            }
            
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.25,
              base64: true
            });
        
            if (!result.cancelled) {
              recipe["imageBase64"] = result.base64;
              uploadRecipe(recipe);
              setImageSource("data:image/jpg;base64," + result.base64);
            }
          }
        },
        {
          text: "Choose from Library...",
          onPress: async () => {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
              alert("This app doesn't have permission to access your Photo Library.");
              return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.25,
              base64: true
            });
        
            if (!result.cancelled) {
              recipe["imageBase64"] = result.base64;
              //delete recipe.imageBase64;
              uploadRecipe(recipe);
              setImageSource("data:image/jpg;base64," + result.base64);
            }
          }
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );

  return (
    <Card>
      <TouchableOpacity onPress={showAlert}>
        {cardCover}
      </TouchableOpacity>
      <Card.Content>
        <View style={styles.foodText}>
          <Text style={styles.label}>Food:</Text>
          <Text style={styles.text}> {recipe.name}</Text>
        </View>
        <View style={styles.countryText}>
          <Text style={styles.label}>Origin:</Text>
          <Text style={styles.text}> {recipe.origin} </Text>
          <Image source={getCountryIcon(recipe.origin)} />
        </View>
        <Button style={styles.moreButton} color="blue" onPress={onRecipeSelection}>Open recipe</Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  foodText: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: 20,
    marginBottom: 5,
    fontSize: 12
  },
  countryText: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 10
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18
  },
  text: {
    fontSize: 18
  },
  moreButton: {
    color: 'blue'
  }
});

// TODO: remember to add icons8 licensing information if and when this app is
// actually released.
const getCountryIcon = (countryName) => {
  switch(countryName) {
    case "Bangladesh":
      return require("../assets/countryIcons/icons8-bangladesh-24.png");
    case "Bolivia":
      return require("../assets/countryIcons/icons8-bolivia-24.png");
    case "Brazil":
      return require("../assets/countryIcons/icons8-brazil-24.png");
    case "Burkina Faso":
      return require("../assets/countryIcons/icons8-burkina-faso-24.png");
    case "Colombia":
      return require("../assets/countryIcons/icons8-colombia-24.png");
    case "Dominican Republic":
      return require("../assets/countryIcons/icons8-dominican-republic-24.png");
    case "Ecuador":
      return require("../assets/countryIcons/icons8-ecuador-24.png");
    case "El Salvador":
      return require("../assets/countryIcons/icons8-el-salvador-24.png");
    case "Ethiopia":
      return require("../assets/countryIcons/icons8-ethiopia-24.png");
    case "Ghana":
      return require("../assets/countryIcons/icons8-ghana-24.png");
    case "Guatemala":
      return require("../assets/countryIcons/icons8-guatemala-24.png");
    case "Haiti":
      return require("../assets/countryIcons/icons8-haiti-24.png");
    case "Honduras":
      return require("../assets/countryIcons/icons8-honduras-24.png");
    case "Indonesia":
      return require("../assets/countryIcons/icons8-indonesia-24.png");
    case "Kenya":
      return require("../assets/countryIcons/icons8-kenya-24.png");
    case "Mexico":
      return require("../assets/countryIcons/icons8-mexico-24.png");
    case "Nicaragua":
      return require("../assets/countryIcons/nicaragua-24.png");
    case "Peru":
      return require("../assets/countryIcons/icons8-peru-24.png");
    case "Philippines":
      return require("../assets/countryIcons/icons8-philippines-24.png");
    case "Rwanda":
      return require("../assets/countryIcons/rwanda-24.png");
    case "Sri Lanka":
      return require("../assets/countryIcons/icons8-sri-lanka-24.png");
    case "Tanzania":
      return require("../assets/countryIcons/icons8-tanzania-24.png");
    case "Thailand":
      return require("../assets/countryIcons/icons8-thailand-24.png");
    case "Togo":
      return require("../assets/countryIcons/icons8-togo-24.png");
    case "Uganda":
      return require("../assets/countryIcons/icons8-uganda-24.png");
  }
};