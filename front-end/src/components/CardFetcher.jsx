import React, { Suspense } from 'react';
import Card from './Card'; // Import the Card component

const CardFetcher = () => {
  return (
    <Suspense fallback={<div>Loading cards...</div>}>
      {console.log('sds')}
    <Card />
  </Suspense>
  );
};

export default CardFetcher;
