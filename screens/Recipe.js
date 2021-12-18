import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

function LoadingIndicatorView() {
    return <ActivityIndicator style={styles.loadingIndicator} color="#275cb2" size='large' />
}

export default function Recipe({ navigation }) {
    return (
        <WebView
            source={{ uri: navigation.getParam("recipeURL") }}
            renderLoading={LoadingIndicatorView}
            startInLoadingState={true}
        />
    );
}

const styles = StyleSheet.create({
    loadingIndicator: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    }
  });