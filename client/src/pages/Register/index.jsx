import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { createStructuredSelector } from 'reselect';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import { ArrowBackIosNew } from '@mui/icons-material';
import { Button, FormControl, MenuItem, Select } from '@mui/material';

import InputRHF from '@components/InputRHF';

import { registerAccount } from '@pages/Register/actions';
import { selectLogin } from '@pages/Register/selectors';

import classes from '@pages/Register/style.module.scss';

const Register = ({ login, intl: { formatMessage } }) => {
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
    if (login) {
      toast.success(formatMessage({ id: 'app_already_login' }));
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [formatMessage, login, navigate]);

  const onSubmit = (data) => {
    dispatch(
      registerAccount(data, () =>
        setTimeout(() => {
          navigate('/login');
        }, 1500)
      )
    );
  };
  return (
    <main className={classes.main}>
      <div className={classes.formWrap}>
        <h2>
          <FormattedMessage id="app_Register_header" />
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <InputRHF
            input={{
              name: 'fullName',
              required: formatMessage({ id: 'app_user_fullName_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_user_fullName' }),
            }}
            register={register}
            errors={errors}
          />
          <InputRHF
            input={{
              name: 'email',
              required: formatMessage({ id: 'app_user_email_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_user_email' }),
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
              messagePatern: formatMessage({ id: 'app_user_email_pattern_message' }),
            }}
            register={register}
            errors={errors}
          />

          <InputRHF
            input={{
              name: 'password',
              required: formatMessage({ id: 'app_user_password_require_message' }),
              type: showPass ? 'text' : 'password',
              label: formatMessage({ id: 'app_user_password' }),
              minLength: 8,
              messageMin: formatMessage({ id: 'app_user_password_min_length' }),
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
              defaultValue="artist"
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  defaultValue="artist"
                  value={value}
                  error={errors.role !== undefined}
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
            <FormattedMessage id="app_Register_header" />
          </button>
          <p>
            <FormattedMessage id="app_register_have_Account" />
            <Link to="/login">
              <FormattedMessage id="app_login_header" />
            </Link>
          </p>
        </form>

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

Register.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default injectIntl(connect(mapStateToProps)(Register));
