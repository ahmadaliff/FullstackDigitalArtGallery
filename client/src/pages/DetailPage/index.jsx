import PropTypes from 'prop-types';
import config from '@config/index';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { CardMedia, IconButton, Skeleton } from '@mui/material';
import { Edit } from '@mui/icons-material';

import { selectArtEdit, selectUser } from '@pages/EditArt/selectors';
import { getArt, resetArt } from '@pages/EditArt/actions';

import classes from '@pages/DetailPage/style.module.scss';

const DetailPage = ({ art, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loadingImg, setLoadingImage] = useState(true);

  useEffect(() => {
    if (!art) {
      dispatch(getArt(id));
    }
    return () => {
      if (art) {
        dispatch(resetArt());
      }
    };
  }, [art, dispatch, id]);
  return (
    <main className={classes.main}>
      {art && (
        <div className={classes.imgWrap}>
          {loadingImg && <Skeleton animation="wave" variant="square" className={classes.Skeleton} />}
          <CardMedia
            component="img"
            className={classes.cardImg}
            loading="lazy"
            image={art ? `${config.api.server}${art?.imagePath}` : 'https://source.unsplash.com/random'}
            onLoad={() => setLoadingImage(false)}
          />
          {art?.userId === user.id && (
            <IconButton size="small" sx={{ paddingTop: '1rem' }} onClick={() => navigate(`/art/edit/${art?.id}`)}>
              <Edit />
            </IconButton>
          )}
          <h3 className={classes.title}>{art.title}</h3>
          <div className={classes.description}>
            <div dangerouslySetInnerHTML={{ __html: art.description }} />
          </div>
        </div>
      )}
    </main>
  );
};

DetailPage.propTypes = {
  art: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  art: selectArtEdit,
  user: selectUser,
});
export default connect(mapStateToProps)(DetailPage);
