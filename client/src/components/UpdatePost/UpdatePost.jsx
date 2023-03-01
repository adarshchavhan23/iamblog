import './UpdatePost.scss'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import ReactQuill from 'react-quill';
import { formats, modules } from '../../assets/QuillOptions';
import Select from 'react-select'
import { categories } from '../../assets/categories';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import { getMyPosts, getPost, updatePost } from '../../redux/actions/postAction'
import { loadUser } from '../../redux/actions/userAction'

const validationSchema = yup.object({
  title: yup.string().min(3).max(200).required(),
  brief: yup.string().min(3).max(250).required(),
  desc: yup.string().min(20).required(),
});

const UpdatePost = ({ post, handlePostUpdate }) => {
  const [initialValues, setInitialValues] = useState({ title: '', brief: '', desc: '', image: '', cat: '', tags: [] });
  const { loading } = useSelector(state => state.post);

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

  const handleAddTags = (e, setFieldValue, oldTags) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.value.length > 1) {
        setFieldValue('tags', [...oldTags, e.target.value]);
        e.target.value = '';
      }
    }
  }

  const handleRemoveTags = (i, setFieldValue, oldTags) => {
    setFieldValue('tags', oldTags.filter((val, index) => index !== i));
  }

  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    console.log(data);
    dispatch(updatePost(post._id, data))
    .then(async(res) => {
      if (res.type === 'updatePostSuccess') {
        toast.success(res.message);
        await dispatch(getMyPosts())
        dispatch(getPost(post._id));
        dispatch(loadUser());
        handlePostUpdate();
      }
    })
  }

  console.log(post);

  useEffect(()=>{
    if(post){
      setInitialValues({
        title: post.title,
        brief: post.brief,
        desc: post.desc,
        image: post.img && post.img.url,
        cat: {
          label: post.cat,
          value: post.cat
        },
        tags: post.tags
      })
    }
  },[]);

  return (
    <div className='update-post'>
      <div className="backdrop" onClick={handlePostUpdate}></div>
      <div className="model">
        <div className='post-form'>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
            {({ values, setFieldValue }) => (<Form onKeyDown={e => e.key==='Enter' && e.preventDefault()}>
              <h1>Update Post</h1>

              <div className="field-wrapper">
                <Field name='title' placeholder='title' />
                <span className="error">
                  <ErrorMessage name='title' />
                </span>
              </div>

              <div className="field-wrapper">
                <Field name='brief' placeholder='brief' />
                <span className="error">
                  <ErrorMessage name='brief' />
                </span>
              </div>

              <div className="field-wrapper quill">
                <ReactQuill theme="snow" placeholder='Description' value={values.desc} modules={modules} formats={formats} onChange={e => setFieldValue('desc', e)} />
                <span className="error">
                  <ErrorMessage name='desc' />
                </span>
              </div>

              <div className="field-wrapper img">
                <input id='file-input' type='file' accept='imgae/*' onChange={e => handleImage(e, setFieldValue)} />
                <div className='btn-wrapper'>
                  <label className='file-label' htmlFor='file-input' >Choose file</label>
                  <button type='button' className='remove-btn' onClick={() => handleRemoveFile(setFieldValue)}>Remove file</button>
                </div>
                {values.image && <img src={values.image} />}
              </div>

              <div className="field-wrapper">
                <Select name='cat' options={categories} value={values.cat} onChange={e => setFieldValue('cat', e)} />
                <span className="error">
                  <ErrorMessage name='cat' />
                </span>
              </div>

              <div className="field-wrapper tags">
                {values.tags.map((tag, i) => (
                  <div className="tag-item" key={i}>
                    <p className='text'>{tag}</p>
                    <span>
                      <button type='button' className='clear-btn' onClick={() => handleRemoveTags(i, setFieldValue, values.tags)}>×</button>
                    </span>
                  </div>
                ))}

                <div className="tags-input">
                  <input type="text" placeholder='Add tags..' onKeyDown={e => handleAddTags(e, setFieldValue, values.tags)} />
                </div>
              </div>

              <div className="field-wrapper">
                <button type='submit' className='submit-btn' disabled={loading ? true : false}>
                  {loading ? <div className="loader"></div> : 'Add'}
                </button>
              </div>

            </Form>)}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default UpdatePost