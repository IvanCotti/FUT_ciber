import { useState, useEffect } from 'react';
import { Box, Card, Collapse, Grow, CircularProgress, IconButton, Snackbar } from '@mui/material';
import { 
  Person as JugadorIcon,
  Shuffle as RandomIcon,
  CompareArrows as CompareIcon,
  ArrowBack as BackIcon,
  ContentCopy as CopyIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import CardPlayer from "./components/CardPlayer"
import PlayersList from "./components/PlayersList"

export default function App() {
  const [equipos, setEquipos] = useState(null)
  const [balanced, setBalanced] = useState(0)
  const [copied, setCopied] = useState(false);
  
  const [jugadorActivo, setJugadorActivo] = useState(null)
  
  const borrame = [
    { nombre: "John Doe", score: 90, pos: "PO"},
    { nombre: "Lorem Ipsum", score: 83, pos: "PO"},
    { nombre: "James Baxter", score: 82, pos: "PO"},
    { nombre: "Cisco Systems", score: 86, pos: "PO"},
    { nombre: "Jim Halpert", score: 89, pos: "PO"},
    { nombre: "Chris Evans", score: 80, pos: "PO"},
    { nombre: "Nicholas Tesla", score: 87, pos: "PO"},
    { nombre: "Michael Scott", score: 87, pos: "PO"},
    { nombre: "Mussolinni", score: 79, pos: "PO"},
    { nombre: "Undefined", score: 81, pos: "PO"},
  ]

  const [jugadores, setJugadores] = useState(borrame);
  const [showJugadoresList, setShowJugadoresList] = useState(false);

  useEffect(() => {
    let storagePlayers = JSON.parse(localStorage.getItem("jugadores"))
    if(storagePlayers && storagePlayers.length > 0){
      setJugadores(storagePlayers)
    }
  },[])

  useEffect(() => {
    if (equipos !== null) {
      const prom1 = equipos[0].promedio;
      const prom2 = equipos[1].promedio;

      if (prom1 !== null && prom2 !== null) {
        const min = Math.min(prom1, prom2);
        const max = Math.max(prom1, prom2);

        const indiceBalanceo = ((min / max) * 100).toFixed(2);
        setBalanced(indiceBalanceo);
      } else {
        setBalanced(0);
      }
    }
  }, [equipos]);

  const copiarAlPortapapeles = () => {
    const iconos = ["🟥", "🟦"];

    const texto = equipos
      .map((equipo, idx) => {
        const jugadores = equipo.lista
          .map((jugador) => `- ${jugador.nombre}`)
          .join("\n");
        return `${iconos[idx]} ${equipo.nombre}\n${jugadores}`;
      })
      .join("\n\n");

    navigator.clipboard.writeText(texto).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000);
    });
  };

  const generarEquipos = (filtro = false) => {
    jugadores.sort(() => 0.5 - Math.random());
    if(filtro){
      let equipo1 = [];
      let equipo2 = [];
      let sumEquipo1 = 0;
      let sumEquipo2 = 0;

      jugadores.forEach((item, index) => {
          if (index < jugadores.length / 2) {
              equipo1.push(item);
              sumEquipo1 += item.score;
          } else {
              equipo2.push(item);
              sumEquipo2 += item.score;
          }
      });

      let promedioEquipo1 = sumEquipo1 / equipo1.length;
      let promedioEquipo2 = sumEquipo2 / equipo2.length;

      setEquipos(
        [
          {
            lista: equipo1,
            promedio: promedioEquipo1.toFixed(2),
            nombre: equipos && equipos[0].nombre ? equipos[0].nombre : 'Equipo 1'
          },
          {
            lista: equipo2,
            promedio: promedioEquipo2.toFixed(2),
            nombre: equipos && equipos[1].nombre ? equipos[1].nombre : 'Equipo 2'
          }
        ]
      )
    } else {
      setEquipos(
        [
          {
            lista: jugadores.slice(0, jugadores.length /2 ),
            promedio: null,
            nombre: equipos && equipos[0].nombre ? equipos[0].nombre : 'Equipo 1'
          },
          {
            lista: jugadores.slice(jugadores.length /2 ),
            promedio: null,
            nombre: equipos && equipos[1].nombre ? equipos[1].nombre : 'Equipo 2'
          }
        ]
      )
    }
  }

  const handleEquipoNombre = (index, input) => {
    setEquipos((prev) => prev.map((o,i) => i === index ? {...o, nombre: input} : o ))
  }

  return (
    <center className='f-row justify-center align-center h-100 w-100'>

      <Box className="container f-col justify-center scroll-2 h-100">

        <Collapse in={equipos !== null} className='p-relative'>

          {balanced !== 0 &&
            <div className={balanced === "100.00" ? 'perfect container-result' : 'container-result'}>
              <center className="contador-players align-center justify-center">
                <label>{balanced}%</label>
                <CircularProgress size="300px" variant="determinate" value={balanced}/>
                <span style={{fontSize: "2em"}}>
                  Balanceado
                </span>
                <IconButton className='copy-btn' onClick={copiarAlPortapapeles}>
                  <Grow in={!copied}>
                    <CopyIcon/>
                  </Grow>
                  <Grow in={copied} className='p-absolute' sx={{scale: "2"}}>
                    <CheckIcon/>
                  </Grow>
                </IconButton>
              </center>
            </div>
          }

          {/* ■■■■■■■■■■■■■■■■■■ Tablas ■■■■■■■■■■■■■■■■■■ */}
          <div className='container-equipos f-row f-gap justify-center'>
          {
            equipos && equipos.map((equipo, num) => (
              <Card className="w-50" sx={{minHeight: '10em'}} key={num}>
                <div className='cardHeader justify-space-between'>
                  <input type='text' value={ equipo.nombre } onChange={(e) => handleEquipoNombre(num, e.target.value)}></input>
                  <span className='px-1'>{ equipo.promedio }</span>
                </div>
                <div className='cardContent'>
                  <div className='dataList h-100'>
                    { 
                      equipo.lista.map((j,i) => (
                      <section key={'user'+i} className='f-row p-relative' onClick={()=>setJugadorActivo(j)}>
                        <div className='f-row align-center w-10 mr-1'> <JugadorIcon/></div>
                        <div> {j.nombre} </div>
                      </section>
                      ))
                    }
                  </div>
                </div>
              </Card>
            )) 
          }
          </div>
        </Collapse>

        {/* ■■■■■■■■■■■■■■■■■■ FUT LOGO ■■■■■■■■■■■■■■■■■■ */}
        <Grow in={ equipos === null } unmountOnExit>
          <Box id='FUT_logo'>
            { equipos === null && <img className='a-pulse w-75' src={`${process.env.PUBLIC_URL}/img/fut_logo.png`}alt="logo FUT"/> }
          </Box>
        </Grow>

        {/* ■■■■■■■■■■■■■■■■■■ Botonera ■■■■■■■■■■■■■■■■■■ */}
        <Box className='botonera f-col f-gap mt-2 pa-1' sx={{margin: "0 auto"}}>

          <div className='f-row f-gap f-wrap justify-center'>
            <Box className="custom-btn btn-3" onClick={()=>generarEquipos(true)}>
              <div className='name'> Generar Equipos </div>
              <section> En base a media de Jugadores </section>
              <CompareIcon/>
            </Box>
            <Box className="custom-btn btn-3" onClick={()=>generarEquipos(false)}>
              <div className='name'> Aleatorio</div>
              <section> Seleccion al azar </section>
              <RandomIcon/>
            </Box>
            { equipos !== null &&
              <Box className='custom-btn' onClick={()=>setEquipos(null)}>
                <div className='name'> Atras </div>
                <section>Volver al Menu</section>
                <BackIcon/>
              </Box>
            }
          </div>

          

          { equipos === null &&
            <div className='f-row f-gap'>
              <Box className="custom-btn btn-2 flex-2" onClick={()=>setShowJugadoresList(true)}>
                <div className='name'> Lista de Jugadores </div>
                <section> Modifica la lista completa de los jugadores convocados </section>
                <img src={`${process.env.PUBLIC_URL}/img/team.png`} alt="fondo"/>
              </Box>
            </div>
          }
        </Box>
      </Box>

      <Snackbar
        open={copied}
        className='snacky'
        anchorOrigin={{horizontal: "center", vertical: "top"}}
        message={
        <div className='d-flex align-center f-gap'>
          <CheckIcon/> <b>Equipos Guardados</b> en el Portapapeles
        </div>}
      />

      {/* ■■■■■■■■■■■■■■■■■■ Carta de Jugador ■■■■■■■■■■■■■■■■■■ */}
      <CardPlayer jugadorActivo={jugadorActivo} setJugadorActivo={setJugadorActivo}/>

      {/* ■■■■■■■■■■■■■■■■■■ Lista de Jugadores MODAL ■■■■■■■■■■■■■■■■■■ */}
      <PlayersList jugadores={jugadores} setJugadores={setJugadores} showList={showJugadoresList} setShow={setShowJugadoresList}/>
      
    </center>
  )
};