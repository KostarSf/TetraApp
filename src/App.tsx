import './App.css';
import Dashboard from './Dashboard';
import Header from './Header';
import Sidebar from './Sidebar';
import HelpButton from './HelpButton';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className='flex-grow-1 d-flex flex-column'>
        <Header />
        <main className='main flex-grow-1' style={{ backgroundColor: '#F5F5F5' }}>
          <div className='main__scroll'>
            <Dashboard />
          </div>
          <HelpButton />
        </main>
      </div>
    </div>
  );
}

export default App;
