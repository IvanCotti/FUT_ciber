import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Collapse, Grow } from '@mui/material';
import { 
  Person as JugadorIcon,
  Shuffle as RandomIcon,
  QueryStats as IntelIcon,
} from '@mui/icons-material';

export default function App() {
  const playerTemplate = { nombre: "", puntuacion: null, image: 'cardGold', dark: false }
  const [equipos, setEquipos] = useState(null)
  const [jugadorActivo, setJugadorActivo] = useState(playerTemplate)
  const [balanced, setBalanced] = useState(null)

  useEffect(() => {
    if(equipos !== null){
      if( equipos[0].promedio === equipos[1].promedio ){
        setBalanced(true)
      }
      else{
        setBalanced(false)
      }
    }
  }, [equipos]);

  const generarEquipos = (filtro = false) => {
    let equipo = [
      { "nombre": "SG Bernal", "puntuacion": 80, image: 'cardGold', dark: false},
      { "nombre": "VS Bellati", "puntuacion": 87, image: 'cardGoldBlack', dark: true},
      { "nombre": "VP Cotti", "puntuacion": 74, image: 'cardSilver', dark: false},
      { "nombre": "MY Teruya", "puntuacion": 85, image: 'cardGold', dark: false},
      { "nombre": "CT Barrios", "puntuacion": 82, image: 'cardGold', dark: false},
      { "nombre": "SA Belizan", "puntuacion": 86, image: 'cardGoldBlack', dark: true},
      { "nombre": "SI Ojeda", "puntuacion": 89, image: 'cardGoldBlack', dark: true},
      { "nombre": "CT Garcias", "puntuacion": 83, image: 'cardGold', dark: false},
      { "nombre": "VP Giunti", "puntuacion": 79, image: 'cardGold', dark: false},
      { "nombre": "CB Lopez", "puntuacion": 87, image: 'cardGoldBlack', dark: true}
    ];

    equipo.sort(() => 0.5 - Math.random());
    if(filtro){
      let equipo1 = [];
      let equipo2 = [];
      let sumEquipo1 = 0;
      let sumEquipo2 = 0;

      equipo.forEach((item, index) => {
          if (index < equipo.length / 2) {
              equipo1.push(item);
              sumEquipo1 += item.puntuacion;
          } else {
              equipo2.push(item);
              sumEquipo2 += item.puntuacion;
          }
      });

      let promedioEquipo1 = sumEquipo1 / equipo1.length;
      let promedioEquipo2 = sumEquipo2 / equipo2.length;

      setEquipos(
        [
          {
            lista: equipo1,
            promedio: promedioEquipo1.toFixed(2)
          },
          {
            lista: equipo2,
            promedio: promedioEquipo2.toFixed(2)
          }
        ]
      )
    } else {
      setEquipos(
        [
          {
            lista: equipo.slice(0, equipo.length /2 ),
            promedio: 0
          },
          {
            lista: equipo.slice(equipo.length /2 ),
            promedio: 0
          }
        ]
      )
    }
  }

  const llenarCard = (jugador) => {
    setJugadorActivo(jugador)
  }

  const randomStat = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const resetJugadorActivo = () => {
    setJugadorActivo(playerTemplate)
  }

  return (
    <center className='f-row pa-2 justify-center align-center h-100 w-100'>

      <Box className="container f-col justify-center scroll-2 h-100">

        <Collapse in={equipos !== null}>
          <Card className="mb-2" sx={{height: '15em'}}>
            <div className='cardHeader justify-center'>
              <span>Lugar</span>
            </div>
            <div className='cardContent'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6569.2387308014495!2d-58.37842266011174!3d-34.58849659753442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccab2276ca0af%3A0x4173ec14f086f82!2sF%C3%BAtbol%20Retiro!5e0!3m2!1ses-419!2sar!4v1726666712925!5m2!1ses-419!2sar"
                height="100%"
                title="iframe"
                style={{ border: '0', width: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Card>

          <Grow in={ balanced }>
            <Box className='pa-1 w-100 my-1'>
              Balanceado
            </Box>
          </Grow>

          <div className='f-row mb-2 f-gap'>
          {
            equipos && equipos.map((equipo, num) => (
              <Card className="w-50" sx={{minHeight: '10em'}}>
                <div className='cardHeader justify-space-between'>
                  <span>Equipo {num + 1}</span>
                  <span>{equipo.promedio}</span>
                </div>
                <div className='cardContent'>
                  <div className='dataList h-100'>
                    { 
                      equipo.lista.map((j,i) => (
                      <section className='f-row p-relative' onClick={()=>llenarCard(j)}>
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

        <Grow in={equipos == null}>
          <Box>
            { equipos == null && <img src='/img/fut_logo.png'/> }
          </Box>
        </Grow>

        <Card className='f-row f-gap mt-2 pa-1'>
          <Button variant="contained" className="w-100" onClick={()=>generarEquipos(true)}>
            <IntelIcon/> <span className='title bold w-100'> Generar Inteligente </span>
          </Button>
          <Button variant="contained" color="success" className="w-100" onClick={()=>generarEquipos(false)}>
            <RandomIcon/> <span className='title bold w-100'> Generar Aleatorio</span>
          </Button>
        </Card>
      </Box>
      
      <Collapse in={jugadorActivo.puntuacion !== null} className={`${jugadorActivo.dark ? 'theme-dark' : 'theme-light'} p-absolute`} sx={{width:"403px"}}>
        <Box className="w-100 p-relative">
          <Box className="p-absolute w-100" sx={{top:'0em'}}>
            <Button variant="contained" color="success" onClick={()=>resetJugadorActivo()}>Cerrar</Button>  
          </Box>

          <Box className='f-col align-center f-gap p-absolute' sx={{
            top: '90px',
            textAlign: 'center',
            width: '100%',
            color: '#000000b0',
            fontWeight: 700,
            fontSize: '1.5rem',
            position: 'relative'
          }}>
            <Box className="w-50">
              <div className='p-absolute f-col align-center' style={{top:'-10px',left:'89px', gap:'4px'}}>
                <div style={{fontSize:'1.6em'}}>{ jugadorActivo.puntuacion }</div>
                {jugadorActivo.puntuacion && <div >{jugadorActivo.nombre.split(' ')[0]}</div>}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Ls2LH_xjmWFsXlYZTbipzCyBu6jXglnEJA&s" alt="logoCiber"
                  style={{objectFit:'cover', width:'1.8em'}}/>
                <img src={"/img/logoCiber.png"} alt="logoCiber"
                  style={{objectFit:'cover', width:'2.2em'}}/>
              </div>

              { jugadorActivo.puntuacion && <img src={"/img/user.png"} style={{marginLeft:'43px', width:'203px'}} alt="userImage"/> }
              <div> { jugadorActivo.nombre } </div>
            </Box>
            
  
            <Box className='w-50 f-col justify-center stats' sx={{fontSize: '1em'}}>
              <div className='f-row justify-space-between w-100 f-gap'>
                <section><div>{randomStat(30,90)}</div><div>RIT</div></section>
                <section><div>{randomStat(30,90)}</div><div>REG</div></section>
              </div>
              <div className='f-row justify-space-between w-100 f-gap'>
                <section><div>{randomStat(30,90)}</div><div>TIR</div></section>
                <section><div>{randomStat(30,90)}</div><div>DEF</div></section>
              </div>
              <div className='f-row justify-space-between w-100 f-gap'>
                <section><div>{randomStat(30,90)}</div><div>PAS</div></section>
                <section><div>{randomStat(30,90)}</div><div>FIS</div></section>
              </div>
            </Box>
          </Box>
          <img className='w-100' src={`/img/cards/${jugadorActivo.image}.png`} alt="card"/>
        </Box>
      </Collapse>
      
    </center>
  )
};