import React from 'react'

const CardComponent = ({card,handleChoice, flipped, selected}) => {
  function handleSubmit(){
    if(!selected){
      handleChoice(card)
    }
    else{
      console.log("it is under checkeing")
    }
    
  }
  return (
    <>
      <div className="card-grid">
        <div className={flipped ? "flipped" : ""}> 
        <img src={card.src} alt={card.src} className="front" />
        <img 
          className="back" 
          src="./src/assets/cover.png" 
          alt="cover" 
          onClick={handleSubmit} />
        </div>
        </div>

  
    </>
  )
}

export default CardComponent
