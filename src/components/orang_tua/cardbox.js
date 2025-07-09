import React from 'react';

const CardBox = ({ title, children, icon }) => {
  return (
    <div className="bg-white p-3 rounded shadow-sm" style={{ minWidth: '250px', flex: 1 }}>
      <h6 className="mb-3">
        {icon && <i className={`bi ${icon} me-2`}></i>}
        {title}
      </h6>
      {children}
    </div>
  );
};

export default CardBox;
