import React from 'react';
import { FaEnvelope, FaFacebookSquare, FaInstagram, FaAddressCard } from 'react-icons/fa';

import { DynamicLink } from '../lib/linkUtils';

function Footer() {
  return (
    <footer>
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
          <DynamicLink as="/yhteystiedot">
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