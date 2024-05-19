import { View } from 'react-native';
import { updateAuthState } from '../src/utils/update-auth-state';
import { Slot } from 'expo-router';
import { Page } from '../src/components/page';

updateAuthState();

const RootLayout = () => (
  <Page>
    <Slot />
  </Page>
);

export default RootLayout;
