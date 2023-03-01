import React from 'react'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './Auth.scss'
import { toast } from 'react-toastify';
import { resetPassword } from '../../redux/actions/userAction';

const validationSchema = yup.object({
    password: yup.string().min(8).max(50).required()
});

const ResetPassword = () => {
    const initialValues = { password: '' }
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.user);

    const params = useParams();
    const naviagte = useNavigate();

    const handleSubmit = (data) => {
        dispatch(resetPassword(data, params.token))
            .then(res => {
                if (res.type === 'resetPasswordSuccess') {
                    toast.success(res.message);
                    dispatch({ type: 'clearMessage' });
                    naviagte('/login');
                } else {
                    toast.error(res.error);
                    naviagte('/password/forget');
                }
            })
    }



    return (
        <div className="auth">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <h1>Reset Password</h1>
                    <div className="field-wrapper">
                        <Field type='password' name='password' placeholder='New Password' />
                        <span className="error">
                            <ErrorMessage name='password' />
                            {error && String(error).startsWith('Password') && <span>{error}</span>}
                        </span>
                    </div>
                    <div className="field-wrapper">
                        <button type='submit' disabled={loading ? true : false}>
                            {loading ? <div className='loader'></div> : 'Reset Password'}
                        </button>
                        <p>Back to login?<Link to='/login'>click here</Link></p>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default ResetPassword