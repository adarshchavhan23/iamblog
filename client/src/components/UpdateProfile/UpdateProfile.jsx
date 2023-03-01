import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import './UpdateProfile.scss'
import { loadUser, updateProfile } from '../../redux/actions/userAction';

const validationSchema = yup.object({
    name: yup.string().min(2).max(30).required(),
    handle: yup.string().min(2).max(30).required(),
    email: yup.string().email().required(),
});

const UpdateProfile = ({ user, handleUpdateProfile }) => {
    const [initialValues, setInitialValues] = useState({ name: '', handle: '', email: '', image: '' });
    const { loading, error } = useSelector(state => state.user);
    const dispatch = useDispatch();

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
        setFieldValue('image', '')
    }

    const handleSubmit = (data) => {
        dispatch(updateProfile(data))
        .then(res => {
            if(res.type === 'updateProfileSuccess'){
                toast.success(res.message);
                dispatch(loadUser());
                handleUpdateProfile();
            }
        })
    }

    useEffect(() => {
        setInitialValues({
            name: user.name,
            handle: user.handle,
            email: user.email,
            image: user.img && user.img.url
        })
    }, [])

    return (
        <div className='update-user'>
            <div className="backdrop" onClick={handleUpdateProfile}></div>
            <div className="model">
                <div className='post-form'>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                        {({ values, setFieldValue }) => (<Form>
                            <h1>Update Profile</h1>
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
                                    {error && String(error).startsWith('Handle') && <span>{error}</span>}
                                </span>
                            </div>

                            <div className="field-wrapper">
                                <Field name='email' placeholder='Email' />
                                <span className="error">
                                    <ErrorMessage name='email' />
                                    {error && String(error).startsWith('Email') && <span>{error}</span>}
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

export default UpdateProfile