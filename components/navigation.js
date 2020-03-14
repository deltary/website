import { useState } from 'react';
import Link from 'next/link'

import { asLink } from '../lib/linkUtils';

function Navigation({ navItems }) {
  const [isOpen, toggleOpen] = useState(false);

  const openClass = isOpen ? 'open' : '';

  return (
    <>
      <header className={openClass}>
        <span className="Brand">
          <LogoLink logo={asLink('/deltalogo.svg')} />
          <div>Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys Delta ry</div>
        </span>
        <div id="nav-icon"
             className={openClass}
             onClick={() => toggleOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <div className={isOpen ? "MenuWrapper MenuWrapper--open" : "MenuWrapper"}>
        <LogoLink logo={asLink('/deltalogo-purple.svg')}/>
        <div className="Menu">
          {(navItems || []).map(category => (
            <div className="Menu__category" key={category.title}>
              <Link href={category.link} as={asLink(category.link)}>
                <a><h3>{category.title}</h3></a>
              </Link>
              {category.items.map(subItem => (
                <Link href={subItem.link} as={asLink(subItem.link)} key={subItem.title}>
                  <a className="Menu__site">{subItem.title}</a>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const LogoLink = ({ logo }) => (
  <Link href="/" as={asLink('/')}>
    <a>
      <img src={logo} />
    </a>
  </Link>
);

export default Navigation;