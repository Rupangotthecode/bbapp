import { Provider } from 'react-redux';
import store from './Store';
import Routes from './Routes';
import { Text } from 'react-native-paper';

export default function App() {

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
