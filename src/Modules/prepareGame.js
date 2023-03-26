import startGame from "./startGame";

export default function prepareGame(player, AI) {

  const playerBoard = document.getElementById('player-board')

  // render the player board
  for(let i = 0; i < player.board.length; i++) {
    const box = document.createElement('div')
    box.id = `p${i}`
    box.classList.add('box')
    // shows ships on the board
    if(player.board[i].ship) box.classList.add('contain-ship')
    playerBoard.append(box)
  }
}