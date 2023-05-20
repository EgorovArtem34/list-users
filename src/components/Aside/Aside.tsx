import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { AiOutlineHome, } from 'react-icons/ai';
import { useAppDispatch } from '../../hook';
import routes from '../../routes';
import { fetchUsers, setEmptyUsers, sortByCity, sortByCompany, unsetActiveUser } from '../../store/usersSlice';
import './aside.scss';

const Aside: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [activeBtn, setActiveBtn] = useState<string | null>(null);
  useEffect(() => {
    setActiveBtn(null);
  }, [location])

  const handleClickLink = () => {
    dispatch(unsetActiveUser());
    dispatch(setEmptyUsers());
    dispatch(fetchUsers());
  }

  const handleClickBtn = (sortedType: string) => {
    setActiveBtn(sortedType);
    switch (sortedType) {
      case 'city':
        dispatch(sortByCity());
        break;
      case 'company':
        dispatch(sortByCompany());
        break;
      default:
        throw new Error('unexpected sorted type');
    }
  };

  const btnClass = (btn: string) => cn('btn', {
    active: activeBtn === btn,
  });

  return (
    <div className="aside">
      <div className="aside__container">
        <Link
          onClick={() => handleClickLink()}
          to={routes.defaultPath()}
        >
          <AiOutlineHome className="aside_icon" />
        </Link>
        <p>Сортировка</p>
        <button type='button' className={btnClass('city')} onClick={() => handleClickBtn('city')}>
          по городу
        </button>
        <button type='button' className={btnClass('company')} onClick={() => handleClickBtn('company')}>
          по компании
        </button>
      </div>
    </div>
  )
}

export default Aside;

