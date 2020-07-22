import * as React from 'react';
import { useWindowDimensions, StyleSheet,TouchableOpacity,Image, ScrollView} from 'react-native';
import {Surface, Text} from 'react-native-paper';
import 'react-native-gesture-handler';
import i18n from 'i18n-js';


export default function MenuScreen({navigation}) {

  const {height, width} = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      minHeight: useWindowDimensions().height,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      padding: 15,
      backgroundColor: '#FFFFFF',
    },
    getStartedContainer: {
      flex: 1,
    },
    b1: {
      margin: 5,
      alignItems: 'stretch',
      justifyContent: 'center',
      elevation: 4,
      borderRadius:35,
    },
    btn: {
      padding: 10,
      borderRadius:35,
    },
    card: {
      flex: 1,
      margin:10,
      backgroundColor: '#479564',
      elevation: 5,
      borderRadius: 10,
    },
    cover: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: '#479564',
      width: '100%',
  
    },
    contentTitle: {
      color:'#FFF',
    },
    surface:{
      flexDirection: 'row',
      flex:1,
      justifyContent: 'space-between',
      alignItems: "center",
      elevation: 10,
      margin: 10,
      borderRadius: 5,
      backgroundColor: '#479564',
      maxHeight: height/3,
    },
    surfaceTitle: {
      flex: 0.5,
      fontSize: 21,
      borderRadius: 5,
      padding: 10,
      color: '#000',
      paddingLeft: 30,
      fontWeight: 'bold',
    },
    surfaceImage: {
      flex: 0.5,
      paddingRight: 50,
      alignSelf:'center',
      paddingRight: 80,
      aspectRatio: 1,
      maxHeight: height/3,
    },
    
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <TouchableOpacity activeOpacity={0.9}  onPress={() => navigation.navigate("क्या करें क्या न करें")}>
        <Surface style={styles.surface}>
          <Text style={styles.surfaceTitle}>{i18n.t('menu1')}</Text>
          <Image source={require('../assets/images/Do-Dont1.png')} resizeMode={'contain'} style={styles.surfaceImage}></Image>
        </Surface>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.9}  onPress={() => navigation.navigate("सेहत की रक्षा के उपाय")}>
        <Surface style={styles.surface}>
          <Text style={styles.surfaceTitle}>{i18n.t('menu2')}</Text>
          <Image source={require('../assets/images/Immunity.png')} resizeMode={'contain'} style={styles.surfaceImage}></Image>
        </Surface>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.9}  onPress={() => navigation.navigate("निवारक उपाय")}>
        <Surface style={styles.surface}>
          <Text style={styles.surfaceTitle}>{i18n.t('menu3')}</Text>
          <Image source={require('../assets/images/Preventive.png')} resizeMode={'contain'} style={styles.surfaceImage}></Image>
        </Surface>
      </TouchableOpacity>
    </ScrollView>
  );
}

MenuScreen.navigationOptions = {
  header: null,
};


