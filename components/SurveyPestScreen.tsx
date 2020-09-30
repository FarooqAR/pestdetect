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
  ToastAndroid,
} from 'react-native';
import {Icon, Overlay, Button, Divider} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ImageConfirm from './ImageConfirm';

type Props = {
  navigation: any;
  route: any;
};

const SurveyPestScreen = (props: Props) => {
  let camera: RNCamera | null;
  const {navigation, route} = props;
  const {selectedCrop} = route.params;
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayShown, setOverlayShown] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [snapBtnVisible, setSnapBtnVisible] = useState(false);
  const [imageConfirmVisible, setImageConfirmVisible] = useState(false);
  const [nextViewVisible, setNextViewVisible] = useState(false);
  const [surveyEndOverlayVisible, setSurveyEndOverlayVisible] = useState(false);
  const [
    surveyDiscardOverlayVisible,
    setSurveyDiscardOverlayVisible,
  ] = useState(false);
  const [images, addImage] = useState<string[]>([]);
  const [currentImageUri, setCurrentImageUri] = useState<string | undefined>(
    undefined,
  );

  const translateYanim = useRef(new Animated.Value(0)).current;
  let animation: Animated.CompositeAnimation;
  const animateHighlighter = () => {
    if (cameraReady) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(translateYanim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(translateYanim, {
            toValue: 35,
            duration: 150,
            delay: 900,
            useNativeDriver: true,
          }),
          Animated.timing(translateYanim, {
            toValue: 70,
            duration: 150,
            delay: 900,
            useNativeDriver: true,
          }),
          Animated.timing(translateYanim, {
            toValue: 70,
            duration: 150,
            delay: 900,
            useNativeDriver: true,
          }),
        ]),
      );
    }
  };

  useEffect(animateHighlighter, [translateYanim, cameraReady]);

  const onCameraReady = () => {
    if (!overlayShown) {
      setOverlayVisible(true);
    }
    setCameraReady(true);
  };

  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Take picture at another spot',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  };

  const hideOverlay = () => {
    setOverlayVisible(false);
    setSnapBtnVisible(true);
    setOverlayShown(true);
  };

  const takePicture = async () => {
    const pic = await camera?.takePictureAsync();
    setImageConfirmVisible(true);
    setCurrentImageUri(pic?.uri);
  };

  const onImageConfirmed = () => {
    setImageConfirmVisible(false);
    showToast();
    if (currentImageUri) {
      addImage((prevImages) => [...prevImages, currentImageUri]);
    }
  };

  const onImageCancelled = () => {
    setImageConfirmVisible(false);
    setCurrentImageUri(undefined);
  };

  const showNextView = () => {
    setNextViewVisible(true);
    animation.start();
  };

  const toggleSurveEndOverlay = () => {
    setSurveyEndOverlayVisible(!surveyEndOverlayVisible);
  };

  const toggleSurveDiscardOverlay = () => {
    setSurveyDiscardOverlayVisible(!surveyDiscardOverlayVisible);
  };

  const finishSurvey = () => {
    toggleSurveEndOverlay();
    navigation.navigate('SurveyResultScreen', {
      images,
    });
  };

  const discardSurvey = () => {
    toggleSurveDiscardOverlay();
    addImage([]);
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
          <>
            <View style={styles.footer}>
              <Icon
                reverse={true}
                name="check"
                type="font-awesome-5"
                containerStyle={{opacity: images.length > 0 ? 1 : 0}}
                color="green"
                size={30}
                onPress={toggleSurveEndOverlay}
              />
              <Icon
                reverse={true}
                name="camera"
                type="font-awesome-5"
                size={40}
                color="rgba(0, 0, 0, 0.5)"
                containerStyle={{opacity: snapBtnVisible ? 1 : 0}}
                onPress={takePicture}
              />
              <Icon
                reverse={true}
                name="times"
                type="font-awesome-5"
                color="#df0000"
                containerStyle={{opacity: images.length > 0 ? 1 : 0}}
                size={30}
                onPress={toggleSurveDiscardOverlay}
              />
            </View>
          </>
        )}
        <Overlay
          isVisible={surveyEndOverlayVisible}
          onBackdropPress={toggleSurveEndOverlay}
          overlayStyle={{width: '90%', borderRadius: 10, padding: 15}}>
          <>
            <Text style={{fontSize: 24, marginVertical: 10}}>
              Finish Survey?
            </Text>
            <Text style={{marginTop: 10, marginBottom: 20}}>
              Are you sure you want to end this survey and go to the
              <Text style={{fontWeight: 'bold'}}>results</Text>?
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Button
                type="outline"
                title="No"
                onPress={toggleSurveEndOverlay}
                containerStyle={{width: 100}}
              />
              <Button
                type="solid"
                title="Yes"
                containerStyle={{width: 100}}
                onPress={finishSurvey}
              />
            </View>
          </>
        </Overlay>
        <Overlay
          isVisible={surveyDiscardOverlayVisible}
          onBackdropPress={toggleSurveDiscardOverlay}
          overlayStyle={{width: '90%', borderRadius: 10,padding: 15}}>
          <>
            <Text style={{fontSize: 24, marginVertical: 10}}>
              Discard Survey?
            </Text>
            <Text style={{marginTop: 10, marginBottom: 20}}>
              Are you sure you want to end this survey and{' '}
              <Text style={{fontWeight: 'bold'}}>discard</Text> the results?
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Button
                type="outline"
                title="No"
                containerStyle={{width: 100}}
                onPress={toggleSurveDiscardOverlay}
              />
              <Button
                type="solid"
                title="Yes"
                containerStyle={{width: 100}}
                onPress={discardSurvey}
              />
            </View>
          </>
        </Overlay>
        <Overlay
          isVisible={!overlayShown && overlayVisible}
          overlayStyle={{width: '90%', borderRadius: 10}}>
          <>
            {!nextViewVisible ? (
              <View>
                <View>
                  <Icon
                    name="draw-polygon"
                    size={70}
                    color="gray"
                    type="font-awesome-5"
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    marginVertical: 10,
                  }}>
                  Take pictures at few locations in your field and find out the
                  best plan.
                </Text>
                <View style={{alignItems: 'center'}}>
                  <Button
                    title="Next"
                    buttonStyle={styles.btn}
                    onPress={showNextView}
                  />
                </View>
              </View>
            ) : (
              <Animated.View>
                <View>
                  <Animated.View
                    style={{
                      ...styles.plantHighlighter,
                      transform: [{translateY: translateYanim}],
                    }}
                  />
                  <Icon
                    name="pagelines"
                    size={100}
                    color="green"
                    type="font-awesome-5"
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    marginVertical: 10,
                  }}>
                  Take pictures of your plant from top, middle and bottom.
                </Text>
                <View style={{alignItems: 'center'}}>
                  <Button
                    title="OK"
                    buttonStyle={styles.btn}
                    onPress={hideOverlay}
                  />
                </View>
              </Animated.View>
            )}
          </>
        </Overlay>
        {imageConfirmVisible && currentImageUri && (
          <ImageConfirm
            uri={currentImageUri}
            imageCount={images.length}
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

export default SurveyPestScreen;
