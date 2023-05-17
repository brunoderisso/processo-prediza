import { useState } from 'react';

import AirHumidity from '@/components/logged/air-humidity';
import Map from '@/components/logged/map';
import Menu from '@/components/logged/menu';

export default function home() {
  const [itemDisplay, setItemDisplay] = useState<string>('')

  function getItemDisplay(option: string) {
    setItemDisplay(option)
  }

  return (
    <div>
      <div className='menu'>
        <Menu getBtnClicked={ getItemDisplay }/>
      </div>
      { itemDisplay === 'air-humidity' ? <AirHumidity/> : itemDisplay === 'map' ? <Map/> : <div></div> }
    </div>
  )
}