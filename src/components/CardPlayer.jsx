import { Box, Collapse } from '@mui/material';
import { use, useState } from 'react';
import { useEffect } from 'react';

export default function CardPlayer({jugadorActivo}){
  const playerTemplate = { nombre: "", puntuacion: null, image: 'cardGold', dark: false }
  const [player, setPlayer] = useState(playerTemplate)

  useEffect(()=>{
    setPlayer(jugadorActivo)
  },[jugadorActivo])


  const resetPlayer = () => {
    setPlayer({...playerTemplate, image: player.image})
  }

  const randomStat = () => {
    return Math.floor(Math.random() * ((player.puntuacion + 5) - 50 + 1)) + 50
  }

  if(player){
    return (
      <Collapse in={player.puntuacion !== null} onClick={()=>resetPlayer()}
        className={`${player.dark ? 'theme-dark' : 'theme-light'} p-absolute`} sx={{width:"403px"}}>
        <Box className="w-100 p-relative">
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
                <div style={{fontSize:'1.6em'}}>{ player.puntuacion }</div>
                { player.puntuacion && <div> {player.nombre.split(' ')[0]} </div> }
                <img src="/img/arg.png" alt="logoCiber"
                  style={{objectFit:'cover', width:'1.8em'}}/>
                <img src={"/img/logoCiber.png"} alt="logoCiber"
                  style={{objectFit:'cover', width:'2.2em'}}/>
              </div>
  
              { player.puntuacion && <img src={"/img/user.png"} style={{marginLeft:'43px', width:'203px'}} alt="userImage"/> }
              <div> { player.nombre } </div>
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
          <img className='w-100' src={`/img/cards/${player.image}.png`} alt="card"/>
        </Box>
      </Collapse>
    )
  }
}