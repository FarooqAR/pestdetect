/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import {
  Card,
  Overlay,
  ListItem,
  Divider,
  Icon,
  Button,
} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {Calendar} from 'react-native-calendars';

type Props = {
  navigation: any;
};

const mandiItemsCats = [
  {id: 1, name: 'Cabbage', selected: false},
  {id: 2, name: 'Lady Finger', selected: false},
  {id: 3, name: 'Cucumber', selected: false},
  {id: 4, name: 'Peppermint', selected: false},
  {id: 5, name: 'Tomato', selected: false},
  {id: 6, name: 'Lemon', selected: false},
  {id: 7, name: 'Potato', selected: false},
  {id: 8, name: 'Onion', selected: false},
  {id: 9, name: 'Banana', selected: false},
  {id: 10, name: 'Apple', selected: false},
  {id: 11, name: 'Mangoe', selected: false},
  {id: 12, name: 'Strawberry', selected: false},
  {id: 13, name: 'Grapefruit', selected: false},
  {id: 14, name: 'Orange', selected: false},
];

const mandiItems = [
  {
    title: 'Rice',
    price: 10000,
    image: require('../assets/rice_plant.webp'),
  },
  {
    title: 'Onions',
    price: 2500,
    image: require('../assets/onion_plant.jpg'),
  },
  {
    title: 'Cucumber',
    price: 1000,
    image: require('../assets/cucumber_plant.png'),
  },
  {
    title: 'Cabbage',
    price: 5500,
    image: require('../assets/cabbage_plant.jpg'),
  },
  {
    title: 'Tomato',
    price: 1200,
    image: require('../assets/tomato_plant.jpg'),
  },
  {
    title: 'Strawberry',
    price: 1030,
    image: require('../assets/straw_plant.jpg'),
  },
];

const tools = [
  {
    title: 'Tractor Massey',
    price: 1522000,
    image: require('../assets/tractor.jpg'),
  },
  {
    title: 'Paragon Solar',
    price: 103000,
    image: require('../assets/panel.jpg'),
  },
];

const pestsProducts = [
  {
    title: 'Copper Sulphate',
    price: 1522,
    image: require('../assets/pesticide_1.png'),
  },
  {
    title: 'Gilmour Pack',
    price: 10300,
    image: require('../assets/pesticide_2.webp'),
  },
  {
    title: 'Parbat Carpate',
    price: 3500,
    image: require('../assets/pesticide_3.jpg'),
  },
];

