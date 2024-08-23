import './App.scss';
import KakaoMap from './KakaoMap/KakaoMap';
import { Search } from './Sidebar/Search';



function App() {
  return (
    <div className='Main-container'>
      <Search />
      <KakaoMap />
    </div>
  );
}

export default App;
