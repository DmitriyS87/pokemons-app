import React from 'react';
import './App.css';
import PokemonsBoard from './components/table/table'
import { Provider } from 'mobx-react';
import store from './stores/app-store';


class App extends React.Component {
  render() {
   const stores = {store};
    return (
      <Provider {...stores}>
      <div className="App">
        <PokemonsBoard />
      </div>
      </Provider>
    );
  }
}

export default App;
