import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlobalStyles } from '../constants';

import StyledSafeView from '../components/StyledSafeView';
import NavButton from '../components/NavButton';
import NavigationBar from '../components/NavigationBar';

export default function App({ route, navigation }) {
  const { theme } = useSelector((state) => state.theme);
  const { title } = route.params;
  const [initMapType, setInitMapType] = useState('standard');
  const [initLocation] = useState({
    latitude: -36.8477608,
    longitude: 174.7552365,
  });

  const onBack = () => {
    navigation.goBack();
  };

  const onMapTypeChange = () => {
    console.log(initMapType);
    if (initMapType === 'standard') {
      setInitMapType('satellite');
    } else {
      setInitMapType('standard');
    }
  };

  return (
    <StyledSafeView headColor={theme} head customSafeView>
      <NavigationBar
        title={title}
        titleLayoutStyle={title.length > 20 ? styles.titleLayout : {}}
        statusBar={{
          backgroundColor: theme,
          barStyle: 'light-content',
        }}
        style={{
          backgroundColor: theme,
        }}
        leftButton={
          <NavButton
            style={styles.leftButton}
            color="#fff"
            name="ios-arrow-back"
            onPress={onBack}
            size={24}
          />
        }
      />
      <TouchableOpacity onPress={onMapTypeChange} style={styles.changeType}>
        <FontAwesome5 name="satellite-dish" size={24} color={theme} />
      </TouchableOpacity>
      <MapView
        style={styles.map}
        maximumZ={19}
        mapType={initMapType}
        initialRegion={{
          ...initLocation,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={initLocation}
          title="Pushpay"
          description="An awesome place!"
        />
      </MapView>
    </StyledSafeView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: GlobalStyles.windowWidth,
    height: GlobalStyles.windowHeight,
  },
  leftButton: {
    marginLeft: 10,
  },
  changeType: {
    position: 'absolute',
    top: 100,
    zIndex: 2,
    left: GlobalStyles.windowWidth * 0.9,
    right: 0,
    bottom: 0,
  },
});
