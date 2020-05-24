import React from 'react';

function Sponsors() {
  return (
    <div className="Sponsors">
      {/* TODO: fetch sponsors from WordPress */}
      <h1>Deltan tukena</h1>
      <a target="_blank" href="https://www.loimu.fi/mika-on-loimu/miksi-kannattaa-liittya/liittymislomake_opiskelijat?source=delta_ry">
        <img src="logo-loimu.png" />
      </a>
    </div>
  );
}

export default Sponsors;