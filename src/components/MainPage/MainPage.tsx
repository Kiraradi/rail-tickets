import React from 'react';
import DescriptionSite from '../DescriptionSite/DescriptionSite';
import DescriptionWork from '../DescriptionWork/DescriptionWork';

import './MainPage.css';

export default function MainPage() {
  return (
    <div className='MainPag'>
      <DescriptionSite></DescriptionSite>
      <DescriptionWork></DescriptionWork>
    </div>
  )
}
