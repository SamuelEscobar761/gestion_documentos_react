import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Documento from "../components/Documento";

const CarpetaPage = ({ setTitle, setUpload, nombre, documentos, handleDocumentoSeleccionado }) => {
  

  return (
    <>
      {documentos
        .filter((documento) => documento.carpeta.replace(/\s/g, "") === nombre.replace(/\s/g, ""))
        .map((documento, index) => (
            <div key={index} onClick={() => {handleDocumentoSeleccionado(documento)}}>
            <Documento nombre={documento.nombre} />
            </div>
      ))}

      <Button variant="outlined" onClick={() => setUpload()}>
        Nuevo Documento
      </Button>
      <Button variant="outlined" onClick={() => setTitle("Inicio")}>
        Inicio
      </Button>
    </>
  );
};

export default CarpetaPage;
