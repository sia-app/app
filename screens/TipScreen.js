import * as React from 'react';
import { SafeAreaView, Image, StyleSheet, View, SectionList, useWindowDimensions } from 'react-native';
import { Text, Card,Subheading} from 'react-native-paper';
import i18n from 'i18n-js';


export default function TipsScreen() {
  const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    container1: {
      minHeight: useWindowDimensions().height,
    },
    getStartedText: {
      alignSelf: 'center',
      padding: 20,
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    getStartedContainer:{
      alignSelf:'center',
    },
    tips:{
      paddingHorizontal: 20,
    }, 
    card: {
      paddingVertical: 20,
      marginBottom: 15,
    },
    cardText: {
      padding: 5,
      fontSize: 20,
      alignSelf: 'center',
      textAlign: 'center',
    }, 
    surfaceImage: {
      alignSelf: 'center',
      backgroundColor:'transparent',
      aspectRatio: 1,
      maxHeight: useWindowDimensions().height/3,
    },
  });
  
  const DATA = i18n.t('tipData');

  const Tips = ({ title }) => (
    <View style={styles.tips}>
      <Card style={styles.card}>
        <Card.Content>
          {title==='wash hands' && <Card.Cover source={require('../assets/images/wash_hands.png')} resizeMode={'cover'} style={styles.surfaceImage} />}
          {title==='cough' && <Card.Cover source={require('../assets/images/sneeze.png')} resizeMode={'cover'} style={styles.surfaceImage} />}
          { (title !=='wash hands' && title !=='cough') && <Subheading style={styles.cardText}>{title}</Subheading>}
        </Card.Content>
      </Card>
    </View>
  );


  return (
      <SafeAreaView style={styles.container}>

        <SectionList sections={DATA} 
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Tips title={item} />}
          renderSectionHeader={({ section: { title } }) => (
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>{title}</Text>
          </View>
          )}
          stickySectionHeadersEnabled={false}
    />


      </SafeAreaView>
  );
}


