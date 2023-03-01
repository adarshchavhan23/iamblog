import React from 'react'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './Auth.scss'
import { toast } from 'react-toastify';
import { login } from '../../redux/actions/userAction';

const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(50).required()
});

const Login = () => {
    const initialValues = { email: '', password: '' }
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.user);

    const handleSubmit = async (data) => {
        const req = await dispatch(login(data));

        if (req.message) {
            toast.success(req.message);
            dispatch({ type: 'clearMessage' });
        }
    }

    return (
        <div className="auth">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <h1>Log In</h1>
                    <div className="field-wrapper">
                        <Field name='email' placeholder='Email' />
                        <span className="error">
                            <ErrorMessage name='email' />
                            {error && String(error).startsWith('User') && <span>{error}</span>}
                        </span>
                    </div>
                    <div className="field-wrapper">
                        <Field name='password' placeholder='Password' />
                        <span className="error">
                            <ErrorMessage name='password' />
                            {error && String(error).startsWith('Password') && <span>{error}</span>}
                        </span>
                    </div>
                    <div className="field-wrapper">
                        <p>Forggoten Password? <Link to='/password/forget'>click here</Link></p>
                        <button type='submit' disabled={loading ? true : false}>
                            {loading ? <div className='loader'></div> : 'Log In'}
                        </button>
                        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Login