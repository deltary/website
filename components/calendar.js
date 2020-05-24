import React from 'react';

function Calendar() {
  return (
    <div className="Calendar">
      {/* TODO: implement dynamically */}
      <h1>Tapahtumat</h1>
      <div className="CalendarEvent">
        <p>lauantai, 01.08. kello 17:00 - 23:00</p>
        <h1>Superhuikeet sitsit</h1>
        <p>Osakuntasali, B, Rehtorinpellonkatu 4-6</p>
      </div>
      <div className="CalendarEvent">
        <p>sunnuntai, 02.08. kello 17:00 - 18:00</p>
        <h1>Hallituksen kokous</h1>
        <p>#kokous–äänikanava, Discord</p>
      </div>
      <div className="CalendarEvent">
        <p>lauantai, 22.08. kello 12:00 - 23:00</p>
        <h1>d.O.O.m</h1>
        <p>Quantumin takanurtsi</p>
      </div>
      <a>Linkki kalenteriin</a>
    </div>
  );
}

export default Calendar;