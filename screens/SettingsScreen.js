import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {Platform, Modal, StyleSheet, View, KeyboardAvoidingView, ImageBackground, Linking, FlatList, Picker, Keyboard} from 'react-native';
import {Subheading , Switch, Text, TextInput, Button, Menu, Title, Paragraph, RadioButton} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { DataContext, ResetContext } from '../hooks/AppContexts';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, Feather } from '@expo/vector-icons';
import i18n from 'i18n-js';







export default function SettingsScreen() {

  
  const LOCATION_TASK_NAME = "background-location-task";

  const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      padding: 15,
    },
    container1: {
      
    },
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedText: {
      alignSelf: 'flex-start',
      fontSize: 50,
      fontWeight: 'bold',
    },
    time: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 10, 
      marginBottom: 10
    },
    mapStyle: {
      width: '100%',
      height: 200,
    },
    mapStyle1: {
      flex: 1,
    },
    markerFixed: {
      left: "50%",
      marginLeft: -20,
      marginTop: -48,
      position: "absolute",
      top: "50%",
    },
    footer: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      bottom: 0,
      position: "absolute",
      width: "100%",
      paddingHorizontal: 15,
      paddingBottom: 30,
    },
    footer1: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      width: "100%",
      paddingVertical: 30,
    },
    btnMap: {
      paddingHorizontal: 15,
    },
    btnT: {
      fontSize: 18,
    },
    btnTB: {
      fontSize: 20,
      fontWeight: 'bold',
    },  
    bg: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    }
  });
  const [refresh,setRefresh] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { reset_all } = React.useContext(ResetContext);
  const reset1 = () => {
    reset_all();
  }
  const {UD, updateStorage} = React.useContext(DataContext);
  const [username, setUsername] = React.useState(UD.username);
  const [age, setAge] = React.useState(UD.age);
  const [loc, setLoc] = React.useState(UD.loc);
  const [locationOn, setLocationOn] = React.useState(UD.locationOn);
  const [notification, setNotification] = React.useState(UD.notifications);
  const [lang, setLang] = React.useState(UD.lang);

  return (
    <ImageBackground source={require('../assets/images/Background.png')} style={styles.bg}>
      <ScrollView contentContainerStyle={styles.container1}>
        <Modal  
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <MapView initialRegion={{
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }} style={styles.mapStyle1} onRegionChangeComplete={(region) => {
            setLoc({coords:{latitude: region.latitude, longitude: region.longitude}});
          }} showsUserLocation={true}>
        </MapView>
        <View style={styles.markerFixed}><Feather name="map-pin" size={35} color="black" /></View>
        <View style={styles.footer}>
          <Button style={styles.btnMap} mode="contained" onPress={() => {setModalVisible(!modalVisible)}}>{i18n.t('saveBtn')}</Button>
        </View>
      </Modal>
        <KeyboardAvoidingView behavior='height' style={styles.container} enabled={false}>

        <View style={styles.getStartedContainer}>

          <Text style={styles.getStartedText}>{i18n.t('settingTitle')}</Text>
          
        </View>
        
        <View>
          <TextInput style={{marginTop:10}} mode='outlined' label={i18n.t('signUpName')} placeholder="Full Name" value={username} onChangeText={setUsername} />
        </View>
        
        <Title style={{marginTop:10}}>{i18n.t('settingLoc')}</Title>

        <View style={styles.time}>
          <Subheading style={{flex:0.6, fontSize:20}}>{i18n.t('settingLocT')}</Subheading>
          <View style={{flex:0.1}} ></View>
          <Switch style={{transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} value={locationOn} onValueChange={() => setLocationOn(!locationOn)}></Switch>
        </View>
          
        <View style={{marginTop:10}}>
          <Subheading style={{fontSize: 20, fontWeight:'bold'}} >{i18n.t('locBtn')}</Subheading>
          <MapView region={{
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }} style={styles.mapStyle} zoomEnabled={false} scrollEnabled={false}>
            <Marker title='Home' coordinate={{latitude: loc.coords.latitude, longitude: loc.coords.longitude}}></Marker>
          </MapView>
        </View>
        <Button labelStyle={styles.btnT} style={{marginTop:10}} mode='contained' title="Set Current Location as Home" onPress={() => setModalVisible(true)}>{i18n.t('settingBtn1')}</Button>
        <Title style={{marginTop:10, fontSize: 25}}>{i18n.t('settingLang')}</Title>
        <Paragraph style={{paddingTop:10, fontSize: 18}}>{i18n.t('settingLangText')}</Paragraph>
        <View style={ {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch',margin:5}}>
          <Text>English</Text>
          <RadioButton
          value="en"
          status={ lang === 'en' ? 'checked' : 'unchecked' }
          onPress={() => setLang('en')}
        />
        </View>
        <View style={ {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch',margin:5}}>
          <Text>हिन्दी</Text>
          <RadioButton
            value="hi"
            status={ lang === 'hi' ? 'checked' : 'unchecked' }
            onPress={() => setLang('hi')}
          />
        </View>
        <Button labelStyle={styles.btnTB} style={{marginTop:10}} mode='contained' title="Save" onPress={() => 
          updateStorage({ age,loc,username,locationOn,notifications : notification,lang:lang})}> {i18n.t('saveBtn')} </Button>
          <Title style={{marginTop:10, fontSize: 25}}>{i18n.t('settingReset')}</Title>
        <Paragraph style={{paddingTop:10, fontSize: 18}}>{i18n.t('resetAlert')}</Paragraph>
        <Button labelStyle={styles.btnT} style={{marginTop:10}} mode='contained' title="Reset App" onPress={() => reset1()} labelStyle={styles.btnT}>{i18n.t('settingReset')}</Button>
        <Title style={{marginTop:10, fontSize: 25}}>{i18n.t('settingFAQ')}</Title>
        <Paragraph style={{paddingTop:10, fontSize: 18}}>{i18n.t('settingFAQText')}</Paragraph>
        <Button labelStyle={styles.btnT} style={{marginTop:10,marginBottom:10}} mode='contained' title="गोपनीयता नीति" onPress={async() =>await Linking.openURL('https://sia-app.github.io/privacy.html')}> {i18n.t('privacy')}</Button>        
      </KeyboardAvoidingView>
      </ScrollView>
      </ImageBackground>
      
  );
}

SettingsScreen.navigationOptions = {
  header: null,
};