const MarketPlaceScreen = (props: Props) => {
  const {navigation} = props;
  const [currentCat, setCat] = useState({
    mandi: true,
    tools: false,
    pesticides: false,
  });

  const [currentMandiCatState, setMandiCatState] = useState(mandiItemsCats);
  const [currentItems, setCurrentItems] = useState(mandiItems);
  const [
    sendContactRequestOverlayVisible,
    setSendContactRequestOverlayVisible,
  ] = useState(false);
  const [
    sentContactRequestOverlayVisible,
    setSentContactRequestOverlayVisible,
  ] = useState(false);

  const toggleSendContactRequestOverlayVisible = () => {
    setSendContactRequestOverlayVisible(!sendContactRequestOverlayVisible);
  };

  const toggleSentContactRequestOverlayVisible = () => {
    setSentContactRequestOverlayVisible(!sentContactRequestOverlayVisible);
  };

  const showContactSentRequestOverlay = () => {
    toggleSendContactRequestOverlayVisible();
    toggleSentContactRequestOverlayVisible();
  };

  const setCurrentCat = (cat: string) => {
    const newState = {
      mandi: false,
      tools: false,
      pesticides: false,
    };
    setCat({
      ...newState,
      [cat]: true,
    });
    switch (cat) {
      case 'mandi':
        setCurrentItems(
          currentMandiCatState[0].selected
            ? mandiItems.slice(3, 4)
            : mandiItems,
        );
        break;
      case 'tools':
        setCurrentItems(tools);
        break;
      case 'pesticides':
        setCurrentItems(pestsProducts);
        break;
      default:
        break;
    }
  };

  const toggleMandiCatSelected = (id: number) => {
    const newState = [...currentMandiCatState];
    const index = newState.findIndex((a) => a.id === id);
    newState[index] = Object.assign(newState[index], {
      selected: !newState[index].selected,
    });
    setMandiCatState(newState);
    setCurrentItems(
      currentMandiCatState[0].selected ? mandiItems.slice(3, 4) : mandiItems,
    );
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.sectionTitle}>MarketPlace</Text>
          </View>
          <View style={styles.catsContainer}>
            <Button
              title="Mandi"
              buttonStyle={styles.btn}
              type={currentCat.mandi ? 'solid' : 'outline'}
              onPress={() => setCurrentCat('mandi')}
            />
            <Button
              title="Tools"
              type={currentCat.tools ? 'solid' : 'outline'}
              buttonStyle={styles.btn}
              onPress={() => setCurrentCat('tools')}
            />
            <Button
              title="Pesticides"
              type={currentCat.pesticides ? 'solid' : 'outline'}
              buttonStyle={styles.btn}
              onPress={() => setCurrentCat('pesticides')}
            />
          </View>
          {currentCat.mandi ? (
            <View style={{alignItems: 'center'}}>
              <ScrollView horizontal={true} style={styles.subCatsContainer}>
                {currentMandiCatState.map((item) => (
                  <Button
                    key={item.id}
                    title={item.name}
                    type={item.selected ? 'outline' : 'clear'}
                    titleStyle={item.selected ? null : {color: 'grey'}}
                    buttonStyle={{...styles.subCatBtn}}
                    onPress={() => toggleMandiCatSelected(item.id)}
                  />
                ))}
              </ScrollView>
            </View>
          ) : null}
          <ScrollView
            contentContainerStyle={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'flex-start',
              paddingHorizontal: 5,
              justifyContent: 'space-between',
            }}
            style={styles.cardsContainer}>
            {currentItems.map((item) => (
              <Card
                // title={item.title}
                key={item.title + Math.random()}
                containerStyle={styles.cardContainer}
                dividerStyle={{display: 'none'}}
                titleStyle={{display: 'none'}}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 16, marginBottom: 8}}>
                      {item.title}
                    </Text>
                    <Icon
                      reverse
                      name="phone"
                      size={12}
                      color="#517fa4"
                      type="font-awesome-5"
                      onPress={toggleSendContactRequestOverlayVisible}
                    />
                  </View>
                  <Text style={{marginBottom: 8}}>{item.price} Rs.</Text>
                </View>
                <View>
                  <Image
                    style={{
                      borderRadius: 5,
                      width: 160,
                      height: 100,
                      marginLeft: -4,
                    }}
                    source={item.image}
                  />
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>
        <Overlay
          isVisible={sendContactRequestOverlayVisible}
          onBackdropPress={toggleSendContactRequestOverlayVisible}
          overlayStyle={{width: '90%', borderRadius: 10, padding: 15}}>
          <>
            <Text style={{fontSize: 24, marginVertical: 10}}>
              Contact Seller
            </Text>
            <Text style={{marginTop: 10, marginBottom: 20}}>
              Send contact request to seller. The seller will be notified and
              will contact you.
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Button
                type="outline"
                title="Cancel"
                containerStyle={{width: 100}}
                onPress={toggleSendContactRequestOverlayVisible}
              />
              <Button
                type="solid"
                title="Send"
                containerStyle={{width: 100}}
                onPress={showContactSentRequestOverlay}
              />
            </View>
          </>
        </Overlay>
        <Overlay
          isVisible={sentContactRequestOverlayVisible}
          onBackdropPress={toggleSentContactRequestOverlayVisible}
          overlayStyle={{width: '90%', borderRadius: 10, padding: 15}}>
          <>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="check"
                color="#56c125"
                type="font-awesome-5"
                size={24}
              />
              <Text style={{fontSize: 24, marginVertical: 10, marginLeft: 15}}>
                Request Sent
              </Text>
            </View>
            <Text style={{marginTop: 10, marginBottom: 20}}>
              Seller will contact you soon.
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                type="solid"
                title="OK"
                containerStyle={{width: 100}}
                onPress={toggleSentContactRequestOverlayVisible}
              />
            </View>
          </>
        </Overlay>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    marginVertical: 10,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    marginVertical: 10,
    marginHorizontal: 5,
    width: 100,
    borderRadius: 20,
    padding: 5,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    marginVertical: 10,
  },
  cardTitle: {
    textAlign: 'left',
  },
  cardContainer: {
    borderRadius: 10,
    width: '47%',
    marginHorizontal: 5,
    // flex:
  },
  catsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subCatsContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  subCatBtn: {
    marginHorizontal: 3,
  },
});

export default MarketPlaceScreen;
