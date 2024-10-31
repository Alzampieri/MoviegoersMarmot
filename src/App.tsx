import { PersistGate } from "redux-persist/integration/react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams
} from 'react-router-dom';

import { persistor } from './configs/store';

import Home from '@features/home/Home.js'
import WatchablePage from '@features/watchablepage/WatchablePage';
import Menu from '@features/menu/Menu';
import TopBar from '@features/topBar/TopBar';
import PeoplePage from '@features/people/PeoplePage';
import DetailPage from "@features/detailpage/DetailPage";

import './App.less'

const WatchablePageWrapper = () => {
  const { category } = useParams();
  return <WatchablePage key={category} />
}

function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Menu/>
        <TopBar/>
        <div id='main'>
          <Routes>
            <Route path='home' element={<Home />} />
            <Route path='category/people' element={<PeoplePage />} />
            <Route path='category/:category' element={<WatchablePageWrapper /> } />
            <Route path=':watchableType/:watchableId' element={<DetailPage />} />
            <Route path='' element={<Navigate to='home'/>} />
            <Route path='*' element={<Navigate to='home'/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </PersistGate>
  )
}

export default App
