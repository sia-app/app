import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Dimensions, Image, Platform, StyleSheet, useWindowDimensions, ImageBackground } from 'react-native';
import {Text, Title, Subheading, Paragraph, Headline, Button} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import * as Notif from "expo-notifications";
import 'react-native-gesture-handler';
import i18n from 'i18n-js';

import { DataContext } from '../hooks/AppContexts'
const {height, width} = Dimensions.get("window");

export default function HomeScreen({navigation}) {

  const [set,sset] = React.useState("");

  
  React.useEffect(()=>{

    const locNotification = async () => {
      const settings = await Notif.getPermissionsAsync();
      sset(settings);
    };
    locNotification();
    console.log(set);
  },[]);
  
  const styles = StyleSheet.create({
    container: {
      minHeight: height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 30,
    },
    para:{
      paddingTop:20,
      fontSize: 20,
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
      maxHeight: height/3,
      marginLeft: -30,
    }
  });

  const {UD, updateStorage} = React.useContext(DataContext);

  
  console.log(UD);
  return (
    <ImageBackground source={require('../assets/images/Background.png')} style={styles.bg}>
    <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/images/Logo.png')} resizeMode={'contain'} style={styles.surfaceImage}></Image>
        <Text style={{ fontSize: 45 }}>{i18n.t('SIA')}</Text>
        <Text style={{fontSize:40,color:'#479564',paddingTop:10,}}>{i18n.t('homeTitle')} {UD.username}!</Text>
        <Headline style={{fontWeight: 'bold'}}>{i18n.t('homeHeading')}</Headline>
        <Paragraph style={styles.para}>{i18n.t('homeBody')}</Paragraph>

    </ScrollView>
    </ImageBackground>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


