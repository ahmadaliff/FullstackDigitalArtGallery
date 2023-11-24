import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl } from 'react-intl';

import { ArrowBackIosNew } from '@mui/icons-material';
import { Button, FormControl, MenuItem, Select } from '@mui/material';

import InputRHF from '@components/InputRHF';

import { getUserData } from '@pages/Profile/actions';
import { editAccount } from '@pages/EditProfile/actions';
import { selectProfile } from '@pages/Profile/selectors';

import classes from '@pages/EditProfile/style.module.scss';

const EditProfile = ({ profile, intl: { formatMessage } }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!profile) {
      dispatch(getUserData());
    }
  }, [dispatch, profile]);
  const onSubmit = (data) => {
    if (data.password === '') {
      delete data.password;
    }
    dispatch(
      editAccount(data, () =>
        setTimeout(() => {
          navigate('/profile');
        }, 1500)
      )
    );
  };
  return (
    <main className={classes.main}>
      <div className={classes.formWrap}>
        <h2>
          <FormattedMessage id="app_profile_edit" />
        </h2>
        {profile && (
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <InputRHF
              input={{
                name: 'fullName',
                type: 'text',
                label: formatMessage({ id: 'app_user_fullName' }),
                value: profile?.fullName,
              }}
              register={register}
              errors={errors}
            />
            <InputRHF
              input={{
                name: 'email',
                type: 'text',
                label: formatMessage({ id: 'app_user_email' }),
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                messagePatern: formatMessage({ id: 'app_user_email_pattern_message' }),
                value: profile?.email,
              }}
              register={register}
              errors={errors}
            />

            <InputRHF
              input={{
                name: 'password',
                type: showPass ? 'text' : 'password',
                label: formatMessage({ id: 'app_user_password' }),
              }}
              register={register}
              errors={errors}
            >
              <label htmlFor="show" className={classes.showPassword}>
                <input type="checkbox" name="show" id="show" onChange={(e) => setShowPass(e.target.checked)} />
                <FormattedMessage id="app_user_password_show" />
              </label>
            </InputRHF>

            <FormControl variant="standard" className={classes.FormControl}>
              {
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label htmlFor="role" className={classes.inputLabel}>
                  <FormattedMessage id="app_register_role" />
                </label>
              }

              <Controller
                control={control}
                name="role"
                rules={{ required: formatMessage({ id: 'app_register_role_require' }) }}
                defaultValue={profile?.role}
                render={({ field: { onChange, value } }) => (
                  <Select
                    onChange={onChange}
                    defaultValue="artist"
                    value={value}
                    error={errors.role !== undefined}
                    disabled={profile?.role !== 'admin'}
                    displayEmpty
                    className={classes.inputSelect}
                  >
                    <MenuItem value="artist">Artist</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                )}
              />

              {errors?.role && <span className={classes.inputLabelError}>{errors.role.message}</span>}
            </FormControl>

            <button type="submit" className={classes.buttonSubmit}>
              <FormattedMessage id="app_profile_edit" />
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

EditProfile.propTypes = {
  intl: PropTypes.object,
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
});

export default injectIntl(connect(mapStateToProps)(EditProfile));
