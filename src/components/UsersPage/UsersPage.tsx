import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchUsers, setActiveUser } from '../../store/usersSlice';
import './userPage.scss';
import Aside from '../Aside/Aside';

function Content() {
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.usersSlice);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])

  if (isLoading) {
    console.log('LOADING');
  }

  return (
    <>
      <Aside />
      <div className="container">
        <div className="container__header">
          <h3 className="container__title">Список пользователей</h3>
        </div>
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <div className="user-card__container">
              <p>
                <span>ФИО: </span>
                {user.name}
              </p>
              <p>
                <span>город: </span>
                {user.address.city}
              </p>
              <div className="user-card__last-line">
                <p>
                  <span>компания: </span>
                  {user.company.name}
                </p>
                <NavLink
                  onClick={() => dispatch(setActiveUser(user.id))}
                  to={`user/${user.id}`}
                >
                  Подробнее
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Content;

