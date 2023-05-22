import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hook';
import routes from '../../routes';
import './userInfo.scss';

const Form = () => {
  const { users, activeUser } = useAppSelector((state) => state.usersSlice);
  const [currentUser] = users.filter((user: { id: number; }) => user.id === activeUser.id);
  const signUpSchema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    street: yup.string().required(),
    city: yup.string().required(),
    zipcode: yup.string().required(),
    phone: yup.string().required(),
    website: yup.string().required(),
    comment: yup.string(),
  });
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
    validationSchema: signUpSchema,
    onSubmit: (changedUser) => {
      console.log(JSON.stringify(changedUser), changedUser);
      toast.success('Введеные вами значения выведены в консоль');
    },
  });

  if (!activeUser.id) {
    return <Navigate to={routes.defaultPath()} />;
  }
  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <fieldset disabled={activeUser.isReadOnly}>
        <label htmlFor="name">
          Name
          <br />
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={formik.errors.name && formik.touched.name ? 'form__input-error' : ''}
            required
          />
          {formik.errors.name && formik.touched.name && <p className="error">{formik.errors.name}</p>}
        </label>
        <br />
        <label htmlFor="username">
          Username
          <br />
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className={formik.errors.username && formik.touched.username ? 'form__input-error' : ''}
            required
          />
          {formik.errors.username && formik.touched.username && <p className="error">{formik.errors.username}</p>}
        </label>
        <br />
        <label htmlFor="email">
          Email
          <br />
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.errors.email && formik.touched.email ? 'form__input-error' : ''}
            required
          />
          {formik.errors.email && formik.touched.email && <p className="error">{formik.errors.email}</p>}
        </label>
        <br />
        <label htmlFor="street">
          Street
          <br />
          <input
            type="text"
            name="street"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.street}
            className={formik.errors.street && formik.touched.street ? 'form__input-error' : ''}
            required
          />
          {formik.errors.street && formik.touched.street && <p className="error">{formik.errors.street}</p>}
        </label>
        <br />
        <label htmlFor="city">
          City
          <br />
          <input
            type="text"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className={formik.errors.city && formik.touched.city ? 'form__input-error' : ''}
            required
          />
          {formik.errors.city && formik.touched.city && <p className="error">{formik.errors.city}</p>}
        </label>
        <br />
        <label htmlFor="zipcode">
          Zip code
          <br />
          <input
            type="text"
            name="zipcode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.zipcode}
            className={formik.errors.zipcode && formik.touched.zipcode ? 'form__input-error' : ''}
            required
          />
          {formik.errors.zipcode && formik.touched.zipcode && <p className="error">{formik.errors.zipcode}</p>}
        </label>
        <br />
        <label htmlFor="phone">
          Phone
          <br />
          <input
            type="text"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={formik.errors.phone && formik.touched.phone ? 'form__input-error' : ''}
            required
          />
          {formik.errors.phone && formik.touched.phone && <p className="error">{formik.errors.phone}</p>}
        </label>
        <br />
        <label htmlFor="website">
          Website
          <br />
          <input
            type="text"
            name="website"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.website}
            className={formik.errors.website && formik.touched.website ? 'form__input-error' : ''}
            required
          />
          {formik.errors.website && formik.touched.website && <p className="error">{formik.errors.website}</p>}
        </label>
        <br />
        <label htmlFor="comment">
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
          className="btn btn__submit"
          disabled={activeUser.isReadOnly}
        >
          Отправить
        </button>
      </div>
    </form>
  );
};
export default Form;
