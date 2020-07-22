import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Alert,
  Image,
  ImageBackground,
  Linking,
  useWindowDimensions,
} from "react-native";
import {
  Text,
  Title,
  TextInput,
  Button,
  Caption,
  HelperText,
} from "react-native-paper";
import { AuthContext } from "../hooks/AppContexts";
import * as location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, Feather } from "@expo/vector-icons";
import i18n from 'i18n-js';


export default function SignUpScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modal2Visible, setModal2Visible] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [age, setAge] = React.useState(10);
  const [run, setRun] = React.useState(false);
  const [loc, setLoc] = React.useState({
    coords: {
      latitude: null,
      longitude: null,
    },
  });
  const [locI, setLocI] = React.useState({
    coords: {
      latitude: 26.9124,
      longitude: 75.8,
    },
  });
  const [Error, setError] = React.useState(false);
  const { signUp } = React.useContext(AuthContext);
  const [LError, setLError] = React.useState(false);

  const onSubmit = (age, loc, username) => {
    let val = true;
    let locVal = true;
    if (username === "") {
      setError(true);
      val = false;
    }
    if (age <= 0) {
      setError(true);
      val = false;
    }
    if (loc.coords.latitude === null || loc.coords.longitude === null) {
      setLError(true);
      locVal = false;
    }
    if (val && locVal) {
      signUp({ username, age, loc });
    } else {
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "stretch",
      paddingHorizontal: 20,
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    title: {
      flex: 1,
      justifyContent: "center",
    },
    f0: {
      flex: 1,
    },
    f1: {
      flex: 1,
    },
    infoText: {
      flex: 2,
    },
    btn: {
      flex: 1,
      justifyContent: "flex-start",
    },
    mapStyle: {
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
    btnMap: {
      paddingHorizontal: 15,
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

  React.useEffect(() => {
    let unmounted = false;
    (async () => {
      let { status } = await location.requestPermissionsAsync();
      //console.log(status);
      if (status !== "granted") {
        Alert.alert(
          "Location Permissions",
          "Location Permission not granted. Please restart the app and grant the permissions."
        );
        console.log("Location Permission not granted");
      } else {
        let l = await location.getCurrentPositionAsync({});
        if (!unmounted) {
          if (!run) {
            setLocI(l);
            setRun(true);
          }
        }
      }
    })();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <ImageBackground source={require('../assets/images/bgs.png')} style={styles.bg}>
    <KeyboardAvoidingView style={styles.container}>
      
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <MapView
          initialRegion={{
            latitude: locI.coords.latitude,
            longitude: locI.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          style={styles.mapStyle}
          onRegionChangeComplete={(region) => {
            setLoc({
              coords: {
                latitude: region.latitude,
                longitude: region.longitude,
              },
            });
            setRun(false);
          }}
          showsUserLocation={true}
        ></MapView>
        <View style={styles.markerFixed}>
          <Feather name="map-pin" size={35} color="black" />
        </View>
        <View style={styles.footer}>
          <Button
            style={styles.btnMap}
            mode="contained"
            onPress={() => setModalVisible(!modalVisible)}
          >
            {i18n.t('saveBtn')}
          </Button>
        </View>
      </Modal>
      <View style={styles.infoText}>
      </View>
      <View style={styles.title}>
        <Text style={{ fontSize: 30 }}>{i18n.t('SIA')}</Text>
        <Text style={{ fontSize: 20 }}>{i18n.t('signUpHeading')}!</Text>
      </View>
      <View style={styles.f0}>
        <TextInput
          mode="outlined"
          placeholder={i18n.t('signUpName')}
          value={username}
          onChangeText={setUsername}
        />
        <HelperText type="error" visible={Error}>
          {i18n.t('signUpHelper1')}
        </HelperText>
      </View>
      <View style={styles.btn}>
        <Button labelStyle={{fontSize:20}} mode="contained" onPress={() => setModalVisible(true)}>
        {i18n.t('locBtn')}
        </Button>
        <HelperText type="error" visible={LError}>
        {i18n.t('signUpHelper2')}
        </HelperText>
      </View>
      <View style={styles.btn}>
        <Button labelStyle={{fontSize:20}} mode="contained" onPress={() => onSubmit(age, loc, username)}>
          {i18n.t('signUpBtn')}
        </Button>
        <Text  style={{padding:10}} onPress={async() =>await Linking.openURL('https://sia-app.github.io/privacy.html')}>{i18n.t('privacy')}</Text>
      </View>
    </KeyboardAvoidingView>
    </ImageBackground>
  );
}

SignUpScreen.navigationOptions = {
  header: null,
};


