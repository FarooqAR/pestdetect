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
};

type State = {};

class ChooseLangScreen extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const {navigation} = this.props;
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <SafeAreaView style={styles.container}>
          <View style={styles.body}>
            <View style={styles.header}>
              <Text style={styles.sectionTitle}>Choose your language</Text>
            </View>
            <View style={styles.btnsContainer}>
              <Button
                title="English"
                buttonStyle={styles.btn}
                onPress={() => navigation.navigate('ChooseCropScreen')}
              />
              <Button title="Urdu" buttonStyle={styles.btn} />
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

export default ChooseLangScreen;
