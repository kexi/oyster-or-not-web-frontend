import './App.css';
import {FileInput} from './FileInput';

function App() {
  return (
    <div className="App">
      <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="" />
      <FileInput />
    </div>
  );
}

export default App;