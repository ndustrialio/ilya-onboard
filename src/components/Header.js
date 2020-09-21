import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onLogout: PropTypes.func.isRequired,
  profile: PropTypes.object,
  logo: PropTypes.string
};

const Header = ({ logo, onLogout, profile }) => {
  return (
    <header className={'header'}>
      <div className={'header__logo flex-center'}>
        <img src={logo} alt={'logo'} />
      </div>
      <span className={'flex-center'} onClick={onLogout}>
        logout
      </span>
    </header>
  );
};

Header.propTypes = propTypes;
export default Header;
