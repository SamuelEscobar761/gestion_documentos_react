import React, { useState, useReducer, useRef, useEffect } from 'react';
import { Box, Button, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const initialState = {
  isEditing: false,
  editedNombre: '',
  editedCarpeta: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'EDIT':
      return {
        ...state,
        isEditing: true,
        editedNombre: action.payload.nombre,
        editedCarpeta: action.payload.carpeta,
      };
    case 'CANCEL_EDIT':
      return {
        ...state,
        isEditing: false,
        editedNombre: '',
        editedCarpeta: '',
      };
    case 'SAVE':
      return {
        ...state,
        isEditing: false,
      };
    case 'UPDATE_NOMBRE':
      return {
        ...state,
        editedNombre: action.payload,
      };
    case 'UPDATE_CARPETA':
      return {
        ...state,
        editedCarpeta: action.payload,
      };
    default:
      return state;
  }
};

const DocumentoPage = ({ documento, carpetas, documentos, setDocumentos, setTitle }) => {
  const nombreCarpeta = documento.carpeta;
  const [state, dispatch] = useReducer(reducer, initialState);

  const nombreInputRef = useRef(null);
  const carpetaSelectRef = useRef(null);

  useEffect(() => {
    if (state.isEditing) {
      nombreInputRef.current.focus();
    }
  }, [state.isEditing]);

  const handleNombreChange = (event) => {
    dispatch({ type: 'UPDATE_NOMBRE', payload: event.target.value });
  };

  const handleCarpetaChange = (event) => {
    dispatch({ type: 'UPDATE_CARPETA', payload: event.target.value });
  };

  const handleEdit = () => {
    dispatch({ type: 'EDIT', payload: { nombre: documento.nombre, carpeta: documento.carpeta } });
  };

  const handleDownload = () => {
    const downloadUrl = "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";
    window.open(downloadUrl);
    setTitle(nombreCarpeta);
  };

  const handleDelete = () => {
    const updatedDocumentos = documentos.filter((doc) => doc !== documento);
    setDocumentos(updatedDocumentos);
    setTitle(nombreCarpeta);
  };

  const handleSave = () => {
    dispatch({ type: 'SAVE' });
    setDocumentos((documentos) =>
      documentos.map((doc) => {
        if (doc === documento) {
          return {
            ...doc,
            nombre: state.editedNombre,
            carpeta: state.editedCarpeta,
          };
        }
        return doc;
      })
    );
    setTitle(nombreCarpeta);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
      <Box flex={1}>
        <Typography variant="subtitle1">{documento.nombre}</Typography>
        <Typography variant="body2" color="textSecondary">
          Fecha de modificación: {documento.fechaModificacion.toLocaleString()}
        </Typography>
        {state.isEditing ? (
          <Select ref={carpetaSelectRef} value={state.editedCarpeta} onChange={handleCarpetaChange}>
            {carpetas.map((carpeta) => (
              <MenuItem key={carpeta} value={carpeta}>
                {carpeta}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Carpeta: {documento.carpeta}
          </Typography>
        )}
      </Box>
      <Box>
        {state.isEditing ? (
          <TextField ref={nombreInputRef} value={state.editedNombre} onChange={handleNombreChange} />
        ) : (
          <Typography variant="body2" color="textSecondary">
            Nombre: {documento.nombre}
          </Typography>
        )}
      </Box>
      <Box>
        {state.isEditing ? (
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        ) : (
          <>
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDownload}>
              <CloudDownloadIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DocumentoPage;
