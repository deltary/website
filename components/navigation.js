import "./navigation.scss";
import { useState } from 'react';
import Link from 'next/link'

const asLink = link => `${process.env.ASSET_PREFIX}${link}`;

function Navigation({ navItems }) {
  const [isOpen, toggleOpen] = useState(false);

  return (
    <>
      <header>
        <button onClick={() => toggleOpen(!isOpen)}>
          <img src={asLink('/hamburger.svg')}/>
        </button>
      </header>
      <div className={isOpen ? "Menu Menu--open" : "Menu"}>
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
    </>
  );
}

export default Navigation;