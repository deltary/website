import React from 'react';
import { DynamicLink } from '../../lib/linkUtils';

function Sponsors() {
  return (
    <div className="Sponsors">
      {/* TODO: fetch sponsors from WordPress */}
      <h1>Deltan tukena</h1>

      <div className="Sponsors-logocontainer">
        <a target="_blank" href="https://www.loimu.fi/mika-on-loimu/miksi-kannattaa-liittya/liittymislomake_opiskelijat?source=delta_ry">
          <img src="logo-loimu.png" />
        </a>
      </div>

      <DynamicLink as="/yrityksille/yhteistyohon-deltan-kanssa">
        <a>Yhteistyöhön Deltan kanssa?</a>
      </DynamicLink>
    </div>
  );
}

export default Sponsors;