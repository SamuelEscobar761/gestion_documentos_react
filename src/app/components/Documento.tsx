import React from 'react';
import DescriptionIcon from '@mui/icons-material/Description';

interface CarpetaProps {
  nombre: string;
}

const Carpeta: React.FC<CarpetaProps> = ({ nombre }) => {
  return (
    <div className="carpeta">
      <DescriptionIcon/>
      <p>{nombre}</p>
    </div>
  );
};

export default Carpeta;
