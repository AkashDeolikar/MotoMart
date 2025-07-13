// component/utility/AllVehicleShowcase.js
import React from 'react';
import showcaseData from './showcaseData';
import VehicleShowcase from './VehicleShowcase';

const AllVehicleShowcase = () => {
  return (
    <div>
      {showcaseData.map((data, index) => (
        <VehicleShowcase key={index} data={data} />
      ))}
    </div>
  );
};

export default AllVehicleShowcase;
