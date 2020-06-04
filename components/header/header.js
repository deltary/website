import { useState } from 'react';

import { Brand } from '../../components';
import Navigation from './navigation';

function Header({ navItems }) {
  const [isMenuOpen, toggleOpen] = useState(false);

  const openClass = isMenuOpen ? 'open' : '';

  return (
    <header className={openClass}>
      <Brand isColorInverted={false} />
      <div className="NavigationButton"
           onClick={() => toggleOpen(!isMenuOpen)}>
        <div id="nav-icon"
             className={openClass}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      </div>
      <Navigation isOpen={isMenuOpen} navItems={navItems} closeNav={() => toggleOpen(false)}/>
    </header>
  );
}

export default Header;