import * as React from 'react';
import { ScrollView, Linking, StyleSheet, View, FlatList, useWindowDimensions, ImageBackground } from 'react-native';
import { Text, Card,Paragraph, Title, IconButton, Caption, Avatar, Subheading} from 'react-native-paper';
import 'react-native-gesture-handler';
import i18n from 'i18n-js';


export default function LinksScreen() {
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
      marginVertical: 10,
    },
    cardText: {
      fontSize: 20,
      alignSelf: 'center',
      textAlign: 'center',
    },
    cover: {
      aspectRatio: 1,
      height: useWindowDimensions().width - 40,
    }, 
    bg: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    }
  });
  
  const DATA = [
    {
      name: i18n.t('siyaName'),
      title: i18n.t('siyaTitle'),
      desc: i18n.t('siyaDesc'),
      image: require('../assets/images/siya.jpg'),
      icon: 'Icon',
    },
    {
      name:i18n.t('sidhyaName'),
      title: i18n.t('sidhyaTitle'),
      desc: i18n.t('sidhyaDesc'),
      image: require('../assets/images/sidhya.jpg'),
      icon: 'Icon',
    },
    {
      name:i18n.t('yashName'),
      title: i18n.t('yashTitle'),
      desc: null,
      image: null,
      icon: 'https://yashmundra.com',
    },
    {
      name:i18n.t('varunName'),
      title: i18n.t('varunTitle'),
      desc: null,
      image: null,
      icon: 'https://varunmundra.com',
    },
  ]

  const Tips = ({ title,name,desc, image, icon }) => (
    <View style={styles.tips}>
        {(image === null) && (
          <Card style={styles.card}>
          <Card.Title
          title={name}
          subtitle={title}
          right={(props) => <IconButton {...props} color='#479564' icon="web" onPress={async() =>await Linking.openURL(icon) } />}
          />
          </Card>
        )}
             
        
        {(image !== null) && 
          <Card style={styles.card}>
          <Card.Title title={name} subtitle={title}></Card.Title>
          <Card.Cover source={image} resizeMode='cover' style={styles.cover}></Card.Cover>
          <Card.Content>
            <Subheading></Subheading>
            <Paragraph style={{fontSize:18,padding:5}}>{desc}</Paragraph>
          </Card.Content>
          </Card>
        }
    </View>
  );


  return (
    <ImageBackground source={require('../assets/images/Background.png')} style={styles.bg}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.getStartedText}>{i18n.t('aboutTeam')}</Text>
        </View>
        <FlatList data={DATA} 
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Tips title={item.title} name={item.name} desc={item.desc} image={item.image} icon={item.icon}/>}
        />


      </ScrollView>
      </ImageBackground>  
  );
}



