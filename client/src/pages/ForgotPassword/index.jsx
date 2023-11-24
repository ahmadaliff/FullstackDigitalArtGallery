import PropTypes from 'prop-types';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import { ArrowBackIosNew } from '@mui/icons-material';
import { Button } from '@mui/material';

import InputRHF from '@components/InputRHF';

import { selectLogin } from '@pages/ForgotPassword/selectors';
import { sendForgotPassword } from '@pages/ForgotPassword/actions';

import classes from '@pages/Login/style.module.scss';

const ForgotPassword = ({ login, intl: { formatMessage } }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (login) {
      toast.success(formatMessage({ id: 'app_already_login' }));
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatMessage, navigate]);

  const onSubmit = (data) => {
    dispatch(
      sendForgotPassword(data, () => {
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      })
    );
  };

  return (
    <main className={classes.main}>
      <div className={classes.formWrap}>
        <h2>
          <FormattedMessage id="app_forgot_header" />
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

          <button type="submit" className={classes.buttonSubmit}>
            <FormattedMessage id="app_forgot_header" />
          </button>
        </form>

        <Button
          type="button"
          startIcon={<ArrowBackIosNew />}
          size="small"
          className={classes.backButton}
          onClick={() => {
            navigate('/login');
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

ForgotPassword.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});
export default injectIntl(connect(mapStateToProps)(ForgotPassword));
