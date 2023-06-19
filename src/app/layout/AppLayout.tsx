import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import Carpeta from "../components/Carpeta";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import UploadDocPage from "../pages/UploadDocPage";
import CarpetaPage from "../pages/CarpetaPage";
import DocumentoPage from "../pages/DocumentoPage";

export default function TemporaryDrawer() {
  const [carpetas, setCarpetas] = useState<string[]>(() => {
    const storedCarpetas = localStorage.getItem("carpetas");
    if (storedCarpetas) {
      return JSON.parse(storedCarpetas);
    } else {
      return [];
    }
  })
  const [nuevaCarpeta, setNuevaCarpeta] = useState("");
  const [toggle, setToggle] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("Inicio");
  const [nombreCarpeta, setNombreCarpeta] = useState("");
  const [documentos, setDocumentos] = useState<Documento[]>(() => {
    const storedDocumentos = localStorage.getItem("documentos");
    if (storedDocumentos) {
      return JSON.parse(storedDocumentos);
    } else {
      return [];
    }
  });
  
  const [nuevosDocumentos, setNuevosDocumentos] = useState<Documento[]>([]);
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState();
  const documentosMemoizados = useMemo(() => [...documentos], [documentos]);
  const navigate = useNavigate();

  const agregarCarpeta = () => {
    if (nuevaCarpeta) {
      setCarpetas([...carpetas, nuevaCarpeta]);
      setNuevaCarpeta("");
      setOpenDialog(false);
    }
  };

  const listMenu = [
    { name: "Home", icon: <HomeWorkIcon />, to: "/" },
    { name: "Items", icon: <ProductionQuantityLimitsIcon />, to: "items" },
  ];

  const documentosEjemplo: Documento[] = [
    {
      nombre: "Documento1",
      carpeta: "Carpeta 1",
      tipo: "PDF",
      fechaModificacion: new Date(),
      disponible: true,
      path: "/ruta/documento1.pdf",
    },
    {
      nombre: "Documento2",
      carpeta: "Carpeta 2",
      tipo: "Word",
      fechaModificacion: new Date(),
      disponible: false,
      path: "/ruta/documento2.docx",
    },
    {
      nombre: "Documento3",
      carpeta: "Carpeta 1",
      tipo: "Excel",
      fechaModificacion: new Date(),
      disponible: true,
      path: "/ruta/documento3.xlsx",
    },
  ] as Documento[];

  useEffect(() => {
    const storedCarpetas = localStorage.getItem("carpetas");
    if (storedCarpetas) {
      setCarpetas(JSON.parse(storedCarpetas));
    } else {
      setCarpetas(['Carpeta 1', 'Carpeta 2', 'Carpeta 3']);
    }
  }, []);

  useEffect(() => {
    const storedDocumentos = localStorage.getItem("documentos");
    if (storedDocumentos) {
      setDocumentos(JSON.parse(storedDocumentos));
    } else {
      setDocumentos(documentosEjemplo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carpetas", JSON.stringify(carpetas));
  }, [carpetas]);

  useEffect(() => {
    localStorage.setItem("documentos", JSON.stringify(documentos));
  }, [documentos]);

  const goTo = (url: string) => {
    navigate(url);
  };

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setToggle(open);
  };

  const handleAbrirDialog = () => {
    setOpenDialog(true);
  };

  const handleCerrarDialog = () => {
    setOpenDialog(false);
  };

  const handleAbrirCarpeta = (nombre) => {
    setTitle(nombre);
    setNombreCarpeta(nombre);
  }

  const setUpload = () => {
    setTitle("Upload");
  } 

  const guardarDocumentos = () => {
    setDocumentos([...documentos, ...nuevosDocumentos]);
    setTitle(nombreCarpeta);
  }

  const handleDocumentoSeleccionado = (documento) => {
    setDocumentoSeleccionado(documento);
    setTitle("Doc")
  }

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {listMenu.map((menuItem, index) => (
          <ListItem key={menuItem.name} disablePadding>
            <ListItemButton onClick={() => goTo(menuItem.to)}>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <NavBar toggle={toggleDrawer} title={title} />
      <Drawer anchor={"left"} open={toggle} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <main>
          {(title === "Inicio") ? (
            <>
              {carpetas.map((nombre, index) => (
                <div key={index} onClick={() => handleAbrirCarpeta(nombre)}>
                  <Carpeta nombre={nombre} />
                </div>
              ))}
              <Button variant="outlined" onClick={handleAbrirDialog}>
                Nueva Carpeta
              </Button>
            </>
          ): (title === "Upload") ? (
            <>
            <UploadDocPage onDocumentUpload={setNuevosDocumentos} nombreCarpeta={nombreCarpeta}/>
            <Button variant="outlined" onClick={guardarDocumentos}>
              Guardar
            </Button>
            </>
          ) : (title === "Doc" ) ? (
            <>
            <DocumentoPage
              documento={documentoSeleccionado}
              carpetas={carpetas}
              documentos={documentosMemoizados}
              setDocumentos={setDocumentos}
              setTitle={setTitle}
            />
            </>
          ) : (
            <>
              <CarpetaPage setTitle={setTitle} setUpload={setUpload} nombre={nombreCarpeta} handleDocumentoSeleccionado={handleDocumentoSeleccionado}  documentos={documentos} />
            </>
          )}
          
          <Dialog open={openDialog} onClose={handleCerrarDialog}>
            <DialogTitle>Agregar nueva carpeta</DialogTitle>
            <DialogContent>
              <TextField
                label="Nombre de la carpeta"
                value={nuevaCarpeta}
                onChange={(e) => setNuevaCarpeta(e.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCerrarDialog}>Cancelar</Button>
              <Button onClick={agregarCarpeta}>Agregar</Button>
            </DialogActions>
          </Dialog>
      </main>
    </div>
  );
}
