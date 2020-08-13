/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  Animated,
  GestureResponderEvent,
} from 'react-native';
import {Icon, Overlay, Divider, Button} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import ImageConfirm from './ImageConfirm';

type Props = {
  navigation: any;
  route: any;
};

const DetectPestScreen = (props: Props) => {
  let camera: RNCamera | null;
  const {navigation, route} = props;
  const {selectedCrop} = route.params;
  const [cameraReady, setCameraReady] = useState(false);
  const [snapBtnVisible, setSnapBtnVisible] = useState(false);
  const [imageConfirmVisible, setImageConfirmVisible] = useState(false);
  const [currentImageUri, setCurrentImageUri] = useState<string | undefined>(
    undefined,
  );
  const onCameraReady = () => {
    setCameraReady(true);
    setSnapBtnVisible(true);
  };

  const takePicture = async () => {
    const pic = await camera?.takePictureAsync();
    setImageConfirmVisible(true);
    setCurrentImageUri(pic?.uri);
  };

  const onImageConfirmed = () => {
    setImageConfirmVisible(false);
  };

  const onImageCancelled = () => {
    setImageConfirmVisible(false);
    setCurrentImageUri(undefined);
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.5)"
      />
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.header}>
            <Icon
              reverse={true}
              name="arrow-left"
              type="font-awesome-5"
              color="transparent"
              containerStyle={styles.iconBack}
              onPress={() => navigation.goBack()}
            />

            <Text style={styles.title}>Take a picture of your crop!</Text>
          </View> */}
        {!imageConfirmVisible && (
          <RNCamera
            ref={(ref) => {
              camera = ref;
            }}
            style={styles.preview}
            autoFocus="on"
            type={RNCamera.Constants.Type.back}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            captureAudio={false}
            onCameraReady={onCameraReady}
          />
        )}
        {!imageConfirmVisible && (
          <View style={styles.footer}>
            {/* <Icon
              reverse={true}
              name="flash"
              type="font-awesome"
              color="transparent"
              size={30}
              onPress={() => console.log('flash')}
            /> */}
            <Icon
              reverse={true}
              name="camera"
              type="font-awesome"
              size={40}
              color="rgba(0, 0, 0, 0.5)"
              containerStyle={{opacity: snapBtnVisible ? 1 : 0}}
              onPress={takePicture}
            />
            {/* <Icon
              reverse={true}
              name="flash"
              type="font-awesome"
              color="rgba(0, 0, 0, 0)"
              style={{opacity: 0}}
              size={30}
            /> */}
          </View>
        )}
        {imageConfirmVisible && currentImageUri && (
          <ImageConfirm
            uri={currentImageUri}
            imageCount={0}
            onConfirm={onImageConfirmed}
            onCancel={onImageCancelled}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: Colors.white,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconBack: {
    backgroundColor: 'transparent',
  },
  plantHighlighter: {
    position: 'absolute',
    width: 80,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    left: '50%',
    marginLeft: -40,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: 10,
    width: 100,
    borderRadius: 20,
  },
});

export default DetectPestScreen;
