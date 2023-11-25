import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { selectLogin } from '@pages/Login/selectors';
import { selectUser } from '@pages/EditArt/selectors';
import { selectDataArt, selectDataFav } from '@pages/Home/selectors';
import {
  addArtFav,
  deleteArtFav,
  deleteArtHome,
  getArtData,
  getFav,
  resetArtData,
  resetFav,
} from '@pages/Home/actions';

import ArtCard from '@components/ArtCard';
import CategoryCard from '@components/CategoryCard';

import classes from '@pages/Home/style.module.scss';

const Home = ({ login, user, arts, fav }) => {
  const dispatch = useDispatch();
  const [filterCategory, setFilterCategory] = useState('');
  const [filterTitle, setFilterTitle] = useState('');
  useEffect(() => {
    if (!arts) {
      dispatch(getArtData());
    }
    return () => {
      if (arts) {
        dispatch(resetArtData());
      }
    };
  }, [dispatch, arts]);
  useEffect(() => {
    if (login && !fav) {
      dispatch(getFav());
    }
    return () => {
      if (fav) {
        dispatch(resetFav());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fav]);

  const handleFavorit = (id) => {
    const isFav = fav?.filter((val) => val.artId === id).length > 0;
    if (isFav) {
      dispatch(deleteArtFav(id));
    } else {
      dispatch(addArtFav(id));
    }
  };
  const handleFilterCategory = (filter) => {
    setFilterCategory(filter);
  };
  return (
    <main className={classes.HomeWrap}>
      <h2 className={classes.headerHome}>
        <FormattedMessage id="app_home_header" />
      </h2>
      <CategoryCard filterFunc={handleFilterCategory} filterTitle={setFilterTitle} />
      <div className={classes.cardContainerWrap}>
        {arts
          ?.filter((fil) => fil.title.toLowerCase().includes(filterTitle.toLowerCase()))
          .filter((fil) => (filterCategory !== '' ? fil.categoryId === filterCategory : fil))
          .map((val, key) => (
            <div key={key} className={classes.cardContainer}>
              <ArtCard
                isFavorite={fav?.filter((fil) => fil.artId === val.id).length > 0}
                art={val}
                handleFavorit={handleFavorit}
                login={login}
              />
              {login && (user.role === 'admin' || val?.userId === user.id) && (
                <div className={classes.ActionWrap}>
                  <IconButton size="small" sx={{ color: 'red' }} onClick={() => dispatch(deleteArtHome(val?.id))}>
                    <Delete />
                  </IconButton>
                </div>
              )}
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

Home.propTypes = {
  arts: PropTypes.array,
  fav: PropTypes.array,
  login: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  arts: selectDataArt,
  fav: selectDataFav,
  login: selectLogin,
  user: selectUser,
});

export default connect(mapStateToProps)(Home);
