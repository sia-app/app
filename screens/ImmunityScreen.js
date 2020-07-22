import * as React from 'react';
import { SafeAreaView, Linking, StyleSheet, View, SectionList, useWindowDimensions } from 'react-native';
import { Text, Card,Subheading} from 'react-native-paper';
import 'react-native-gesture-handler';
import i18n from 'i18n-js';

export default function ImmunityScreen() {
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
    source:{
      padding: 20,
      color: 'red',
      fontSize: 20,
    }
  });
  
  const DATA = i18n.t('immunityData')

  const Tips = ({ title }) => (
    <View style={styles.tips}>
      <Card style={styles.card}>
        <Card.Content>
        {title==='water' && <Card.Cover source={require('../assets/images/water.png')} resizeMode={'cover'} style={styles.surfaceImage} />}
        {title==='doctor' && <Card.Cover source={require('../assets/images/doctor.png')} resizeMode={'cover'} style={styles.surfaceImage} />}
        {title==='medecine' && <Card.Cover source={require('../assets/images/medecine.png')} resizeMode={'cover'} style={styles.surfaceImage} />}
        {(title !=='water' && title !=='doctor' && title!=='medecine') && <Subheading style={styles.cardText}>{title}</Subheading>}
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
          ListHeaderComponent={() => (
            <View style={styles.getStartedContainer}>
              <Text style={styles.source} onPress={async() =>await Linking.openURL('https://www.ayush.gov.in/docs/123.pdf')}>{i18n.t('immunitySource')}www.ayush.gov.in</Text>
            </View>
          )}
          stickySectionHeadersEnabled={false}
    />


      </SafeAreaView>
  );
}


