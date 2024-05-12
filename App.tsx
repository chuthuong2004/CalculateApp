import {TextNormalComponent, ToastMessageComponent} from '@components/shares';
import store from '@/store';
import React from 'react';
import {AppState, AppStateStatus, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {SWRConfig} from 'swr';
import {Navigation} from '@navigation';
import {useNetworkInternet} from '@hooks/systems';
import {COLORS_APP} from '@utils/constants';
import {hp} from '@utils/helpers';

function App(): React.JSX.Element {
  const isInternet = useNetworkInternet();
  console.log('isInternet: ', isInternet);

  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          provider: () => new Map(),
          isOnline() {
            console.log('isOnline');

            /* Customize the network state detector */
            return true;
          },
          isVisible() {
            console.log('isVisible');
            /* Customize the visibility state detector */
            return true;
          },
          initFocus(callback) {
            /* Register the listener with your state provider */
            let appState = AppState.currentState;
            console.log('app state: ' + appState);

            const onAppStateChange = (nextAppState: AppStateStatus) => {
              /* If it's resuming from background or inactive mode to active one */
              if (
                appState.match(/inactive|background/) &&
                nextAppState === 'active'
              ) {
                callback();
              }
              appState = nextAppState;
            };

            // Subscribe to the app state change events
            const subscription = AppState.addEventListener(
              'change',
              onAppStateChange,
            );

            return () => {
              subscription.remove();
            };
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          initReconnect(callback) {
            console.log('reconnect');

            /* Register the listener with your state provider */
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onError(error, key, config) {
            if (error.status !== 403 && error.status !== 404) {
              // We can send the error to Sentry,
              // or show a notification UI.
            }
          },
          onErrorRetry(error, key, config, revalidate, revalidateOpts) {
            // Never retry on 404.
            if (error.status === 404 && error.status === 403) {
              return;
            }

            // Never retry for a specific key.
            if (key === '/api/user') {
              return;
            }

            // Only retry up to 10 times.
            if (revalidateOpts.retryCount >= 2) {
              return;
            }

            // Retry after 5 seconds.
            setTimeout(
              () => revalidate({retryCount: revalidateOpts.retryCount}),
              5000,
            );
          },
          shouldRetryOnError: false,
        }}>
        <Navigation />
        {!isInternet && (
          <View style={styles.isInternet}>
            <TextNormalComponent align="center" variant="dark">
              Không có kết nối Internet
            </TextNormalComponent>
          </View>
        )}
        <ToastMessageComponent duration={2000} />
      </SWRConfig>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  isInternet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS_APP.danger,
    height: hp(6),
    justifyContent: 'center',
  },
});
