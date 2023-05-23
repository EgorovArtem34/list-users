import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchUsers, setActiveUser } from '../../store/usersSlice';
import './userPage.scss';
import Aside from '../Aside/Aside';

const Content = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.usersSlice);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <>
      <Aside />
      <div className="container">
        <div className="container__header">
          <h3 className="container__title">Список пользователей</h3>
        </div>
        {isLoading && <p>Loading...</p>}
        <div className="container__users users">
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
          {!isLoading && (
            <p className="users__text">
              Найдено
              {' '}
              {users.length}
              {' '}
              пользователей
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
