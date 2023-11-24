import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ArrowBackIosNew } from '@mui/icons-material';
import { Button } from '@mui/material';

import { getUserData } from '@pages/Profile/actions';
import { selectProfile } from '@pages/Profile/selectors';

import classes from '@pages/Profile/style.module.scss';

const Profile = ({ profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!profile) {
      dispatch(getUserData());
    }
  }, [dispatch, profile]);
  return (
    <main className={classes.main}>
      <div className={classes.Wrap}>
        <h2>
          <FormattedMessage id="app_profile" />
        </h2>

        <p>FullName : {profile?.fullName}</p>
        <p>E-mail : {profile?.email}</p>
        <p>Role : {profile?.role}</p>

        <button type="button" onClick={() => navigate('/profile/edit')} className={classes.buttonSubmit}>
          <FormattedMessage id="app_profile_edit" />
        </button>

        <button type="button" onClick={() => navigate('/profile/verify')} className={classes.buttonSubmit}>
          Verify Email
        </button>

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

Profile.propTypes = {
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
});

export default connect(mapStateToProps)(Profile);
