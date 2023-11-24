import PropTypes from 'prop-types';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

import { selectCategory, selectUser } from '@pages/AddArt/selectors';
import { deleteCategoryArt, getCategoryArt } from '@pages/AddArt/actions';

import { ArrowBackIosNew, Delete } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

import classes from '@pages/CategoryList/style.module.scss';

const CategoryList = ({ user, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== 'admin') {
      toast.error('Only admin can access');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [navigate, user]);

  useEffect(() => {
    if (!category) {
      dispatch(getCategoryArt());
    }
  }, [category, dispatch]);
  const handleDeleteCategory = (id) => {
    dispatch(deleteCategoryArt(id));
  };

  return (
    <main className={classes.main}>
      <div className={classes.formWrap}>
        <h2>
          <FormattedMessage id="app_category_list_header" />
        </h2>
        {category?.map((val, key) => (
          <div key={key} className={classes.categoryWrap}>
            <p>{val.name}</p>
            <IconButton onClick={() => handleDeleteCategory(val.id)}>
              <Delete />
            </IconButton>
          </div>
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

CategoryList.propTypes = {
  category: PropTypes.array,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  category: selectCategory,
  user: selectUser,
});

export default connect(mapStateToProps)(CategoryList);
