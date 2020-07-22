import * as React from 'react';
import { Image, View, StyleSheet, ImageBackground, Alert, useWindowDimensions} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {SText} from '../components/StyledText';
import i18n from 'i18n-js';


export default function Onboarding({navigation}) {

  const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'stretch',
      paddingHorizontal: 20,
    },
    getStartedContainer: {
      flex: 2,
      position: 'relative',
      top:30,
      justifyContent:'center',
    },
    AppDescription: {
      flex:3,
    },
    Continue: {
      flex:1,
    },
    bg: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    },
    surfaceImage: {
      aspectRatio:1,
      height: useWindowDimensions().height/4,
      paddingRight: 50,
      alignSelf:'flex-start',
      aspectRatio: 1,
      maxHeight: useWindowDimensions().height/3,
      marginLeft: -30,
    }
  });
  

  const onSubmit = () => {
    Alert.alert(
      "",
      (i18n.t('onboardingAlert')).toString(),
      [
        { text: i18n.t('OK'), onPress: () => navigation.navigate("Sign Up!") }
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground source={require('../assets/images/Background.png')} style={styles.bg}>
    <View style={styles.container}>
        <View style={styles.getStartedContainer}>
          <Text style={{fontSize:48}}>{i18n.t('onboardingHeading')}</Text>
        </View>
        <View style={styles.AppDescription}>
          <Text style={{fontSize:20}}>{i18n.t('onboardingBody')}</Text>
        </View>
        <View style={styles.Continue}> 
          <Button onPress={() => onSubmit()} mode='contained'>{i18n.t('onboardingBtn')}</Button>
        </View>
    </View>
    </ImageBackground>
  );
}

Onboarding.navigationOptions = {
  header: null,
};

