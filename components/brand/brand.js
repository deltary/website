import Link from 'next/link'

import Logo from '../../public/deltalogo-noutu.svg';

function Brand({ isColorInverted = false }) {
  return (
    <Link href="/">
      <a className={isColorInverted ? 'Brand inverted' : 'Brand'}>
        <Logo />
        <div>Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys Delta ry</div>
      </a>
    </Link>
  );
}

export default Brand;
