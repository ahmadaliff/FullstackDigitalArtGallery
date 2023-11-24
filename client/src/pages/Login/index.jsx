import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import { ArrowBackIosNew } from '@mui/icons-material';
import { Button } from '@mui/material';

import InputRHF from '@components/InputRHF';

import { selectLogin } from '@pages/Login/selectors';
import { validateLogin } from '@pages/Login/actions';

import classes from '@pages/Login/style.module.scss';

const Login = ({ login, intl: { formatMessage } }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [isAfterLogin, setIsAfterLogin] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (login && !isAfterLogin) {
      toast.success(formatMessage({ id: 'app_already_login' }));
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatMessage, isAfterLogin, navigate]);

  const onSubmit = (data) => {
    dispatch(
      validateLogin(data, () => {
        setIsAfterLogin(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
    );
  };

  return (
    <main className={classes.main}>
      <div className={classes.formWrap}>
        <h2>
          <FormattedMessage id="app_login_header" />
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
          <button type="submit" className={classes.buttonSubmit}>
            <FormattedMessage id="app_login_header" />
          </button>
          <p>
            <FormattedMessage id="app_login_noAccount" />
            <Link to="/register">
              <FormattedMessage id="app_Register_header" />
            </Link>
          </p>
          <p>
            <FormattedMessage id="app_forgot_header" />?
            <Link to="/forgot-password">
              <FormattedMessage id="app_forgot_header" />
            </Link>
          </p>
        </form>

        <Button
          type="button"
          startIcon={<ArrowBackIosNew />}
          size="small"
          className={classes.backButton}
          onClick={() => {
            navigate('/');
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

Login.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default injectIntl(connect(mapStateToProps)(Login));
