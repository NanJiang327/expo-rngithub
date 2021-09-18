import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Image,
  Clipboard,
} from 'react-native';
import { useSelector } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import Toast from 'react-native-easy-toast';
import * as MailComposer from 'expo-mail-composer';
import * as ImagePicker from 'expo-image-picker';

import CalendarModule from '../components/CalendarModule';
import MenuItem from '../components/MenuItem';
import NavButton from '../components/NavButton';

import { GlobalStyles } from '../constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 320;
const STICKY_HEADER_HEIGHT = Platform.OS === 'ios' ? 88 : 50;
const TOP = Platform.OS === 'ios' ? 20 : 0;

const AuthorPage = ({ navigation, route }) => {
  const { author, subMenu } = route.params;
  const { theme } = useSelector((state) => state.theme);
  const toastRef = useRef();
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      return result;
    }
  };

  const onPress = async (item) => {
    switch (item.name) {
      case 'Github':
        navigation.navigate('WebViewPage', {
          initUrl: 'https://github.com/NanJiang327',
          title: 'NanJiang327',
        });
        break;
      case 'Email me':
        await MailComposer.composeAsync({
          recipients: ['aaronj.9403@gmail.com'],
          body: 'Hi, I love the app that you made, I want to learn more about the app',
        });
        break;
      case 'Wechat':
        Clipboard.setString('13226510288');
        toastRef.current.show('Wechat Id copied', 1000);
        break;
      case 'Calendar Native Event Test':
        // ImagePickerModule.pickImage();
        CalendarModule.createCalendarEvent('testName', 'testLocation');
        // try {
        //   const eventId = await CalendarModule.createCalendarEvent(
        //     'Party',
        //     'My House'
        //   );
        //   console.log(`Created a new event with id ${eventId}`);
        // } catch (e) {
        //   console.error(e);
        // }
        // const { DEFAULT_EVENT_NAME } = CalendarModule.getConstants();
        // console.log(DEFAULT_EVENT_NAME);
        break;
      // case 'Change Icon':
      //   const iconResult = pickImage();
      //   AsyncStorage.setItem('authorIcon', JSON.parse(iconResult));
      //   break;
      // case 'Change Bacground':
      //   const backgroundResult = pickImage();
      //   AsyncStorage.setItem('authorBackground', JSON.parse(backgroundResult));
      //   break;
    }
  };

  return (
    <ParallaxScrollView
      backgroundColor={theme}
      contentBackgroundColor={GlobalStyles.bg_color}
      parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
      stickyHeaderHeight={STICKY_HEADER_HEIGHT}
      backgroundScrollSpeed={10}
      renderBackground={() => (
        <View key="background">
          <Image
            source={{
              uri:
                image ||
                'https://images.unsplash.com/photo-1631261178084-c9f7d50941c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
              width: window.width,
              height: PARALLAX_HEADER_HEIGHT,
            }}
          />
          <View style={styles.backgroudnImage} />
        </View>
      )}
      renderForeground={() => (
        <View key="parallax-header" style={styles.parallaxHeader}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                icon || 'https://avatars.githubusercontent.com/u/20848669?v=4',
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
            }}
          />
          <Text style={styles.sectionSpeakerText}>{author}</Text>
          <Text style={styles.sectionTitleText}>Developer at Pushpay</Text>
        </View>
      )}
      renderStickyHeader={() => (
        <View key="sticky-header" style={styles.stickySection}>
          <Text style={styles.stickySectionText}>{author}</Text>
        </View>
      )}
      renderFixedHeader={() => (
        <View key="fixed-header" style={styles.fixedSection}>
          <NavButton
            style={styles.leftButton}
            color="#fff"
            name="ios-arrow-back"
            onPress={() => navigation.goBack()}
            size={24}
          />
        </View>
      )}
    >
      {subMenu.map((menuItem, index) => (
        <MenuItem
          key={menuItem.name + index}
          onPress={onPress}
          menu={menuItem}
          theme={theme}
        />
      ))}
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: TOP,
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
  },
  fixedSection: {
    position: 'absolute',
    left: 10,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: TOP,
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20,
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5,
    marginBottom: 10,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
  },
});

export default AuthorPage;
