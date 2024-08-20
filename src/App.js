import { NaverAPI } from './api/NaverAPI';
import './App.scss';
import NaverMap from './NaverMap/NaverMap';
import { Search } from './Sidebar/Search';

function App() {
  return (
    <div className='Main-container'>
      <Search />
      <NaverMap />
    </div>
  );
}

export default App;
