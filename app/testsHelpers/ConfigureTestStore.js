import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';

export default function ConfigureTestStore() {
  const confuguredStore = configureStore({}, memoryHistory);
  this.store = confuguredStore.store;
  this.presistor = confuguredStore.presistor;
}
