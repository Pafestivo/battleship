import gameLoop from "./Modules/gameLoop";
import './styles/styles.css'
import './styles/winner-overlay.css'

gameLoop()

const playAgain = document.querySelector('.winner-overlay > p')

playAgain.addEventListener('click', () => {
  window.location.reload()
})