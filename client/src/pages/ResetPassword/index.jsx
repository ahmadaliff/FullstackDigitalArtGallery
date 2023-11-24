import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import { ArrowBackIosNew } from '@mui/icons-material';
import { Button } from '@mui/material';

import InputRHF from '@components/InputRHF';

import { selectLogin } from '@pages/ResetPassword/selectors';
import { sendResetPass } from '@pages/ResetPassword/actions';

import classes from '@pages/ResetPassword/style.module.scss';

const ResetPassword = ({ login, intl: { formatMessage } }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const [showPass, setShowPass] = useState();
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
      sendResetPass({ ...data, token }, () => {
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
          <FormattedMessage id="app_reset_password_header" />
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <InputRHF
            input={{
              name: 'new_password',
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
            <FormattedMessage id="app_reset_password_header" />
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

ResetPassword.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});
export default injectIntl(connect(mapStateToProps)(ResetPassword));
