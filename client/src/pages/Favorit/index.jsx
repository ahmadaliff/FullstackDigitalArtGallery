import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ArtCard from '@components/ArtCard';
import CategoryCard from '@components/CategoryCard';

import { addArtFav, deleteArtFav, getArtData, getFav, resetArtData, resetFav } from '@pages/Home/actions';
import { selectDataFav, selectDataArt } from '@pages/Home/selectors';
import { selectLogin } from '@containers/Client/selectors';

import classes from '@pages/Favorit/style.module.scss';

const Favorit = ({ login, arts, fav }) => {
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
          ?.filter((fil) => fil.title.includes(filterTitle))
          .filter((fil) => (filterCategory !== '' ? fil.categoryId === filterCategory : fil))
          .map(
            (val, key) =>
              fav?.filter((fil) => fil.artId === val.id).length > 0 && (
                <div key={key} className={classes.cardContainer}>
                  <ArtCard
                    isFavorite={fav?.filter((fil) => fil.artId === val.id).length > 0}
                    art={val}
                    handleFavorit={handleFavorit}
                    login={login}
                  />
                </div>
              )
          )}
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

Favorit.propTypes = {
  arts: PropTypes.array,
  fav: PropTypes.array,
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  arts: selectDataArt,
  fav: selectDataFav,
  login: selectLogin,
});
export default connect(mapStateToProps)(Favorit);
