import Link from 'next/link'

import Brand from '../brand/brand';

function Navigation({ navItems }) {
  return (
    <nav id="nav" className="MenuWrapper">
      <Brand isColorInverted={true} />
      <div className="Menu">
        {(navItems || []).map(category => (
          <div className="Menu__category" key={category.title}>
            <h3>{category.title}</h3>
            <div className="Menu__contents">
              {category.items.map(subItem => (
                <DynamicLink subItem={subItem} key={subItem.title}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
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
