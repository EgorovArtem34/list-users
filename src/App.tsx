import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsersPage from './components/UsersPage/UsersPage';
import UserInfo from './components/UserInfo/UserInfo';
import routes from './routes';

const App = () => (
  <>
    <Routes>
      <Route path={routes.defaultPath()} element={<UsersPage />} />
      <Route path={routes.userPath()} element={<UserInfo />} />
    </Routes>
    <ToastContainer />
  </>
);

export default App;
