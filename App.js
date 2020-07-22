import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Platform, StatusBar, StyleSheet, View, Alert, DevSettings } from "react-native";
import { Notifications } from "expo";
import * as Notif from 'expo-notifications';
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import Onboard from "./navigation/Onboard";
import AsyncStorage from '@react-native-community/async-storage';
import * as TaskManager from "expo-task-manager";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./constants/theme";
import * as Analytics from "expo-firebase-analytics";
import * as firebase from "firebase/app";
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import {ResetContext, AuthContext, DataContext} from './hooks/AppContexts';
import 'react-native-gesture-handler';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translations from './constants/translations';





//Stack navigator holding Onboard/Signup and Tab View
const Stack = createStackNavigator();
//Name for location function
const LOCATION_TASK_NAME = "background-location-task";


//Location Exit Notification
const localNotification3 = {
  title: "SIA सूचना!",
  body: "ऐसा लगता है कि आप यात्रा कर रहे हैं, कृपया मास्क पहनें एवं 2 गज की दूरी का पालन करें",
  ios: {    
    sound: true, 
    _displayInForeground : true,
  },
  android: { 
    priority: "high", 
    sticky: false, 
    channelId: 'reminders',
    color: '#fc7930',
  },
};
//Location Enter Notification
const localNotification4 = {
  title: "SIA सूचना!",
  body: "ऐसा लगता है कि आप घर वापस आएँ हैं, अपने जूते घर के बाहर खोलना न भूलें",
  ios: {    
    sound: true, 
    _displayInForeground : true,
  },
  android: { 
    priority: "high", 
    sticky: false, 
    channelId: 'reminders',
    color: '#fc7930',
  },
};

//Location Exit Notification
const localNotification1 = {
  title: "SIA!",
  body: "Seems like you are travelling!! Wear a mask and follow social distancing",
  ios: {    
    sound: true, 
    _displayInForeground : true,
  },
  android: { 
    priority: "high", 
    sticky: false, 
    channelId: 'reminders',
    color: '#fc7930',
  },
};
//Location Enter Notification
const localNotification2 = {
  title: "SIA!",
  body: "Seems like you are home!! Do not forget to open your shoes outside your house",
  ios: {    
    sound: true, 
    _displayInForeground : true,
  },
  android: { 
    priority: "high", 
    sticky: false, 
    channelId: 'reminders',
    color: '#fc7930',
  },
};

i18n.translations = translations;

