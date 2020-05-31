import Link from 'next/link'
import { asLink } from '../../lib/linkUtils';

function Brand({ isOpen }) {
  return (
    <Link href="/">
      <a className={isOpen ? 'Brand Brand--open' : 'Brand'}>
        <img src={asLink(isOpen ? '/deltalogo-purple.svg' : '/deltalogo.svg')} />
        <div>Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys Delta ry</div>
      </a>
    </Link>
  );
}

export default Brand;