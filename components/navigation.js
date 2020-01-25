import "./navigation.scss";
import { useState } from 'react';
import Link from 'next/link'

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
        {(navItems || []).map(category => (
          <div className="Menu__category" key={category.title}>
            <Link href={category.link}>
              <a><h3>{category.title}</h3></a>
            </Link>
            {category.items.map(subItem => (
              <Link href={subItem.link} key={subItem.title}>
                <a className="Menu__site">{subItem.title}</a>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Navigation;