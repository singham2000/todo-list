import './App.css';
import Addtodo from './components/add-todo';

function App() {
  return (
    <div className="App">
      <div className="panel">
        <h1 className="title">
          To-Do App
        </h1>
        <div className='todoadd'>
          <Addtodo />
        </div>
      </div>
    </div>
  );
}

export default App;
