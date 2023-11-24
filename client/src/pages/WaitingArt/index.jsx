import PropTypes from 'prop-types';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Check, Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import ArtCard from '@components/ArtCard';

import { selectUser } from '@pages/AddArt/selectors';
import { selectDataFav } from '@pages/Home/selectors';
import { selectDataArt } from '@pages/WaitingArt/selectors';
import { accArtWaiting, deleteArtWaiting, getArtDataWaiting, resetArtWaiting } from '@pages/WaitingArt/actions';

import classes from '@pages/WaitingArt/style.module.scss';

const WaitingArt = ({ user, arts, fav, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.role !== 'admin') {
      toast.error(formatMessage({ id: 'app_need_login_as_admin' }));
      navigate('/');
    } else {
      if (!arts) {
        dispatch(getArtDataWaiting());
      }
      return () => {
        if (arts) {
          dispatch(resetArtWaiting());
        }
      };
    }
  }, [dispatch, arts, user, navigate, formatMessage]);

  return (
    <main className={classes.HomeWrap}>
      <h2 className={classes.headerHome}>
        <FormattedMessage id="app_waiting_header" />
      </h2>
      <div className={classes.cardContainerWrap}>
        {arts?.map((val, key) => (
          <div className={classes.cardContainer} key={key}>
            <ArtCard isFavorite={fav?.filter((v) => v?.artId === val.id).length > 0} art={val} login={false} />
            <div className={classes.ActionWrap}>
              <IconButton size="small" sx={{ color: 'green' }} onClick={() => dispatch(accArtWaiting(val?.id))}>
                <Check />
              </IconButton>
              <IconButton size="small" sx={{ color: 'red' }} onClick={() => dispatch(deleteArtWaiting(val?.id))}>
                <Delete />
              </IconButton>
            </div>
          </div>
        ))}
        {arts?.length === 0 && (
          <div>
            <b>
              <FormattedMessage id="app_noart" />
            </b>
          </div>
        )}
      </div>
    </main>
  );
};

WaitingArt.propTypes = {
  intl: PropTypes.object,
  arts: PropTypes.array,
  fav: PropTypes.array,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  arts: selectDataArt,
  fav: selectDataFav,
  user: selectUser,
});
export default injectIntl(connect(mapStateToProps)(WaitingArt));
