import { AppState } from 'react-native';
import { client } from '../db/client';

export const updateAuthState = () => {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      client.auth.startAutoRefresh();
    } else {
      client.auth.stopAutoRefresh();
    }
  });
}
