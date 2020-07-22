import * as React from 'react';
import { SafeAreaView, Linking, StyleSheet, View, SectionList, useWindowDimensions } from 'react-native';
import { Text, Card,Subheading} from 'react-native-paper';
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
    source: {
      padding: 20,
      color: 'red',
      fontSize: 20
    }
  });
  
  const DATA = i18n.t('preventiveData');

  const Tips = ({ title }) => (
    <View style={styles.tips}>
      <Card style={styles.card}>
        <Card.Content>
          <Subheading style={styles.cardText}>{title}</Subheading>
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
            <Text style={styles.getStartedText}>{title[0]}</Text>
            <Text style={styles.source} onPress={async() =>await Linking.openURL(title[2])}>{title[1]}</Text>
          </View>
          )}
          stickySectionHeadersEnabled={false}
    />


      </SafeAreaView>
  );
}



