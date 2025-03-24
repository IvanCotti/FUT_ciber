import React, { useState, useEffect } from 'react';
import { Button, Card, Grow, Dialog } from '@mui/material';
import { 
  Groups as EquipoIcon,
  Close as CloseIcon
} from '@mui/icons-material';

export default function PlayersList({jugadores, showList, setShow}){
  const [editJugadores, setEditJugadores] = useState(null);

  // localStorage.setItem("jugadores",JSON.stringify(nuevosJugadores))
  useEffect(()=>{
    setEditJugadores(jugadores)
  },[jugadores])

  const sumarJugador = () => {
    let nuevosJugadores = [...jugadores,{ "nombre": "NO Jugador", "puntuacion": 75, image: 'cardGold', dark: false}]
    setEditJugadores(nuevosJugadores)
  }

  const handleInput = (index, input, number = false) => {
    if(!number){
      setEditJugadores((prev) => prev.map((o,i) => i === index ? {...o, nombre: input} : o ))
    } else {
      setEditJugadores((prev) => prev.map((o,i) => i === index ? {...o, puntuacion: parseInt(input)} : o ))
    }
  }

  if(editJugadores){
    return (
      <Dialog open={showList}>
        <Grow in={showList} unmountOnExit>
          <Card sx={{minWidth:'300px'}}>
            <div className='cardHeader justify-space-between'>
              <div className='f-row align-items'>
                <EquipoIcon className='mr-1'/> Lista de Jugadores
              </div>
              <CloseIcon className='closeIcon' onClick={() => setShow(false)}/>
            </div>
            <div className='cardContent'>
              <div className='dataList w-100'>
                {
                  editJugadores.map((j, i) => (
                    <section key={'user'+i} className='f-row p-relative pa-05'>
                      <input style={{width:'50px'}} className='mr-1' type='number' value={j.puntuacion} onChange={(e) => handleInput(i, e.target.value, true)}></input>
                      <input type='text' value={j.nombre} onChange={(e) => handleInput(i, e.target.value)}></input>
                    </section>
                  ))
                }
                <Button className='w-100' onClick={()=>sumarJugador()}>Agregar Nuevo</Button>
              </div>
            </div>
          </Card>  
        </Grow>
      </Dialog>
    )
  }
}