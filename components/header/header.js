import { Brand } from '../../components';
import Navigation from './navigation';

function Header({ navItems }) {
  return (
    <header>
      <Brand isColorInverted={false} />
      <div className="NavigationButton">
        <a href="#nav" id="nav-icon-open"></a>
        <a href="#" id="nav-icon-close"></a>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Navigation navItems={navItems} />
    </header>
  );
}

export default Header;
