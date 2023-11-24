import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';

import { setLocale, setTheme } from '@containers/App/actions';
import { selectLogin } from '@containers/Client/selectors';
import { selectUser } from '@pages/UserList/selectors';
import { validateLogout } from '@pages/Login/actions';

import classes from './style.module.scss';

const Navbar = ({ login, user, title, locale, theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const [openNav, setOpenNav] = useState(false);
  const open = Boolean(menuPosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };
  const handleCloseNav = () => {
    setOpenNav(!openNav);
  };
  const handleNavigate = (to) => {
    setOpenNav(false);
    navigate(to);
  };

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.leftNav}>
          <div className={`${classes.hamburger} ${openNav && classes.open}`} onClick={() => handleCloseNav()}>
            <span className={classes.spanOne} />
            <span className={classes.spanTwo} />
            <span className={classes.spanThree} />
          </div>
          <div className={classes.logoImage} onClick={goHome}>
            <div className={classes.title}>{title}</div>
          </div>
        </div>
        <div className={classes.toolbar}>
          <div className={classes.theme} onClick={handleTheme} data-testid="toggleTheme">
            {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
          </div>
          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
        </div>
        <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
          <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/id.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_id" />
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/en.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_en" />
              </div>
            </div>
          </MenuItem>
        </Menu>
        <div className={`${classes.navItem} ${openNav && classes.navItemOpen}`}>
          <ul className={classes.wrap}>
            {login ? (
              <>
                {user?.role === 'artist' ? (
                  <Button fullWidth onClick={() => handleNavigate('/art/add')}>
                    <FormattedMessage id="app_art_add_header" />
                  </Button>
                ) : (
                  <>
                    <Button fullWidth onClick={() => handleNavigate('/admin/waiting-art')}>
                      <FormattedMessage id="app_waiting_header" />
                    </Button>
                    <Button fullWidth onClick={() => handleNavigate('/admin/category-list')}>
                      <FormattedMessage id="app_category_list_header" />
                    </Button>
                    <Button fullWidth onClick={() => handleNavigate('/admin/user')}>
                      <FormattedMessage id="app_user_list_header" />
                    </Button>
                  </>
                )}
                <Button fullWidth onClick={() => handleNavigate('/favorit')}>
                  Favorit
                </Button>
                <Button fullWidth className={classes.user} onClick={() => handleNavigate('/profile')}>
                  <FormattedMessage id="app_profile" />
                </Button>
                <Button
                  fullWidth
                  className={classes.user}
                  onClick={() =>
                    dispatch(
                      validateLogout(() =>
                        setTimeout(() => {
                          handleNavigate('/login');
                        }, 1000)
                      )
                    )
                  }
                >
                  <FormattedMessage id="app_logout_header" />
                </Button>
              </>
            ) : (
              <>
                <Button fullWidth className={classes.user} onClick={() => handleNavigate('/login')}>
                  <FormattedMessage id="app_login_header" />
                </Button>
                <Button fullWidth className={classes.user} onClick={() => handleNavigate('/register')}>
                  <FormattedMessage id="app_Register_header" />
                </Button>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
  login: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  user: selectUser,
});

export default injectIntl(connect(mapStateToProps)(Navbar));
