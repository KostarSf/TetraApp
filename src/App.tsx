import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HelpButton from './components/helpbutton/HelpButton';
import { useState } from 'react';
import TaskScreen from './components/taskscreen/TaskScreen';

function App() {
  const [screen, setScreen] = useState(localStorage.getItem('screen'));

  return (
    <div className="App">
      <Sidebar />
      <div className='flex-grow-1 d-flex flex-column'>
        <Header />
        <main className='main flex-grow-1' style={{ backgroundColor: '#F5F5F5' }}>
          <div className='main__scroll'>
            {(screen !== 'task')
              ?
              <Dashboard onScreenChange={setScreen}/>
              :
              <TaskScreen onScreenChange={setScreen} />
            }
          </div>
          <HelpButton />
        </main>
      </div>
    </div>
  );
}

export default App;
