import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from './context/state'
import {initialState, reducer } from './context/reducer'
import Content from './components/Content';

function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
    <div className="App">
      <Router>
        <Content/>
      </Router>
    </div>
    </StateProvider>
  );
}

export default App;
