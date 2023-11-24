import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Button, Card, Input } from '@mui/material';

import { selectCategory } from '@pages/AddArt/selectors';
import { getCategoryArt } from '@pages/AddArt/actions';

import classes from '@components/CategoryCard/style.module.scss';

const CategoryCard = ({ category, filterFunc, filterTitle }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!category) {
      dispatch(getCategoryArt());
    }
  }, [category, dispatch]);
  return (
    <Card className={classes.cardWrap}>
      <div>
        <Input
          type="text"
          size="small"
          fullWidth
          placeholder="Filter Art"
          onChange={(e) => filterTitle(e.target.value)}
          sx={{ fontSize: 'small' }}
        />
      </div>
      <div className={classes.categoryWrap}>
        <p>
          <FormattedMessage id="app_category_art" /> :
        </p>
        <Button onClick={() => filterFunc('')} variant="contained" size="small" className={classes.pillCategory}>
          all
        </Button>
        {category?.map((val, key) => (
          <Button
            variant="contained"
            size="small"
            key={key}
            onClick={() => filterFunc(val.id)}
            className={classes.pillCategory}
          >
            {val.name}
          </Button>
        ))}
      </div>
    </Card>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.array,
  filterFunc: PropTypes.func,
  filterTitle: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  category: selectCategory,
});
export default connect(mapStateToProps)(CategoryCard);