export default function App() {


  //Function to schedule local notifications
  const askNotification = async (title,body,start_time_h,start_time_m,end_time_h,end_time_m,time_interval,type) => {
    // Notification Permissions(iOS)
    //Get today's date and time
    let cDate = Date.now();
    let cd = new Date(cDate);
    //Create the appropriate date objects
    let t1 = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate(), start_time_h, start_time_m);
    let t2 = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate(), end_time_h, end_time_m);
    t1 = t1.getTime();
    t2 = t2.getTime();

    
    if(type === 'repeat'){//Schedule notification every time interval
      //console.log("T1: ",new Date(t1).getHours(),":",new Date(t1).getMinutes());
      //console.log("T2: ",new Date(t2).getHours(),":",new Date(t2).getMinutes());
      let tp = (t2-t1)/time_interval;
      t1 = t1 + (tp/2);
      //console.log("TP: ",tp/3600000);
      //console.log("STart T1:",t1);
      //console.log("While:");
      let n = 0;
      while((new Date(t1).getHours()) < (new Date(t2).getHours())){
        //console.log("Loop: ",n);
        let i;
        if(t1 > Date.now()){
          i = false;
        }else{
          i = true;
          t1 = t1 + 86400000;
        }
        //t1 = (t1 > Date.now()) ? t1 : t1 + 86400000;
        const schedulingOptions = { time: t1, repeat: "day" };
        const localNotification = {
          title: title,
          body: body,
          ios: {
            sound: true,
            _displayInForeground : true,
          },
          android: {
            priority: "high",
            sticky: false, 
            channelId: 'reminders',
            color: '#fc7930',
          },
        };
        //console.log("Scheduling at: ",new Date(t1).getHours(),":",new Date(t1).getMinutes());
        try{
          let x = await Notifications.scheduleLocalNotificationAsync(
            localNotification,
            schedulingOptions
          );
        }catch (error) {
          //console.log(error);
        }
        //Increase time by INIT_INTERVAL hours 
        if(i){
          t1 = t1 - 86400000;
        }
        t1 = t1 + (tp);
        n = n+1;
      }
    }else if(type === 'twice'){//Schedule the notification twice a day
      //console.log("T1 Once: ",new Date(t1).getHours(),":",new Date(t1).getMinutes());
      let i;
      if(t1 > Date.now()){
        i = false;
      }else{
        i = true;
        t1 = t1 + 86400000;
      }
      const schedulingOptions0 = { time: t1, repeat: "day" };
      //const schedulingOptions1 = { time: t2, repeat: "day" };
      const localNotification = {
        title: title,
        body: body,
        ios: {
          sound: true,
          _displayInForeground : true,
        },
        android: {
          priority: "high",
          sticky: false, 
          channelId: 'reminders',
          color: '#fc7930',
        },
      };
      try{
        await Notifications.scheduleLocalNotificationAsync(
          localNotification,
          schedulingOptions0
        );
        //await Notifications.scheduleLocalNotificationAsync(
        //  localNotification,
        //  schedulingOptions1
        //);
      }catch (error) {
        //console.log(error);
      }
    }
    
  };



  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [UD, setUD] = React.useState({
    username: "",
    age: "",
    loc: "",
    timeInterval: "",
    locationOn: "",
    notifications: [],
    lang: "",
  });
  const [initLang, setLang] = React.useState('hi');

 
  
  //Persist changed(saved) settings from SettingsScreen
  const updateStorage = async (data) => {
    //console.log("Update Storage"); 
    console.log("Updated Data:",data);
    //Set State
    setUD(data);
    //Persist new settings into local storage
    const n = data.notifications;
    //console.log("N",n);
    let x = await Notifications.cancelAllScheduledNotificationsAsync();
    //console.log(x);
    for (nt in n){
      //console.log(n[nt]);
      askNotification(n[nt].title,n[nt].body,n[nt].start_time_h,n[nt].start_time_m,n[nt].end_time_h,n[nt].end_time_m,n[nt].time_interval,n[nt].type);
    }
    //Persist new Location Tracking
    const locNotification = async () => {
      const { status,permissions } = await Permissions.askAsync(Permissions.LOCATION);
      try {
        const started = await Location.hasStartedGeofencingAsync(LOCATION_TASK_NAME);
        if(!data.locationOn && started){
          await Location.stopGeofencingAsync(LOCATION_TASK_NAME);
          return;
        }
        if (started) {
          //console.log("Geofencing Already Running.");
          return;
        }
        if (status === "granted" && data.locationOn) {
          //console.log("Starting location updates");
          /*await Location.startGeofencingAsync(LOCATION_TASK_NAME, [
            {
              latitude: data.loc.coords.latitude,
              longitude: data.loc.coords.longitude,
              radius: 100,
            },
          ]);*/
        }
      } catch (error) {
        //console.log(error);
      }
    };
    locNotification();

    try {
      //console.log(data);
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("@SIAAPP:UserData", jsonData);
    } catch (error) {
      //console.log(error);
    }

    console.log(data);

    if(i18n.locale !== data.lang){
      i18n.locale = data.lang;
      DevSettings.reload();
    }else{
      Alert.alert(i18n.t('settingChanged'));
    }
    Analytics.logEvent("SettingChanged", { info: "Settings Changed" });
    //console.log("Update Storage Done");
  };

  //Reset App
  const reset = React.useMemo(
    () => ({
      reset_all: async () => {
        //console.log("Reset App");
        await Notifications.cancelAllScheduledNotificationsAsync();
        const started = await Location.hasStartedGeofencingAsync(LOCATION_TASK_NAME);
        if(started){
          await Location.stopGeofencingAsync(LOCATION_TASK_NAME);
        }
        await AsyncStorage.clear();
        DevSettings.reload();
      } 
    }));
  
  //Authentication Flow
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );


  const restart_notifications = async () => {
    const locNotification = async () => {
      const { status } = await Location.requestPermissionsAsync();
      try {
        const started = await Location.hasStartedGeofencingAsync(LOCATION_TASK_NAME);
        if(!userData.locationOn && started){
          await Location.stopGeofencingAsync(LOCATION_TASK_NAME);
          return;
        }
        if (started) {
          //console.log("Geofencing Already Running.");
          return;
        }
        if (status === "granted") {
          //console.log("Starting location updates");
          await Location.startGeofencingAsync(LOCATION_TASK_NAME, [
            {
              latitude: userData.loc.coords.latitude,
              longitude: userData.loc.coords.longitude,
              radius: 500,
            },
          ]);
        }
      } catch (error) {
        //console.log(error);
      }
    };
    try{
      //console.log("Trying to load notifications");
      //console.log("User Data Value is not null:",(userData !== null));
      if (userData !== null) {
        const n = userData.notifications;
        let x = await Notifications.cancelAllScheduledNotificationsAsync();
        //console.log(x);
        for (nt in n){
          await askNotification(n[nt].title,n[nt].body,n[nt].start_time_h,n[nt].start_time_m,n[nt].end_time_h,n[nt].end_time_m,n[nt].time_interval,n[nt].type);
        }
        locNotification();
      } 
    }catch(e){
      //console.log('Notification Error');
      console.warn(e)
    }
  }

  React.useEffect(() => {
    i18n.translations = translations;
    //console.log("Use Effect Running");
    //Notification Channel Creation
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('reminders', {
        name: 'Reminders',
        sound: true,
        priority: 'max',
        vibrate: [ 0, 250, 250, 250 ],
        badge: false,
      });
    }
    //Load data and persist notifications
    const bootstrapAsync = async () => {
      let userToken;
      let userData;
      try{
        //console.log("Trying to load Fonts");
        SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
          'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
          'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
          'poppins-thin': require('./assets/fonts/Poppins-Thin.ttf'),
          'poppins-semi-bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
          'noto-sans': require('./assets/fonts/NotoSans-Regular.ttf'),
          'noto-sans-bold': require('./assets/fonts/NotoSans-Bold.ttf'),
        });
      }catch(e){
        //console.log('Font Error');
        console.warn(e);
      }finally{
        //console.log("Done loading Fonts");
      }
      //Fill UD from local storage
      try {
        //console.log("Trying to load data");
        userToken = await AsyncStorage.getItem("@SIAAPP:UserData");
        userData = JSON.parse(userToken);
      } catch (e) {
        //console.log('Storage Error');
        console.warn(e);
      } finally {
        //console.log("Loaded Data:",userData);
        if(userData !== null){
          console.log(userData.lang)
          if(userData.lang === null){
            i18n.locale = 'hi';
          }else{
            i18n.locale = userData.lang;
          }
        }

        const started = await Location.hasStartedGeofencingAsync(
          LOCATION_TASK_NAME
        );
        //console.log("Location Notification");
        if (started) {
          //console.log("Geofencing Already Running. Stopping");
          await Location.stopGeofencingAsync(LOCATION_TASK_NAME);
        }

        setUD(userData);
        setLoadingComplete(true);
        dispatch({ type: "RESTORE_TOKEN", token: userData });
        SplashScreen.hideAsync();
      }
    };   

    //console.log(Localization.locales);
    bootstrapAsync();  
  }, []);

  //Authentication Flow
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        try {
          const jsonData = JSON.stringify(data);
          await AsyncStorage.setItem("@SIAAPP:UserData", jsonData);
        } catch (error) {}
        dispatch({ type: "SIGN_IN", token: data });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {

        
        //console.log('Sign Up');
        setLoadingComplete(false);
        //Reminders
        const n = [];

        if(i18n.locale === 'hi'){
        n.push({title:'SIA सूचना!',body:'कृपया अपने हाथ साबुन से 20 सेकंड तक साफ़ पानी से धोएँ',start_time_h:8,start_time_m:0,end_time_h:20,end_time_m:0,time_interval:12,type:'repeat'});
        n.push({title:'SIA सूचना!',body:'क्या आपने अपना किराने का सामान धोना सुनिश्चित किया',start_time_h:14,start_time_m:0,end_time_h:20,end_time_m:0,time_interval:1,type:'twice'});
        n.push({title:'SIA सूचना!',body:'सार्वजनिक स्थानो पर थूकें नहीं',start_time_h:9,start_time_m:30,end_time_h:19,end_time_m:30,time_interval:6,type:'repeat'});
        n.push({title:'SIA सूचना!',body:'यहां-वहां एवं आँख, नाक और मुँह को ना छुएँ ',start_time_h:8,start_time_m:0,end_time_h:20,end_time_m:0,time_interval:6,type:'repeat'});
        }else{
        n.push({title:'SIA Reminder!',body:'Wash your hands with soap and clean water for at least 20 seconds',start_time_h:8,start_time_m:0,end_time_h:20,end_time_m:0,time_interval:12,type:'repeat'});
        n.push({title:'SIA Reminder!',body:'Did you make sure to wash your groceries?',start_time_h:14,start_time_m:0,end_time_h:20,end_time_m:0,time_interval:1,type:'twice'});
        n.push({title:'SIA Reminder!',body:'Please do not spit at public places!',start_time_h:9,start_time_m:30,end_time_h:19,end_time_m:30,time_interval:6,type:'repeat'});
        n.push({title:'SIA Reminder!',body:'Do not touch your eyes, nose, mouth and things here and there unnecessarily.',start_time_h:8,start_time_m:0,end_time_h:20,end_time_m:0,time_interval:6,type:'repeat'});
        }

        const settings = await Notif.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },  
        });
        //console.log(settings);
        if(Platform.OS === 'ios'){
          if (settings.ios.status) {
            //console.log("Notification permissions granted.");
          }else{
            
              Alert.alert("Notification permissions not granted! Reminders won't work!");
          }
        }

        ////console.log(n);
        for (const nt in n){
          ////console.log(n[nt]);
          await askNotification(n[nt].title,n[nt].body,n[nt].start_time_h,n[nt].start_time_m,n[nt].end_time_h,n[nt].end_time_m,n[nt].time_interval,n[nt].type);
        }

        //Location Tracking
        const locNotification = async () => {
          const { status } = await Location.requestPermissionsAsync();
          try {
            const started = await Location.hasStartedGeofencingAsync(
              LOCATION_TASK_NAME
            );
            //console.log("Location Notification");
            if (started) {
              //console.log("Geofencing Already Running. Stopping");
              await Location.stopGeofencingAsync(LOCATION_TASK_NAME);
            }
            
            if (status === "granted") {
              /*await Location.startGeofencingAsync(LOCATION_TASK_NAME, [
                {
                  latitude: data.loc.coords.latitude,
                  longitude: data.loc.coords.longitude,
                  radius: 500,
                },
              ]);*/
            }
            
          } catch (error) {
            //console.log(error);
          }
        };
        locNotification();


        //Firebase Analytics
        Analytics.logEvent("UserSignUp", {
          info: "User Signed Up",
          timestamp: Date.now(),
        });

        try {
          data.locationOn = true;
          data.notifications = n;
          data.lang = i18n.locale;
          setUD(data);
          ////console.log(UD);
          //console.log("SignUp UD");
          const jsonData = JSON.stringify(data);
          await AsyncStorage.setItem("@SIAAPP:UserData", jsonData);
        } catch (error) {
          //console.log(error);
        } finally {
          //Authentication flow
          setLoadingComplete(true);
          dispatch({ type: "SIGN_IN", token: data });
        }
        //Set Push Token and persist to firebase
      },
    }),
    []
  );

  //------------------------------------------------------------

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        {Platform.OS === "android" && (
          <StatusBar backgroundColor="#fc7930" barStyle="light-content" />
        )}
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AuthContext.Provider value={authContext}>
              <DataContext.Provider value={{ UD, updateStorage }}>
                <ResetContext.Provider value={reset}>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {state.userToken == null ? (
                      <Stack.Screen name="Sign Up!" component={Onboard} />
                    ) : (
                      <Stack.Screen name="Root" component={BottomTabNavigator} />
                    )}
                  </Stack.Navigator>
                </ResetContext.Provider>
              </DataContext.Provider>
            </AuthContext.Provider>
          </NavigationContainer>
        </PaperProvider>
      </View>
    );
  }
}

