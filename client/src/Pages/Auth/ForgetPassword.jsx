import React from 'react'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './Auth.scss'
import { toast } from 'react-toastify';
import { forgetPassword } from '../../redux/actions/userAction';

const validationSchema = yup.object({
    email: yup.string().email().required()
});

const ForgetPassword = () => {
    const initialValues = { email: '' }
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.user);

    const handleSubmit = (data) => {
        dispatch(forgetPassword(data))
            .then(res => {
                if (res.type === 'forgetPasswordSuccess') {
                    toast.success(res.message);
                    dispatch({ type: 'clearMessage' });
                }
            })
    }

    return (
        <div className="auth">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <h1>Forgetten Password ?</h1>
                    <div className="field-wrapper">
                        <Field name='email' placeholder='Email' />
                        <span className="error">
                            <ErrorMessage name='email' />
                            {error && String(error).startsWith('User') && <span>{error}</span>}
                        </span>
                    </div>
                    <div className="field-wrapper">
                        <button type='submit' disabled={loading ? true : false}>
                            {loading ? <div className='loader'></div> : 'Send Email'}
                        </button>
                        <p>Back to login?<Link to='/login'>click here</Link></p>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default ForgetPassword