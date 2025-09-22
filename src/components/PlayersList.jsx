import { useState, useEffect, useRef } from 'react';
import { Box, Card, Grow, Dialog, Select, MenuItem } from '@mui/material';
import { 
  Close as CloseIcon,
} from '@mui/icons-material';

const posiciones = [
  { value: 'PO', label: 'Portero' },
  { value: 'DFC', label: 'Defensa central' },
  { value: 'LD', label: 'Lateral derecho' },
  { value: 'LI', label: 'Lateral izquierdo' },
  { value: 'MCD', label: 'Mediocentro defensivo' },
  { value: 'MC', label: 'Mediocentro' },
  { value: 'MCO', label: 'Mediocentro ofensivo' },
  { value: 'MD', label: 'Mediocampista derecho' },
  { value: 'MI', label: 'Mediocampista izquierdo' },
  { value: 'ED', label: 'Extremo derecho' },
  { value: 'EI', label: 'Extremo izquierdo' },
  { value: 'DC', label: 'Delantero centro' },
  { value: 'SD', label: 'Segundo delantero' }
];


export default function PlayersList({jugadores, showList, setShow, setJugadores}){
  const ultimoPlayer = useRef(null);
  const [editJugadores, setEditJugadores] = useState(null);

  useEffect(()=>{
    if(showList){
      setEditJugadores(jugadores.sort((b, a) => a.score - b.score))
    }
  },[showList,jugadores])

  useEffect(() => {
    if (ultimoPlayer.current) {
      ultimoPlayer.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [editJugadores]);

  const sumarJugador = () => {
    const nuevoJugador = {
      nombre: "Nuevo Jugador",
      pos: "PO",
      image: "cardGold",
      score: 75,
    }
    let nuevosJugadores = [...editJugadores, nuevoJugador]
    setEditJugadores(nuevosJugadores)
  }

  const calcularCard = (media) => {
    if(media < 64){
      return "cardBronze"
    }
    else if(media < 75){
      return "cardSilver"
    }
    else if(media < 86){
      return "cardGold"
    }
    else{
      return "cardGoldBlack"
    }
  }

  const handleInput = (index, input, number = false) => {
    if(!number){
      setEditJugadores((prev) => prev.map((o,i) => i === index ? {...o, nombre: input} : o ))
    } else {
      let media = parseInt(input);
      let card = calcularCard(media);
      setEditJugadores((prev) => prev.map((o,i) => i === index ? {...o, score: media, image: card } : o ))
    }
  }

  const handlePos = (index, input) => {
    setEditJugadores((prev) => prev.map((o,i) => i === index ? {...o, pos: input} : o ))
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

                      <section key={'user'+i} className='f-row p-relative pa-05 justify-space-between' ref={editJugadores.length - 1 === i ? ultimoPlayer : null}>
                        <div className='d-flex'>
                          <input style={{width:'2em'}} className='mr-1' type='number' value={j.score} onChange={(e) => handleInput(i, e.target.value, true)}></input>
                          <Select style={{width:'5em'}} className='mr-1' value={j.pos} onChange={(e) => handlePos(i, e.target.value)}>
                            { posiciones.map((pos) => (
                              <MenuItem value={pos.value}>{pos.value}</MenuItem>
                            )) }
                          </Select>
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