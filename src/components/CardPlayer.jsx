import { Box, Collapse } from '@mui/material';
import { useState, useEffect } from 'react';

export default function CardPlayer({jugadorActivo, setJugadorActivo}){
  const cardsDarkTheme = ["cardGoldBlack"]
  const playerTemplate = { nombre: "", puntuacion: null, image: null}
  const [player, setPlayer] = useState(playerTemplate)

  useEffect(()=>{
    if(jugadorActivo !== null){
      setPlayer(jugadorActivo)
    }
  },[jugadorActivo])

  const resetPlayer = () => {
    setPlayer({...playerTemplate, image: player.image})
    setTimeout(()=>{
      setJugadorActivo(null)
    },300)
  }

  const randomStat = () => {
    return Math.floor(Math.random() * ((player.puntuacion + 5) - 50 + 1)) + 50
  }

  const displayName = (name) => {
    let divido = name.split(" ")
    if(divido[0].length <= 3){
      let pre = divido[0]
      divido = divido.filter((_, i) => i !== 0)
      return {name: divido.join(" ").toUpperCase(), pre: pre} 
    } else {
      return {name: name.toUpperCase(), pre: "FUT"}
    }
  }

  if(player){
    return (
      <Collapse in={player.puntuacion !== null} onClick={()=>resetPlayer()}
        className={`${cardsDarkTheme.includes(player.image) ? 'theme-dark' : 'theme-light'} p-absolute`} sx={{width:"403px"}}>
        <Box className="card-player">
          <Box className='f-col align-center p-absolute' sx={{
            top: '85px',
            textAlign: 'center',
            width: '100%',
            color: '#000000b0',
            fontWeight: 700,
            fontSize: '1.5rem',
            position: 'relative',
            gap: "15px"
          }}>
            <Box className="w-50">
              <div className='p-absolute f-col align-center' style={{top:'-8px',left:'89px', gap:'9px'}}>
                <div style={{fontSize:'1.6em',borderBottom:"2px solid #13131330;"}}>
                  { player.puntuacion }
                </div>
                { player.puntuacion && <div> { displayName(player.nombre).pre } </div> }
                <img src={`${process.env.PUBLIC_URL}/img/arg.png`} alt="logoCiber" style={{objectFit:'cover', width:'1.8em'}}/>
                <img src={`${process.env.PUBLIC_URL}/img/logoCiber.png`} alt="logoCiber" style={{objectFit:'cover', width:'2.2em'}}/>
              </div>
  
              { player.puntuacion && <img src={`${process.env.PUBLIC_URL}/img/user.png`} style={{marginLeft:'43px', width:'194px'}} alt="userImage"/> }
              <div className='nombre'> { displayName(player.nombre).name } </div>
            </Box>
            
  
            <Box className='w-50 f-col justify-center stats' sx={{fontSize: '1em'}}>
              <div className='f-row justify-space-between w-100 f-gap'>
                <section><div>{randomStat()}</div><div>RIT</div></section>
                <section><div>{randomStat()}</div><div>REG</div></section>
              </div>
              <div className='f-row justify-space-between w-100 f-gap'>
                <section><div>{randomStat()}</div><div>TIR</div></section>
                <section><div>{randomStat()}</div><div>DEF</div></section>
              </div>
              <div className='f-row justify-space-between w-100 f-gap'>
                <section><div>{randomStat()}</div><div>PAS</div></section>
                <section><div>{randomStat()}</div><div>FIS</div></section>
              </div>
            </Box>
          </Box>
          <img className='w-95' src={`${process.env.PUBLIC_URL}/img/cards/${player.image}.png`} alt="card"/>
        </Box>
      </Collapse>
    )
  }
}