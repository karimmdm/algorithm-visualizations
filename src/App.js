import './App.css';
import 'rsuite/dist/styles/rsuite-default.css';
import AstarSketch from './components/astar/astarSketch';
import { useEffect } from 'react';

function App() {
  useEffect(() => {document.body.style.backgroundColor = "#f8f5f1"}, [])

  return (
    <div className="App">
      <AstarSketch/>
    </div>
  );
}

export default App;
