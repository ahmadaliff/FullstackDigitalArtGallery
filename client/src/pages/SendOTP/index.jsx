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

import { resetTokenOTP, sendOTPAction, sendOTPtoemail } from '@pages/SendOTP/actions';
import { getUserData } from '@pages/Profile/actions';
import { selectOtp } from '@pages/SendOTP/selectors';
import { selectProfile } from '@pages/Profile/selectors';

import classes from '@pages/SendOTP/style.module.scss';

const SendOTP = ({ profile, tokenOtp, intl: { formatMessage } }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!profile) {
      dispatch(getUserData());
    }
    if (profile?.isVerify) {
      toast.success('already verify');
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    }
    if (!tokenOtp && profile && !profile?.isVerify) {
      dispatch(sendOTPtoemail({ email: profile.email }));
    }
    return () => {
      if (tokenOtp) {
        dispatch(resetTokenOTP());
      }
    };
  }, [dispatch, navigate, profile, tokenOtp]);

  const onSubmit = (data) => {
    dispatch(
      sendOTPAction({ ...data, tokenOtp }, () => {
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      })
    );
  };

  return (
    <main className={classes.main}>
      {tokenOtp && (
        <div className={classes.formWrap}>
          <h2>
            <FormattedMessage id="app_send_otp_header" />
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <InputRHF
              input={{
                name: 'otp',
                required: formatMessage({ id: 'app_otp_require_message' }),
                type: 'number',
                label: formatMessage({ id: 'app_otp' }),
                minLength: 4,
                messageMin: formatMessage({ id: 'app_otp_min_length' }),
              }}
              register={register}
              errors={errors}
            />
            <button type="submit" className={classes.buttonSubmit}>
              <FormattedMessage id="app_send_otp_header" />
            </button>
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
      )}
    </main>
  );
};

SendOTP.propTypes = {
  intl: PropTypes.object,
  profile: PropTypes.object,
  tokenOtp: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  tokenOtp: selectOtp,
});

export default injectIntl(connect(mapStateToProps)(SendOTP));
