import * as React from 'react';
import { Dimensions, View, StyleSheet, ImageBackground, Alert, DevSettings} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {SText} from '../components/StyledText';
import i18n from 'i18n-js';


export default function langScreen({navigation}) {

  const change_lang = (lang) => {
    i18n.locale = lang;
    navigation.navigate("Onboarding");
  }

  return (
    <ImageBackground source={require('../assets/images/Background.png')} style={styles.bg}>
    <View style={styles.container}>
        <View style={styles.Continue}>
          <Text style={{fontSize:20}}>Choose your language/अपनी भाषा चुनिए:</Text>
        </View>
        <View style={styles.Continue}> 
          <Button onPress={() => change_lang('en')} mode='contained'>English</Button>
        </View>
        <View style={styles.Continue}> 
          <Button onPress={() => change_lang('hi')} mode='contained'>हिन्दी</Button>
        </View>
    </View>
    </ImageBackground>
  );
}

langScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 20,
  },
  Continue: {
      marginVertical: 10,
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  }
});
