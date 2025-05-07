import Link from 'next/link'

import Logo from '../../public/deltalogo-noutu.svg';

function Brand({ isColorInverted = false }) {
  return (
    <Link href="/">
      <a className={isColorInverted ? 'Brand Brand--inverted' : 'Brand'}>
        <Logo fill="#330000" height="70px" width="120px" viewBox="100 -75 450 500" />
        <div>Turun yliopiston matemaattisten ja fysikaalisten tieteiden opiskelijoiden yhdistys Delta ry</div>
      </a>
    </Link>
  );
}

export default Brand;
