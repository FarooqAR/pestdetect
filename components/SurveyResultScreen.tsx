/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {PureComponent} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

import {Button} from 'react-native-elements';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type Props = {
  navigation: any;
  route: any;
};

type State = {};

class SurveyResultScreen extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const {navigation, route} = this.props;
    const {images} = route.params;
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <SafeAreaView style={styles.container}>
          <View style={styles.body}>
            <View style={styles.header}>
              <Text style={styles.sectionTitle}>Survey Results</Text>
            </View>
            <View style={{padding: 20}}>
              <Text>
                You took {images.length} image{images.length > 1 ? 's' : ''} in
                1 mile of area. Here is what you need to do:
              </Text>
              <Text>Add Urea (2 Kg)</Text>
              <Text>Add Armada</Text>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: Colors.white,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 150,
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
    fontSize: 30,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
});

export default SurveyResultScreen;
