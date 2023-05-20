import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hook';
import routes from '../../routes';
import './userInfo.scss';

const Form = () => {
  const { users, activeUser } = useAppSelector((state) => state.usersSlice);
  const [currentUser] = users.filter((user) => user.id === activeUser.id);
  const formik = useFormik({
    initialValues: {
      name: currentUser?.name,
      username: currentUser?.username,
      email: currentUser?.email,
      street: currentUser?.address.street,
      city: currentUser?.address.city,
      zipcode: currentUser?.address.zipcode,
      phone: currentUser?.phone,
      website: currentUser?.website,
      comment: '',
    },
    onSubmit: (changedUser) => {
      console.log(JSON.stringify(changedUser), changedUser);
      alert('Введеные вами значения выведены в консоль');
    }
  })

  if (!activeUser.id) {
    return <Navigate to={routes.defaultPath()} />
  }
  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <fieldset disabled={activeUser.isReadOnly}>
        <label>
          Name
          <br />
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />
        </label>
        <br />
        <label>
          Username
          <br />
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            required
          />
        </label>
        <br />
        <label>
          Email
          <br />
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
        </label>
        <br />
        <label>
          Street
          <br />
          <input
            type="text"
            name="street"
            onChange={formik.handleChange}
            value={formik.values.street}
            required
          />
        </label>
        <br />
        <label>
          City
          <br />
          <input
            type="text"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            required
          />
        </label>
        <br />
        <label>
          Zip code
          <br />
          <input
            type="text"
            name="zipcode"
            onChange={formik.handleChange}
            value={formik.values.zipcode}
            required
          />
        </label>
        <br />
        <label>
          Phone
          <br />
          <input
            type="text"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            required
          />
        </label>
        <br />
        <label>
          Website
          <br />
          <input
            type="text"
            name="website"
            onChange={formik.handleChange}
            value={formik.values.website}
            required
          />
        </label>
        <br />
        <label>
          Comment
          <br />
          <textarea
            name="comment"
            id="comment"
            rows={7}
            value={formik.values.comment}
            onChange={formik.handleChange}
          />
        </label>
      </fieldset>
      <div className="form__button-wrap">
        <button
          type="submit"
          className="btn"
          disabled={activeUser.isReadOnly}
        >
          Отправить
        </button>
      </div>
    </form>
  )
};
export default Form;
