import Link from 'next/link'

import Brand from '../brand/brand';

function Navigation({ isOpen, navItems, closeNav }) {
  return (
    <div className={isOpen ? "MenuWrapper MenuWrapper--open" : "MenuWrapper"}>
      <Brand isColorInverted={true} />
      <div className="Menu">
        {(navItems || []).map(category => (
          <div className="Menu__category" key={category.title}>
            <h3>{category.title}</h3>
            <div className="Menu__contents">
              {category.items.map(subItem => (
                <Link href={subItem.link} key={subItem.title}>
                  <a onClick={closeNav} className="Menu__site">{subItem.title}</a>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navigation;