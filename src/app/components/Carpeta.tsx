import React from 'react';
import { RiFolderFill } from 'react-icons/ri';

const Carpeta = React.memo(({ nombre }) => {
  return (
    <div className="carpeta">
      <RiFolderFill size={24} />
      <p>{nombre}</p>
    </div>
  );
});

export default Carpeta;
