import { useState, useEffect } from 'react';
import { Box, Card, Grow, Dialog } from '@mui/material';
import { 
  Close as CloseIcon,
} from '@mui/icons-material';

export default function PlayersList({jugadores, showList, setShow, setJugadores}){
  const [editJugadores, setEditJugadores] = useState(null);

  useEffect(()=>{
    if(showList){
      setEditJugadores(jugadores)
    }
  },[showList])

  const sumarJugador = () => {
    console.log("Agregando")
    let nuevosJugadores = [...editJugadores,{ "nombre": "NO Jugador", "puntuacion": 75, image: 'cardGold', dark: false}]
    setEditJugadores(nuevosJugadores)
  }

  const handleInput = (index, input, number = false) => {
    if(!number){
      setEditJugadores((prev) => prev.map((o,i) => i === index ? {...o, nombre: input} : o ))
    } else {
      setEditJugadores((prev) => prev.map((o,i) => i === index ? {...o, puntuacion: parseInt(input)} : o ))
    }
  }

  const borrarJugador = (index) => {
    setEditJugadores((prevItems) => prevItems.filter((_, i) => i !== index))
  }

  const guardarJugadores = () => {
    localStorage.setItem("jugadores",JSON.stringify(editJugadores))
    setJugadores(editJugadores)
    setShow(false)
  }

  if(editJugadores){
    return (
      <Dialog open={showList}>
        <Grow in={showList} unmountOnExit>
          <div>
            <center className="contador-players"> 
              <label>{editJugadores.length}</label>
              <span>JUGADORES </span>
            </center>
            <Card className='container-players'>   
              <div className='cardContent'>
                <div className='dataList w-100'>
                  {
                    editJugadores.length > 0 ? 
                    editJugadores.map((j, i) => (
                      <section key={'user'+i} className='f-row p-relative pa-05 justify-space-between'>
                        <div>
                          <input style={{width:'50px'}} className='mr-1' type='number' value={j.puntuacion} onChange={(e) => handleInput(i, e.target.value, true)}></input>
                          <input type='text' value={j.nombre} onChange={(e) => handleInput(i, e.target.value)}></input>
                        </div>
                        <CloseIcon onClick={()=>borrarJugador(i)}/>
                      </section>
                    ))
                    :
                    <div>No Jugadores</div>
                  }
                </div>
              </div>
              <div>
                <Box className='custom-btn' onClick={()=>sumarJugador()}>
                  <div className='name'> Nuevo Jugador </div>
                  <section>Añadir nuevo jugador</section>
                </Box>
                <Box className='custom-btn' onClick={() => guardarJugadores()}>
                  <div className='name'> Confirmar </div>
                  <section>Guardar lista de jugadores</section>
                </Box>
                <Box className='custom-btn' onClick={() => setShow(false)}>
                  <div className='name'> Atras </div>
                  <section>Cerrar sin guardar</section>
                </Box>
              </div>
            </Card>  
          </div>
        </Grow>
      </Dialog>
    )
  }
}