TaskManager.defineTask(  LOCATION_TASK_NAME,  async ({ data: { eventType, region }, error }) => {
    //console.log('Task Run');
    if (error) {
      // Error occurred - check `error.message` for more details.
      console.log(error);
      return;
    }
    let x = 'no';
    try {
      //console.log("Trying to load data");
      userToken = await AsyncStorage.getItem("@SIAAPP:UserData");
      userData = JSON.parse(userToken);
    } catch (e) {
      console.warn(e);
    } finally {
      //console.log("Loaded Data:",userData);
      if(userData !== null){
        if(userData.lang === null){
          x = 'hi';
        }else{
          x = userData.lang;
        }
      } 
    }
    const settings = await Notif.getPermissionsAsync();
    if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    }else{
      return;
    }
    if (eventType === Location.GeofencingEventType.Exit) {
      if(x === 'hi'){
        Notifications.presentLocalNotificationAsync(localNotification3);
      }else if(x === 'en'){
        Notifications.presentLocalNotificationAsync(localNotification1);
      }
    }
    if (eventType === Location.GeofencingEventType.Enter) {
      if(x === 'hi'){
        Notifications.presentLocalNotificationAsync(localNotification4);
      }else if(x === 'en'){
        Notifications.presentLocalNotificationAsync(localNotification2);
      }
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
