import React from 'react';
import { FaEnvelope, FaFacebookSquare, FaInstagram, FaAddressCard } from 'react-icons/fa';
import { Brand } from '../../components';

import { DynamicLink } from '../../lib/linkUtils';

function Footer({ invertColors = false }) {
  return (
    <footer className={invertColors ? 'Footer-inverted' : undefined}>
      <Brand isColorInverted={invertColors} />
      <ul>
        <li>
          <a href="mailto: delta@utu.fi">
            <FaEnvelope size="2rem" /> delta[ät]utu.fi
          </a>
        </li>
        <li>
          <a href="https://facebook.com/deltautu">
            <FaFacebookSquare size="2rem" /> deltautu
          </a>
        </li>
        <li>
          <a href="https://instagram.com/delta_ry">
            <FaInstagram size="2rem" /> @delta_ry
          </a>
        </li>
        <li>
          <DynamicLink as="/yhdistys/yhteystiedot">
            <a>
              <FaAddressCard size="2rem" /> Yhteystiedot
            </a>
          </DynamicLink>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
