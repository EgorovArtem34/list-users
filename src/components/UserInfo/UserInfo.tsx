import { useAppDispatch, useAppSelector } from '../../hook';
import { toggleReadOnly } from '../../store/usersSlice';
import Aside from '../Aside/Aside';
import Form from './Form';

const UserInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeUser: { isReadOnly } } = useAppSelector((state) => state.usersSlice);

  return (
    <>
      <Aside />
      <div className="container">
        <div className="container__header">
          <h3 className="container__title">Профиль пользователя</h3>
          <button
            type="button"
            className="btn"
            onClick={() => dispatch(toggleReadOnly(!isReadOnly))}
          >
            Редактировать
          </button>
        </div>
        <Form />
      </div>
    </>
  );
};
export default UserInfo;
