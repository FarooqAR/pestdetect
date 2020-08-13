import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  GestureResponderEvent,
  Text,
  ScrollView,
} from 'react-native';
import {Icon, Overlay, Divider, ListItem, Button} from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type Props = {
  uri: string;
  onConfirm: (event: GestureResponderEvent) => void;
  onCancel: (event: GestureResponderEvent) => void;
  imageCount: number;
};

const positions = ['Top', 'Middle', 'Bottom'];

const ImageConfirm = (props: Props) => {
  const {uri, imageCount, onConfirm, onCancel} = props;
  const [overlayVisible, setOverlayVisible] = useState(false);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 100,
            width: '100%',
            alignItems: 'center',
            zIndex: 999,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderRadius: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                borderWidth: 3,
                borderColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
                {(imageCount % 3) + 1}
              </Text>
            </View>
            <Text style={{fontSize: 24, color: 'white', marginLeft: 20}}>
              {positions[imageCount % 3]} Image
            </Text>
          </View>
        </View>
        <Image style={{flex: 1}} source={{uri}} />
        <View style={styles.actionFooter}>
          <Icon
            name="times"
            color="red"
            size={30}
            type="font-awesome-5"
            reverse={true}
            raised={true}
            onPress={onCancel}
          />
          <Icon
            name="check"
            type="font-awesome-5"
            color="green"
            size={30}
            reverse={true}
            raised={true}
            onPress={() => setOverlayVisible(true)}
          />
        </View>
        <Overlay isVisible={overlayVisible} overlayStyle={{width: '90%', borderRadius: 10}} onBackdropPress={() => setOverlayVisible(false)}>
          <>
            <Text style={{marginVertical: 10, textAlign: 'center', fontSize: 20}}>Detected Pests</Text>
            <Divider />
            <ScrollView style={{maxHeight: 200}}>
              <ListItem
                title="Pest 1"
                titleStyle={{fontWeight: 'bold'}}
                leftIcon={<Icon name="bug" type="font-awesome-5" />}
                rightIcon={
                  <Icon
                    name="plus"
                    size={16}
                    type="font-awesome-5"
                    reverse={true}
                    color={Colors.dark}
                    raised={true}
                  />
                }
              />
              <ListItem
                title="Pest 2"
                titleStyle={{fontWeight: 'bold'}}
                leftIcon={<Icon name="bug" type="font-awesome-5" />}
                rightIcon={
                  <Icon
                    name="plus"
                    size={16}
                    type="font-awesome-5"
                    reverse={true}
                    color={Colors.dark}
                    raised={true}
                  />
                }
              />
              <ListItem
                title="Pest 3"
                titleStyle={{fontWeight: 'bold'}}
                leftIcon={<Icon name="bug" type="font-awesome-5" />}
                rightIcon={
                  <Icon
                    name="plus"
                    size={16}
                    type="font-awesome-5"
                    reverse={true}
                    color={Colors.dark}
                    raised={true}
                  />
                }
              />
            </ScrollView>
            <View style={{alignItems: 'center'}}>
              <Button
                title="Done"
                buttonStyle={styles.btn}
                onPress={onConfirm}
              />
            </View>
          </>
        </Overlay>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  actionFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    margin: 10,
    width: 100,
    borderRadius: 20,
  },
});

export default ImageConfirm;
