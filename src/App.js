import { useState, useEffect } from 'react';
import { Box, Card, Collapse, Grow } from '@mui/material';
import { 
  Person as JugadorIcon,
} from '@mui/icons-material';

import CardPlayer from "./components/CardPlayer"
import PlayersList from "./components/PlayersList"

export default function App() {
  const [equipos, setEquipos] = useState(null)
  const [balanced, setBalanced] = useState('')
  
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
    if(equipos !== null){
      const prom1 = equipos[0].promedio
      const prom2 = equipos[1].promedio
      if(prom1 !== null || prom2 !== null){
        if(prom1 === prom2) {
          setBalanced('Perfectamente Balanceado')
        } else if(Math.abs(prom1 - prom2) <= 1) {
          setBalanced('Balanceado')
        } else if(Math.abs(prom1 - prom2) <= 2) {
          setBalanced('No Muy Balanceado')
        } else {
          setBalanced('')
        }
      } else {
        setBalanced('')
      }
    }
  }, [equipos]);

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

          <Grow in={ balanced !== '' } unmountOnExit>
            <Box id='balance_label' className={`${balanced[0] === 'P' ? 'perfect ':''}`}>
              { balanced }
            </Box>
          </Grow>

          {/* ■■■■■■■■■■■■■■■■■■ Tablas ■■■■■■■■■■■■■■■■■■ */}
          <div className='container-equipos f-row f-gap'>
          {
            equipos && equipos.map((equipo, num) => (
              <Card className="w-50" sx={{minHeight: '10em'}} key={num}>
                <div className='cardHeader justify-space-between'>
                  <input type='text' value={ equipo.nombre } onChange={(e) => handleEquipoNombre(num, e.target.value)}></input>
                  <span>{ equipo.promedio }</span>
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

        {/* ■■■■■■■■■■■■■■■■■■ Lista de Jugadores MODAL ■■■■■■■■■■■■■■■■■■ */}
        <PlayersList jugadores={jugadores} setJugadores={setJugadores} showList={showJugadoresList} setShow={setShowJugadoresList}/>

        {/* ■■■■■■■■■■■■■■■■■■ Botonera ■■■■■■■■■■■■■■■■■■ */}
        <Box className='botonera f-col f-gap mt-2 pa-1' sx={{margin: "0 auto"}}>

          <div className='f-row f-gap'>
            <Box className="custom-btn btn-3" onClick={()=>generarEquipos(true)}>
              <div className='name'> Generar Equipos </div>
              <section> En base a media de Jugadores </section>
              <img src={`${process.env.PUBLIC_URL}/img/team.png`} alt="fondo"/>
            </Box>
            <Box className="custom-btn btn-3" onClick={()=>generarEquipos(false)}>
              <div className='name'> Aleatorio</div>
              <section> Seleccion al azar </section>
              <img src={`${process.env.PUBLIC_URL}/img/team2.png`} alt="fondo"/>
            </Box>
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

      {/* ■■■■■■■■■■■■■■■■■■ Atras ■■■■■■■■■■■■■■■■■■ */}
      <Grow in={equipos !== null} unmountOnExit className='p-absolute w-100' sx={{bottom:'40px'}}>
        <Box className='f-row justify-center pa-2'>
          <Box className='custom-btn' onClick={()=>setEquipos(null)}>
            <div className='name'> Atras </div>
            <section>Volver al Menu</section>
          </Box>
        </Box>
      </Grow>

      {/* ■■■■■■■■■■■■■■■■■■ Carta de Jugador ■■■■■■■■■■■■■■■■■■ */}
      <CardPlayer jugadorActivo={jugadorActivo} setJugadorActivo={setJugadorActivo}/>
      
    </center>
  )
};