import PropTypes from 'prop-types';
import { useState } from 'react';
import config from '@config/index';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardMedia, IconButton, Skeleton } from '@mui/material';
import { Favorite } from '@mui/icons-material';

import classes from '@components/ArtCard/style.module.scss';

const ArtCard = ({ art, isFavorite = false, handleFavorit, login }) => {
  const navigate = useNavigate();
  const [loadingImg, setLoadingImage] = useState(true);
  return (
    <Card className={classes.cardWrap}>
      <div className={classes.imgWrap} onClick={() => navigate(`/detail/${art?.id}`)}>
        {loadingImg && <Skeleton animation="wave" variant="square" className={classes.Skeleton} />}
        <CardMedia
          component="img"
          className={classes.cardImg}
          loading="lazy"
          image={art ? `${config.api.server}${art?.imagePath}` : 'https://source.unsplash.com/random'}
          onLoad={() => setLoadingImage(false)}
        />
      </div>
      <CardContent className={classes.cardContent} onClick={() => navigate(`/detail/${art?.id}`)}>
        <p>{art?.title}</p>
      </CardContent>
      <IconButton
        className={classNames({
          [classes.favoritButton]: login,
          [classes.active]: isFavorite,
        })}
        aria-label="add to favorites"
        onClick={() => handleFavorit(art?.id)}
      >
        <Favorite />
      </IconButton>
    </Card>
  );
};

ArtCard.propTypes = {
  art: PropTypes.object,
  isFavorite: PropTypes.bool,
  handleFavorit: PropTypes.func,
  login: PropTypes.bool,
};

export default ArtCard;
