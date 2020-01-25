import "./navigation.scss";
import { useState } from 'react';

function Navigation({ navItems }) {
  const [isOpen, toggleOpen] = useState(false);

  return (
    <>
      <header>
        <button onClick={() => toggleOpen(!isOpen)}>
          <img src="/hamburger.svg"/>
        </button>
      </header>
      <div className={isOpen ? "Menu Menu--open" : "Menu"}>
        {navItems.map(category => (
          <div className="Menu__category">
            <h3>{category.title}</h3>
            {category.items.map(subItem => (
              <a className="Menu__site">{subItem.title}</a>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Navigation;