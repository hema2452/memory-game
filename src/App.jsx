import { useEffect, useState } from 'react'
import './App.css'
import helmet from  "/src/assets/helmet-1.png"
import CardComponent from './components/CardComponent'


const cardImages=[
  {"src":helmet,matched:false},
  {"src":"/src/assets/potion-1.png",matched: false},
  {"src":"/src/assets/ring-1.png",matched: false},
  {"src":"/src/assets/scroll-1.png",matched: false},
  {"src":"/src/assets/shield-1.png",matched: false},
  {"src":"/src/assets/sword-1.png",matched: false}
]


function App() {
  const [cards,setCards] = useState([]); 
  const [turns,setTurns] = useState(0);
  const [choiceOne,setChoiceOne] = useState(null);
  const [choiceTwo,setChoiceTwo] = useState(null);
  const [disabled, setdisabled] = useState(false);  
  const [count, setcount] = useState(0);
   //shuffleCards
  const shuffleCards = () =>{
    const newSuffledCards = [...cardImages,...cardImages]
                            .sort(() => Math.random()-0.5)
                            .map((element)=> ({...element, id:Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(newSuffledCards);
    setTurns(0);
    setcount(0)
  }
  //handle choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)   // update choice   
  }
  // New game when starting 
  useEffect(() => {
    shuffleCards();
  },[])

  // compare two selected cards
  useEffect(() =>{
      if(choiceOne && choiceTwo){
        setdisabled(true)
        if(choiceOne.src == choiceTwo.src){
         setCards( prevCards => {
          return prevCards.map((card) => {
            if(card.src === choiceOne.src){
              setcount(count+1)               
              return {...card, matched: true}
             
            }
            else{
              return card
            }
          })
        })         
        resetTurn();
      }
      else{
          // console.log("not matched");
          setTimeout(() => resetTurn(),1000);          
      }
    }} ,[choiceOne,choiceTwo]) 

  // console.log(cards) 
  //increase turn and reset choices 
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(previous => previous+1)
    setdisabled(false)
  }



  return (
    <div className="container-main">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>Start Game</button>
      <br />
      {count === 6 && <p>Game is completed start a new Game <br /> turns:{turns}</p>}      
      <div className="grid">
      {cards.map((card) => (
        <CardComponent
          key={card.id} 
          card={card} 
          handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          selected = {disabled}
        />
      ))}             
      </div>
      <p>Total Turns:{turns}</p>
   

    </div>
  

  )
}

export default App
