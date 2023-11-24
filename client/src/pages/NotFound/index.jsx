import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';

const NotFound = () => (
  <div className={classes.contentWrapper}>
    <h3>404</h3>
    <div className={classes.title}>
      <FormattedMessage id="app_not_found" />
    </div>
  </div>
);

export default NotFound;
