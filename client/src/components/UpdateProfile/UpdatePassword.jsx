import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import './UpdateProfile.scss'
import { loadUser, updatePassword } from '../../redux/actions/userAction';

const validationSchema = yup.object({
  oldPassword: yup.string().min(8).max(100).required(),
  newPassword: yup.string().min(8).max(100).required()
});

const UpdatePassword = ({ handleUpdatePassword }) => {
  const [initialValues, setInitialValues] = useState({ oldPassword: '', newPassword: '' });
  const { loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();


  const handleSubmit = (data) => {
    dispatch(updatePassword(data))
      .then(res => {
        if (res.type === 'updatePasswordSuccess') {
          toast.success(res.message);
          dispatch(loadUser());
          handleUpdatePassword();
        }
      })
  }

  return (
    <div className='update-user'>
      <div className="backdrop" onClick={handleUpdatePassword}></div>
      <div className="model">
        <div className='post-form'>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (<Form>
              <h1>Update Password</h1>

              <div className="field-wrapper">
                <Field type='password' name='oldPassword' placeholder='Old Password' />
                <span className="error">
                  <ErrorMessage name='oldPassword' />
                  {error && String(error).startsWith('password') && <span>{error}</span>}
                </span>
              </div>

              <div className="field-wrapper">
                <Field type='password' name='newPassword' placeholder='New Password' />
                <span className="error">
                  <ErrorMessage name='newPassword' />
                </span>
              </div>

              <div className="field-wrapper">
                <button className='submit-btn' type='submit' disabled={loading ? true : false}>
                  {loading ? <div className='loader'></div> : 'Update Profile'}
                </button>
              </div>
            </Form>)}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default UpdatePassword