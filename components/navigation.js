import { useState } from 'react';

import { DynamicLink, LogoLink } from '../lib/linkUtils';

function Navigation({ navItems }) {
  const [isOpen, toggleOpen] = useState(false);

  const openClass = isOpen ? 'open' : '';

  return (
    <>
      <header className={openClass}>
        <span className="Brand">
          <LogoLink logo="/deltalogo.svg" />
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
        <LogoLink logo="/deltalogo-purple.svg"/>
        <div className="Menu">
          {(navItems || []).map(category => (
            <div className="Menu__category" key={category.title}>
              <DynamicLink as={category.link}>
                <a><h3>{category.title}</h3></a>
              </DynamicLink>
              {category.items.map(subItem => (
                <DynamicLink as={subItem.link} key={subItem.title}>
                  <a className="Menu__site">{subItem.title}</a>
                </DynamicLink>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


export default Navigation;