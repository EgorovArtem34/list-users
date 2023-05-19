import React from 'react'
import './aside.scss';

const Aside: React.FC = () => {
  return (
    <div className="aside">
      <div className="aside__container">
        <p>Сортировка</p>
        <button type='button' className="btn" onClick={() => console.log('')}>
          по городу
        </button>
        <button type='button' className="btn" onClick={() => console.log('')}>
          по компании
        </button>
      </div>
    </div>
  )
}

export default Aside;

