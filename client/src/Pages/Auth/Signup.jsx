import React from 'react'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './Auth.scss'
import { toast } from 'react-toastify';
import { signup } from '../../redux/actions/userAction';

const validationSchema = yup.object({
  name: yup.string().min(2).max(30).required(),
  handle: yup.string().min(2).max(30).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(50).required()
});

const Signup = () => {
  const initialValues = { name: '', handle: '', email: '', password: '', image: '' }
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.user);

  const handleImage = (e, setFieldValue) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFieldValue('image', reader.result);
        }
      }
    }
  }

  const handleRemoveFile = (setFieldValue) => {
    setFieldValue('image', '');
  }

  const handleSubmit = async (data) => {
    const req = await dispatch(signup(data));

    if (req.message) {
      toast.success(req.message);
      dispatch({ type: 'clearMessage' });
    }
  }

  return (
    <div className="auth">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (<Form>
          <h1>Sign Up</h1>

          <div className="field-wrapper">
            <Field name='name' placeholder='Name' />
            <span className="error">
              <ErrorMessage name='name' />
              {error && String(error).startsWith('Name') && <span>{error}</span>}
            </span>
          </div>

          <div className="field-wrapper">
            <Field name='handle' placeholder='Handle' />
            <span className="error">
              <ErrorMessage name='Hanlde' />
              {error && String(error).startsWith('handle') && <span>{error}</span>}
            </span>
          </div>

          <div className="field-wrapper">
            <Field name='email' placeholder='Email' />
            <span className="error">
              <ErrorMessage name='email' />
              {error && String(error).startsWith('Email') && <span>{error}</span>}
            </span>
          </div>

          <div className="field-wrapper">
            <Field name='password' placeholder='Password' />
            <span className="error">
              <ErrorMessage name='password' />
              {error && String(error).startsWith('Password') && <span>{error}</span>}
            </span>
          </div>

          <div className="field-wrapper img">
            <input id='file-input' type='file' accept='imgae/*' onChange={e => handleImage(e, setFieldValue)} />
            <div className='btn-wrapper'>
              <label className='file-label' htmlFor='file-input' >Choose Avatar</label>
              {values.image && <button type='button' className='remove-btn' onClick={() => handleRemoveFile(setFieldValue)}>Remove file</button>}
            </div>
            {values.image && <img src={values.image} />}
          </div>

          <div className="field-wrapper">
            <button type='submit' disabled={loading ? true : false}>
              {loading ? <div className='loader'></div> : 'Sign Up'}
            </button>
            <p>Have an account? <Link to='/login'>Log In</Link></p>
          </div>
        </Form>)}
      </Formik>
    </div>
  )
}

export default Signup