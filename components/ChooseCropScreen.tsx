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
import {Card, Overlay, ListItem, Divider, Icon} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {Calendar} from 'react-native-calendars';

type Props = {
  navigation: any;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const crops = [
  {
    name: 'cotton',
    source: require('../assets/cotton.png'),
  },
  {
    name: 'wheat',
    source: require('../assets/wheat.png'),
  },
  {
    name: 'sugar-cane',
    source: require('../assets/sugar-cane.png'),
  },
  {
    name: 'bananas',
    source: require('../assets/bananas.png'),
  },
  {
    name: 'apple',
    source: require('../assets/apple.png'),
  },
];

const ChooseCropScreen = (props: Props) => {
  const {navigation} = props;
  const [visible, setVisible] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={visible ? 'rgba(0,0,0,0.5)' : 'white'}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.sectionTitle}>xYz</Text>
          </View>
          <ScrollView horizontal={true} style={styles.cropsContainer}>
            {crops.map((crop) => (
              <View style={styles.crop} key={crop.name}>
                <TouchableNativeFeedback
                  useForeground={true}
                  onPress={() => {
                    setSelectedCrop(crop.name);
                    toggleOverlay();
                  }}>
                  <Image style={styles.cropImage} source={crop.source} />
                </TouchableNativeFeedback>
              </View>
            ))}
          </ScrollView>
          <ScrollView style={styles.cardsContainer}>
            <Card
              title={'Agri Calender'}
              containerStyle={styles.cardContainer}
              titleStyle={styles.cardTitle}>
              <Calendar
                // Initially visible month. Default = Date()
                // current={'2012-03-01'}l;
                // selected={7}
                // enableSwipeMonths={true}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                // minDate={new Date(
                //   Date.now() - 3 * 30 * 24 * 60 * 60 * 1000,
                // ).toString()}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                // maxDate={new Date(
                //   Date.now() + 3 * 30 * 24 * 60 * 60 * 1000,
                // ).toString()}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day: any) => {
                  console.log('selected day', day);
                }}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day: any) => {
                  console.log('selected day', day);
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month: any) => {
                  console.log('month changed', month);
                }}
                // pagingEnabled={true}
                // Hide month navigation arrows. Default = false
                // hideArrows={true}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                // renderArrow={(direction) => <Arrow />}
                // Do not show days of other months in month page. Default = false
                // hideExtraDays={true}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                // disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                // Hide day names. Default = false
                hideDayNames={true}
                horizontal={true}
                scrollEnabled={true}
                // Show week numbers to the left. Default = false
                // showWeekNumbers={true}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                // onPressArrowLeft={(subtractMonth) => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                // onPressArrowRight={(addMonth) => addMonth()}
                // Disable left arrow. Default = false
                // disableArrowLeft={true}
                // Disable right arrow. Default = false
                // disableArrowRight={true}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                // disableAllTouchEventsForDisabledDays={true}
                /** Replace default month and year title with custom one. the function receive a date as parameter. */
                renderHeader={(date: Date) => {
                  return (
                    <Text>
                      {months[date.getMonth()]} {date.getFullYear()}
                    </Text>
                  );
                }}
              />
            </Card>
            <Card
              title={'Track Locust'}
              containerStyle={styles.cardContainer}
              titleStyle={styles.cardTitle}>
              <Text>Hello World</Text>
            </Card>
            <Card
              title={'News'}
              containerStyle={styles.cardContainer}
              titleStyle={styles.cardTitle}>
              <Text>Hello World</Text>
            </Card>
            <Card
              title={'Card 1'}
              containerStyle={styles.cardContainer}
              titleStyle={styles.cardTitle}>
              <Text>Hello World</Text>
            </Card>
            <Card
              title={'Card 2'}
              containerStyle={{...styles.cardContainer, marginBottom: 20}}
              titleStyle={styles.cardTitle}>
              <Text>Hello World</Text>
            </Card>
          </ScrollView>
        </View>
        <Overlay
          isVisible={visible}
          overlayStyle={{width: '90%', borderRadius: 10}}
          onBackdropPress={toggleOverlay}>
          <>
            <Text
              style={{textAlign: 'center', fontSize: 18, marginVertical: 10}}>
              What do you want to do?
            </Text>
            <Divider style={{marginVertical: 10}}/>
            <TouchableNativeFeedback>
              <ListItem
                title="Detect pest"
                titleStyle={{fontWeight: 'bold'}}
                leftIcon={<Icon name="leaf" type="font-awesome-5" />}
                subtitle="Find out pest info on a single plant"
                onPress={() => {
                  toggleOverlay();
                  navigation.navigate('DetectPestScreen', {selectedCrop});
                }}
              />
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <ListItem
                title="Do a survey"
                titleStyle={{fontWeight: 'bold'}}
                leftIcon={<Icon name="map" type="font-awesome-5" />}
                subtitle="Find out pest info on your whole field"
                onPress={() => {
                  toggleOverlay();
                  navigation.navigate('SurveyPestScreen', {selectedCrop});
                }}
              />
            </TouchableNativeFeedback>
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
    margin: 10,
    width: 100,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  cropsContainer: {
    flexWrap: 'wrap',
    maxHeight: 127,
  },
  crop: {
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 6,
    marginVertical: 20,
    overflow: 'hidden',
  },
  cropImage: {
    width: 75,
    height: 75,
    margin: 6,
  },
  cardsContainer: {
    flex: 1,
  },
  cardTitle: {
    textAlign: 'left',
  },
  cardContainer: {
    borderRadius: 10,
  },
});

export default ChooseCropScreen;
