import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadDocPage = ({ onDocumentUpload, nombreCarpeta }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = () => {
    const files = fileInputRef.current?.files;
    if (files) {
      const documentos = Array.from(files).map(file => {
        const documento: Documento = {
          nombre: file.name,
          carpeta: nombreCarpeta,
          tipo: '',
          fechaModificacion: new Date(),
          disponible: true,
          path: '',
        };
        return documento;
      });
      onDocumentUpload(documentos);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      const documentos = files.map(file => {
        const documento: Documento = {
          nombre: file.name,
          carpeta: nombreCarpeta,
          tipo: file.type,
          fechaModificacion: new Date(file.lastModified),
          disponible: true,
          path: '',
        };
        return documento;
      });
      onDocumentUpload(documentos);
    }
  };

  return (
    <div className="mb-4 relative">
      <label htmlFor="fileInput" className="cursor-pointer">
        <Typography variant="body1" color="textSecondary">
          Arrastra una imagen o haz clic para seleccionar un archivo
        </Typography>
        <Box
          className="h-96 flex items-center justify-center border-dashed border-2 border-gray-400 rounded-lg p-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <CloudUploadIcon fontSize="large" color="disabled" />
        </Box>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default UploadDocPage;
