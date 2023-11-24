import PropTypes from 'prop-types';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import { ArrowBackIosNew, Delete } from '@mui/icons-material';
import { Button, Card, IconButton } from '@mui/material';

import { changeRole, deleteUser, getUsers, resetUsers } from '@pages/UserList/actions';
import { selectDataUsers, selectLogin, selectUser } from '@pages/UserList/selectors';

import classes from '@pages/UserList/style.module.scss';
import { validateLogout } from '@pages/Login/actions';

const UserList = ({ login, user, usersData, intl: { formatMessage } }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!login || user?.role !== 'admin') {
      toast.error(formatMessage({ id: 'app_need_login_as_admin' }));
      setTimeout(() => {
        navigate(login ? '/' : '/login');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatMessage, login, navigate]);

  useEffect(() => {
    if (!usersData) {
      dispatch(getUsers());
    }
    return () => {
      if (usersData) {
        dispatch(resetUsers());
      }
    };
  }, [usersData, dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(
      deleteUser(id, user.id, () => {
        toast.error('you delete your account, your logout');
        dispatch(validateLogout(() => navigate('/login')));
      })
    );
  };

  const handlechangeRole = (id) => {
    dispatch(
      changeRole(id, user.id, () => {
        toast.error('you change your account role, need to login again');
        navigate('/login');
      })
    );
  };

  return (
    <main className={classes.main}>
      <div className={classes.containerWrap}>
        <h2>
          <FormattedMessage id="app_user_list_header" />
        </h2>
        {usersData?.map((val, key) => (
          <Card key={key} className={classes.userWrap}>
            <div className={classes.userData}>
              {val?.id === user?.id && (
                <b>
                  <FormattedMessage id="app_your_account" />
                </b>
              )}
              <p>
                <FormattedMessage id="app_user_fullName" /> :{val.fullName}
              </p>
              <p>
                <FormattedMessage id="app_register_role" />:{val.role}
              </p>
              <p>
                <FormattedMessage id="app_user_email" />:{val.email}
              </p>
            </div>
            <div className={classes.button}>
              <Button size="small" onClick={() => handlechangeRole(val.id)}>
                change Role
              </Button>
              <IconButton size="small" onClick={() => handleDeleteUser(val.id)}>
                <Delete />
              </IconButton>
            </div>
          </Card>
        ))}
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

UserList.propTypes = {
  intl: PropTypes.object,
  user: PropTypes.object,
  login: PropTypes.bool,
  usersData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  user: selectUser,
  usersData: selectDataUsers,
});
export default injectIntl(connect(mapStateToProps)(UserList));
