import { Routes, Route } from 'react-router-dom';
import UsersPage from './components/UsersPage/UsersPage';
import UserInfo from './components/UserInfo/UserInfo';
import routes from './routes';

function App() {
  return (
    <Routes>
      <Route path={routes.defaultPath()} element={<UsersPage />} />
      <Route path={routes.userPath()} element={<UserInfo />} />
    </Routes>
  )
}

export default App;
