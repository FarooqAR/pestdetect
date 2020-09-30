/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChooseLangScreen from './components/ChooseLangScreen';
import ChooseCropScreen from './components/ChooseCropScreen';
import DetectPestScreen from './components/DetectPestScreen';
import SurveyPestScreen from './components/SurveyPestScreen';
import MarketPlaceScreen from './components/MarketPlaceScreen';
import SurveyResultScreen from './components/SurveyResultScreen';

const Stack = createStackNavigator();

class App extends PureComponent {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="ChooseLangScreen" component={ChooseLangScreen} />
          <Stack.Screen name="ChooseCropScreen" component={ChooseCropScreen} />
          <Stack.Screen name="DetectPestScreen" component={DetectPestScreen} />
          <Stack.Screen name="SurveyPestScreen" component={SurveyPestScreen} />
          <Stack.Screen
            name="SurveyResultScreen"
            component={SurveyResultScreen}
          />
          <Stack.Screen
            name="MarketPlaceScreen"
            component={MarketPlaceScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
