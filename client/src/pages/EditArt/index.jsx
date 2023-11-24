import PropTypes from 'prop-types';
import config from '@config/index';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

import InputRHF from '@components/InputRHF';

import { Add, ArrowBackIosNew } from '@mui/icons-material';
import { Button, FormControl, IconButton, Input, MenuItem, Select } from '@mui/material';

import { selectArtEdit, selectCategory, selectLogin, selectUser } from '@pages/EditArt/selectors';
import { AddCategoryArt, getCategoryArt } from '@pages/AddArt/actions';
import { editArt, getArt, resetArt } from '@pages/EditArt/actions';

import classes from '@pages/EditArt/style.module.scss';
import 'react-quill/dist/quill.snow.css';

const EditArt = ({ login, user, art, category, intl: { formatMessage } }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [imgPreview, setImgPreview] = useState();
  const [newCategory, setNewCategory] = useState();
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const image = watch(['image']);
  const title = watch(['title']);
  const imageObj = image[0];

  useEffect(() => {
    if (!login || (art && art?.userId !== user?.id) || user?.role !== 'artist') {
      toast.error(formatMessage({ id: 'app_need_login_as_artist' }));
      setTimeout(() => {
        navigate(login ? '/' : '/login');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatMessage, login, navigate]);

  useEffect(() => {
    imageObj && imageObj['0'] && !errors.image && setImgPreview(URL.createObjectURL(imageObj['0']));
  }, [errors.image, imageObj]);

  useEffect(() => {
    if (!category) {
      dispatch(getCategoryArt());
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (!art) {
      dispatch(getArt(id));
    }
    setImgPreview(
      imageObj && imageObj['0'] ? URL.createObjectURL(imageObj['0']) : `${config.api.server}${art?.imagePath}`
    );
    return () => {
      if (art) {
        dispatch(resetArt());
      }
    };
  }, [art, dispatch, id, imageObj]);
  const handleAddCategory = () => {
    dispatch(AddCategoryArt(newCategory));
  };
  const onSubmit = (data) => {
    if (data.image.length === 0) {
      delete data.image;
    }
    dispatch(
      editArt(art?.id, data, () =>
        setTimeout(() => {
          navigate('/');
        }, 1500)
      )
    );
  };

  return (
    <main className={classes.main}>
      <div className={classes.formWrap}>
        <h2>
          <FormattedMessage id="app_art_edit_header" />
        </h2>
        {art && (
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <InputRHF
              input={{
                name: 'title',
                required: formatMessage({ id: 'app_title_art_require' }),
                type: 'text',
                label: formatMessage({ id: 'app_title_art' }),
                value: art?.title,
              }}
              register={register}
              errors={errors}
            />
            <FormControl variant="standard" className={classes.FormControl}>
              {
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <p className={classes.inputLabel}>
                  <FormattedMessage id="app_category_art" />
                </p>
              }
              <Controller
                control={control}
                name="categoryId"
                rules={{ required: formatMessage({ id: 'app_category_art_require' }) }}
                defaultValue={art?.categoryId}
                render={({ field: { onChange, value } }) => (
                  <Select
                    onChange={onChange}
                    defaultValue={art?.categoryId}
                    value={value}
                    error={errors.category !== undefined}
                    displayEmpty
                    className={classes.inputSelect}
                  >
                    <MenuItem value="" disabled>
                      Select Category
                    </MenuItem>
                    {category?.map((val, key) => (
                      <MenuItem value={val?.id} key={key} onKeyDown={(e) => e.stopPropagation()}>
                        {val?.name}
                      </MenuItem>
                    ))}
                    <div className={classes.inputCategory}>
                      <Input
                        type="text"
                        sx={{ width: '85%', marginLeft: '0.75rem' }}
                        onChange={(e) => setNewCategory({ name: e.target.value })}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <IconButton size="small" type="button" onClick={() => handleAddCategory()}>
                        <Add />
                      </IconButton>
                    </div>
                  </Select>
                )}
              />
              {errors?.category && <span className={classes.inputLabelError}>{errors.category.message}</span>}
            </FormControl>
            <FormControl variant="standard" className={classes.FormControl}>
              {
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <p className={classes.inputLabel}>
                  <FormattedMessage id="app_description_art" />
                </p>
              }
              <Controller
                control={control}
                name="description"
                rules={{ required: formatMessage({ id: 'app_description_art_require' }) }}
                defaultValue={art?.description}
                render={({ field: { onChange, value } }) => (
                  <div className={classes.quillContainer}>
                    <ReactQuill className={classes.quill} value={value} onChange={onChange} />
                  </div>
                )}
              />
              {errors?.description && <span className={classes.inputLabelError}>{errors.description.message}</span>}
            </FormControl>
            <InputRHF
              input={{
                name: 'image',
                type: 'file',
                label: formatMessage({ id: 'app_image_art' }),
              }}
              register={register}
              errors={errors}
              accept={'image/*'}
            />
            {imgPreview && (
              <div>
                {
                  // eslint-disable-next-line jsx-a11y/label-has-associated-control
                  <label htmlFor="imagePreview" className={classes.inputLabel}>
                    Image Preview
                  </label>
                }
                <figure className={classes.imgWrap}>
                  <img src={imgPreview} alt={title && title[0]} className={classes.img} />
                </figure>
              </div>
            )}
            <button type="submit" className={classes.buttonSubmit}>
              <FormattedMessage id="app_art_edit_header" />
            </button>
          </form>
        )}
        <Button
          type="button"
          startIcon={<ArrowBackIosNew />}
          size="small"
          className={classes.backButton}
          onClick={() => {
            navigate(-1);
          }}
        >
          <FormattedMessage id="app_back_button" />
        </Button>
        <div className={classes.logo}>
          <div className={classes.title}>DigiArt</div>
        </div>
      </div>
    </main>
  );
};

EditArt.propTypes = {
  intl: PropTypes.object,
  user: PropTypes.object,
  login: PropTypes.bool,
  category: PropTypes.array,
  art: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  user: selectUser,
  category: selectCategory,
  art: selectArtEdit,
});
export default injectIntl(connect(mapStateToProps)(EditArt));
