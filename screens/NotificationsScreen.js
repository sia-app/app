import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {Platform, Modal, StyleSheet, View, SafeAreaView, ImageBackground, TouchableOpacity, FlatList, Picker, ActionSheetIOS, Alert} from 'react-native';
import {Subheading , Switch, Text, TextInput, Button, Surface, Title, Paragraph, Portal} from 'react-native-paper';
import 'react-native-gesture-handler';
import { DataContext, ResetContext } from '../hooks/AppContexts';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import i18n from 'i18n-js';







export default function NotificationsScreen() {


  const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      margin: 15,
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
        color: "#000",
      },  
    bg: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    },
    surface:{
        flexDirection: 'row',
        flex:1,
        justifyContent: 'space-between',
        alignItems: "center",
        elevation: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#479564',
        marginVertical: 10,
    },
  });
  const [refresh,setRefresh] = React.useState(0);
  const [,setReset] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { reset_all } = React.useContext(ResetContext);
  const reset1 = () => {
    reset_all();
  }
  const {UD, updateStorage} = React.useContext(DataContext);
  const [username, setUsername] = React.useState(UD.username);
  const [age, setAge] = React.useState(UD.age);
  const [lang, setLang] = React.useState(UD.lang);
  const [loc, setLoc] = React.useState(UD.loc);
  const [locationOn, setLocationOn] = React.useState(UD.locationOn);
  const [notification, setNotification] = React.useState(UD.notifications);
  //New States to add notification
  const [newTitle, setNewTitle] = React.useState('SIA');
  const [newBody, setNewBody] = React.useState('');
  const [newSTime,setNewStime] = React.useState(new Date(Date.now()));
  const [newETime,setNewEtime] = React.useState(new Date(Date.now()));
  const [newInterval, setNewInterval] = React.useState(2);
  const [newType, setNewType] = React.useState('repeat');
  //Modal new form
  const [showNew, setShowNew] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const onChange1 = (event, selectedDate) => {
    setShow1(Platform.OS === 'ios');
    if(event.type == 'set' && Platform.OS === 'android'){
      setNewStime(Date.parse(selectedDate));
    }else if(Platform.OS === 'ios'){
      setNewStime(Date.parse(selectedDate));
    }
  };
  const onChange2 = (event, selectedDate) => {
    setShow2(Platform.OS === 'ios');
    if(event.type == 'set' && Platform.OS === 'android'){
      setNewEtime(Date.parse(selectedDate));
    }else if(Platform.OS === 'ios'){
      setNewEtime(Date.parse(selectedDate));
    }
  };
  const showTimepicker1 = () => {
    if(show1 && Platform.OS === 'ios'){
      setShow1(false);
      return;
    }
    setShow1(true);
  };
  const showTimepicker2 = () => {
    if(show2 && Platform.OS === 'ios'){
      setShow2(false);
      return;
    }
    setShow2(true);
  };
  const saveExit = () => {
    var n = notification;
    n.push({title:newTitle,body:newBody,start_time_h:(new Date(newSTime)).getHours(),
      start_time_m:(new Date(newSTime)).getMinutes(),end_time_h:(new Date(newETime)).getHours(),
      end_time_m:(new Date(newETime)).getMinutes(),time_interval:newInterval,type:newType});
    setNotification(n);
    setShowNew(false);
    setRefresh(refresh+1);
    updateStorage({ age,loc,username,locationOn,notifications : n, lang: lang});
  }

  //Exisitng Notifications
  function NList({not,index,refresh}) {
    const [timeInterval, setTimeInterval] = React.useState(not.time_interval);
    let cDate = Date.now();
    let cd = new Date(cDate);
    let t1 = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate(), not.start_time_h, not.start_time_m);
    let t2 = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate(), not.end_time_h, not.end_time_m);
    const [start_time, setTime1] = React.useState(t1);
    const [end_time, setTime2] = React.useState(t2);
    const [show1, setShow1] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const [showM,setShowM] = React.useState(false);
    const [title,setTitle] = React.useState(not.title);
    const [body,setBody] = React.useState(not.body);
    const [type,setType] = React.useState(not.type);
    const onChange1 = (event, selectedDate) => {
      setShow1(Platform.OS === 'ios');
      if(event.type == 'set' && Platform.OS === 'android'){
        setTime1(Date.parse(selectedDate));
      }else if(Platform.OS === 'ios'){
        setTime1(Date.parse(selectedDate));
      }
    };
    const onChange2 = (event, selectedDate) => {
      setShow2(Platform.OS === 'ios');
      if(event.type == 'set' && Platform.OS === 'android'){
        setTime2(Date.parse(selectedDate));
      }else if(Platform.OS === 'ios'){
        setTime2(Date.parse(selectedDate));
      }
    };
    const showTimepicker1 = () => {
      if(show1 && Platform.OS === 'ios'){
        setShow1(false);
        return;
      }
      setShow1(true);
    };
    const showTimepicker2 = () => {
      if(show2 && Platform.OS === 'ios'){
        setShow2(false);
        return;
      }
      setShow2(true);
    };
    const saveExit = () => {
      var n = notification;
      n[index] = {title:title,body:body,start_time_h:(new Date(start_time)).getHours(),
        start_time_m:(new Date(start_time)).getMinutes(),end_time_h:(new Date(end_time)).getHours(),
        end_time_m:(new Date(end_time)).getMinutes(),time_interval:timeInterval,type:type}
      setNotification(n);
      setShowM(false);
      setRefresh(!refresh);
      updateStorage({ age,loc,username,locationOn,notifications : n, lang: lang})
    };

    const deleteN = () => {
      var n = notification;
      n.splice(index,1);
      setNotification(n);
      setShowM(false);
      setRefresh(!refresh);
      updateStorage({ age,loc,username,locationOn,notifications : n, lang: lang})
    };

    

    const action2 = () => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [i18n.t('repeat1'),i18n.t('repeat2'),i18n.t('repeat3'),
          i18n.t('repeat4'),i18n.t('repeat5'),i18n.t('repeat6'),
          i18n.t('repeat7'),i18n.t('repeat8'),i18n.t('repeat9'),
          i18n.t('repeat10'),i18n.t('repeat11'),i18n.t('repeat12')]
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            setType('twice');
            setTimeInterval(1);
          } else{
            setType('repeat');
            setTimeInterval(buttonIndex+1);
          }
        }
      );
    }

    const change = (itemValue) => {
      setTimeInterval(itemValue);
      if(itemValue === 1){
        setType('twice');
      }else{
        setType('repeat');
      }
    }
    return (
      <View>
      <TouchableOpacity activeOpacity={0.9} onPress={() => {setShowM(true)}}>
      <Surface style={styles.surface}>
        <View style={styles.time}>
          <View style={{flex:0.7,marginTop:10}}>
            <Title>{body}</Title>
          </View>
          <View style={{flex:0.2}} ></View>
        </View>
      </Surface>
      </TouchableOpacity>
      <Portal>
      <Modal animationType="slide" transparent={false} visible={showM}>
        <View style={styles.container}>
        <Title>{i18n.t('notifChange')}</Title>
        <TextInput multiline={true} blurOnSubmit={true} mode='outlined' label={i18n.t('notifText')} value={body}  onChangeText={setBody}/>
        
        <View style={styles.time}>
          <TextInput style={{flex:0.5}} mode='outlined' value={moment(start_time).format('LT')} disabled='true'/>
          <View style={{flex:0.1}} ></View>
          <Button labelStyle={styles.btnT} style={{flex:0.4}} mode='contained' onPress={showTimepicker1} title="Time 2 Picker">{(type === 'repeat')?i18n.t('time1'):i18n.t('time')}</Button>
        </View>

        <View>
          {show1 && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date(start_time)}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onChange1}
            textColor='#000'
            locale="en-IN"
            timeZoneOffsetInMinutes={330}
          />
          )}
        </View>

        {(type === 'repeat') &&(<View style={styles.time}>
          <TextInput style={{flex:0.5}} mode='outlined' value={moment(end_time).format('LT')} disabled='true'/>
          <View style={{flex:0.1}} ></View>
          <Button labelStyle={styles.btnT} style={{flex:0.4}} mode='contained' onPress={showTimepicker2} title="Time 1 Picker">{(type === 'repeat')?i18n.t('time2'):i18n.t('time')}</Button>
        </View>)}

        <View>
          {show2 && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date(end_time)}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onChange2}
            timeZoneOffsetInMinutes={330}
          />
          )}
        </View>

        {(Platform.OS === 'android') && (<View style={styles.time}>
          <Text style={{flex:0.4,paddingHorizontal:10}}>{i18n.t('repeat')}</Text>
          <Picker style={{flex:0.6,}} enabled={true} mode="dropdown" selectedValue={timeInterval} onValueChange={(itemValue, itemIndex) => change(itemValue)}>
            <Picker.Item label={i18n.t('repeat1')} value={1} />
            <Picker.Item label={i18n.t('repeat2')} value={2} />
            <Picker.Item label={i18n.t('repeat3')} value={3} />
            <Picker.Item label={i18n.t('repeat4')} value={4} />
            <Picker.Item label={i18n.t('repeat5')} value={5} />
            <Picker.Item label={i18n.t('repeat6')} value={6} />
            <Picker.Item label={i18n.t('repeat7')} value={7} />
            <Picker.Item label={i18n.t('repeat8')} value={8} />
            <Picker.Item label={i18n.t('repeat9')} value={9} />
            <Picker.Item label={i18n.t('repeat10')} value={10} />
            <Picker.Item label={i18n.t('repeat11')} value={11} />
            <Picker.Item label={i18n.t('repeat12')} value={12} />
          </Picker> 
        </View>)}
        {(Platform.OS === 'ios') && 
          <View style={styles.time}>
            <TextInput style={{flex:0.5}} mode='outlined' label={i18n.t('repeat')} value={timeInterval.toString()} disabled='true'/>
            <View style={{flex:0.1}} ></View>
            <Button labelStyle={styles.btnT} style={{flex:0.4}} mode='contained' onPress={action2} title="Time 2 Picker">{i18n.t('repeat')}</Button>
          </View>
        }


        <View style={styles.footer1}>
          <Button mode="contained" onPress={() => {saveExit()}}>{i18n.t('saveBtn')}</Button>
          <Button style={{marginTop:10}} mode="contained" onPress={() => {deleteN()}}>{i18n.t('deleteBtn')}</Button>
          <Button style={{marginTop:10}} mode="contained" onPress={() => {setShowM(false)}}>{i18n.t('goBack')}</Button>
        </View>
        </View>
      </Modal>  
      </Portal>
      </View>
      
    );
  }

  function Header() {
    return (
    <View>
      
        <View style={styles.getStartedContainer}>

          <Text style={styles.getStartedText}>{i18n.t('notifTitle')}</Text>
          <Paragraph style={{paddingTop:10, fontSize: 18}}>{i18n.t('notifBody')}</Paragraph>
          
        </View>
                
    </View>);
  }


  const action2 = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [i18n.t('repeat1'),i18n.t('repeat2'),i18n.t('repeat3'),
        i18n.t('repeat4'),i18n.t('repeat5'),i18n.t('repeat6'),
        i18n.t('repeat7'),i18n.t('repeat8'),i18n.t('repeat9'),
        i18n.t('repeat10'),i18n.t('repeat11'),i18n.t('repeat12')],
      },
      buttonIndex => {
        console.log(buttonIndex);
        if (buttonIndex === 0) {
          setNewType('twice');
          setNewInterval(1);
        }else{
          setNewType('repeat');
          setNewInterval(buttonIndex+1);  
        }
      }
    );
  }

  const change = (itemValue) => {
    setNewInterval(itemValue);
    if(itemValue === 1){
      setNewType('twice');
    }else{
      setNewType('repeat');
    }
  }

  return (
    <ImageBackground source={require('../assets/images/Background.png')} style={styles.bg}>
      <SafeAreaView style={styles.container}>
        <FlatList data={notification}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item,index }) => <NList not={item} index={index} refresh={refresh}/>}
        extraData={refresh}
        ListHeaderComponent ={Header}
        />
      <Button labelStyle={styles.btnT} style={{marginTop:10,marginBottom:10}} mode='contained' title={i18n.t('notifNewC')} onPress={() =>{setShowNew(true)}}>{i18n.t('notifNewC')}</Button>
      </SafeAreaView>
      
      <Portal>
      
      <Modal animationType="slide" transparent={false} visible={showNew}>
        
        <View style={styles.container}>
        <Title>{i18n.t('notifNew')}</Title>
        <TextInput multiline={true} blurOnSubmit={true} mode='outlined' label={i18n.t('notifText')} value={newBody} onChangeText={setNewBody}/>


        <View style={styles.time}>
          <TextInput style={{flex:0.5}} mode='outlined' value={moment(newSTime).format('LT')} disabled='true'/>
          <View style={{flex:0.1}} ></View>
          <Button labelStyle={styles.btnT} style={{flex:0.4}} mode='contained' onPress={showTimepicker1} title="Time 2 Picker">{(newType === 'repeat')?i18n.t('time1'):i18n.t('time')}</Button>
        </View>

        <View>
          {show1 && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date(newSTime)}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onChange1}
            textColor='#000'
            locale="en-IN"
            timeZoneOffsetInMinutes={330}
          />
          )}
        </View>

        {(newType === 'repeat') && (<View style={styles.time}>
          <TextInput style={{flex:0.5}} mode='outlined' value={moment(newETime).format('LT')} disabled='true'/>
          <View style={{flex:0.1}} ></View>
          <Button labelStyle={styles.btnT} style={{flex:0.4}} mode='contained' onPress={showTimepicker2} title="Time 1 Picker">{(newType === 'repeat')?i18n.t('time2'):i18n.t('time')}</Button>
        </View>)}

        <View>
          {show2 && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date(newETime)}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onChange2}
            locale={"en-IN"}
            timeZoneOffsetInMinutes={330}
          />
          )}
        </View>
        {(Platform.OS === 'android') && (
        <View style={styles.time}>
          <Text style={{flex:0.4}}>{i18n.t('repeat')}</Text>
          <View style={{flex:0.1}} ></View>
          <Picker style={{flex:0.4}} mode="dropdown" selectedValue={newInterval} onValueChange={(itemValue, itemIndex) => change(itemValue)}>
            <Picker.Item label={i18n.t('repeat1')} value={1} />
            <Picker.Item label={i18n.t('repeat2')} value={2} />
            <Picker.Item label={i18n.t('repeat3')} value={3} />
            <Picker.Item label={i18n.t('repeat4')} value={4} />
            <Picker.Item label={i18n.t('repeat5')} value={5} />
            <Picker.Item label={i18n.t('repeat6')} value={6} />
            <Picker.Item label={i18n.t('repeat7')} value={7} />
            <Picker.Item label={i18n.t('repeat8')} value={8} />
            <Picker.Item label={i18n.t('repeat9')} value={9} />
            <Picker.Item label={i18n.t('repeat10')} value={10} />
            <Picker.Item label={i18n.t('repeat11')} value={11} />
            <Picker.Item label={i18n.t('repeat12')} value={12} />
          </Picker> 
        </View>)}

        {(Platform.OS === 'ios') && 
          <View style={styles.time}>
            <TextInput style={{flex:0.5}} mode='outlined' label={i18n.t('repeat')} value={newInterval.toString()} disabled='true'/>
            <View style={{flex:0.1}} ></View>
            <Button labelStyle={styles.btnT} style={{flex:0.4}} mode='contained' onPress={action2} title="Time 2 Picker">{i18n.t('repeat')}</Button>
          </View>
          }


        <View style={styles.footer1}>
          <Button mode="contained" style={{marginBottom: 10}} onPress={() => {saveExit()}}>{i18n.t('saveBtn')}</Button>
          <Button mode="contained" onPress={() => {setShowNew(false)}}>{i18n.t('goBack')}</Button>
        </View>
        </View>
      </Modal>  
      </Portal>
      
      </ImageBackground>
      
  );
}

NotificationsScreen.navigationOptions = {
  header: null,
};


