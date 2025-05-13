import Link from 'next/link'

import Brand from '../brand/brand';

function Navigation({ isOpen, navItems, closeNav }) {
  return (
    <div className={isOpen ? "MenuWrapper open" : "MenuWrapper"}>
      <Brand isColorInverted={true} />
      <div className="Menu">
        {(navItems || []).map(category => (
          <div className="Menu__category" key={category.title}>
            <h3>{category.title}</h3>
            <div className="Menu__contents">
              {category.items.map(subItem => (
                <DynamicLink subItem={subItem} onClick={closeNav} key={subItem.title}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DynamicLink({ subItem, onClick }) {
  const { link, title } = subItem;
  const href = link !== '/tapahtumakalenteri'
    ? '/[...page]'
    : '/tapahtumakalenteri';

  return (
    <Link href={href} as={link} key={title}>
      <a onClick={onClick} className="Menu__site">{title}</a>
    </Link>
  );
}

export default Navigation;
