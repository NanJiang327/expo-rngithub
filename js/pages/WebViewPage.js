import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';

import NavButton from '../components/NavButton';
import NavigationBar from '../components/NavigationBar';
import StyledSafeView from '../components/StyledSafeView';

const WebViewPage = () => {
  const { theme } = useSelector((state) => state.theme);
  const navigation = useNavigation();
  const route = useRoute();
  const { title, initUrl } = route.params;

  const [canGoBack, setCanGoBack] = useState(false);
  const [url, setUrl] = useState(initUrl);
  const webViewRef = useRef(null);
  const pageLoaded = useRef(true);

  const onNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
    setUrl(navState.url);
  };

  const onBack = () => {
    if (canGoBack) {
      webViewRef.current.goBack();
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    pageLoaded.current = true;
    return () => {
      pageLoaded.current = false;
    };
  }, []);

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
      {pageLoaded.current && url ? (
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          startInLoadingState={true}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : null}
    </StyledSafeView>
  );
};

const styles = StyleSheet.create({
  rightButtonContainer: {
    paddingLeft: 30,
    flexDirection: 'row',
  },
  leftButton: {
    marginLeft: 10,
  },
  rightButton: {
    marginRight: 10,
  },
  titleLayout: {
    paddingRight: 35,
  },
});

export default WebViewPage;
