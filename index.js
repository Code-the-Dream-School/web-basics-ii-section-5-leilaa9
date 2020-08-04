
// //------------------------ Game Project---------------------------
// //Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
// //We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
// //First ask the players for their names (use propmt)
// //Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
// //We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
// //Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
// //Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
// //in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
// //As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
// //one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.

const buttons = document.getElementById('buttons');
buttons.innerHTML = `<button id='new'>New Game</button><button id='reset'>Reset</button>`;
const new_Battleship = () => {
  const player1 = {
    player1_Name: prompt("Please enter your name"),
    shipsCount: 0,
    gameBoard: [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ]
  };
  const player2 = {
    player2_Name: prompt("Please enter your name"),
    shipsCount: 0,
    gameBoard: [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ]
  };

  document.getElementById('name_player1').textContent = `${player1.player1_Name}`;
  document.getElementById('name_player2').textContent = `${player2.player2_Name}`;

  const turn = document.getElementById("turn_player");
  turn.textContent = `${player1.player1_Name}`;

  const board_Player1 = document.getElementById('board_player1');
  const board_Player2 = document.getElementById('board_player2');
  

  const addShips = () => {
    while(player1.shipsCount < 4){
      let xpos = Math.floor(Math.random() * 4);
      let ypos = Math.floor(Math.random() * 4);
      if( player1.gameBoard[xpos][ypos] === 0){
        player1.gameBoard[xpos][ypos] = 1;
        player1.shipsCount++
      }
    }
    while( player2.shipsCount !== 4 ){
      const xpos = Math.floor(Math.random() * Math.floor(4)); 
      const ypos = Math.floor(Math.random() * Math.floor(4));
      if( player2.gameBoard[xpos][ypos] === 0){
        player2.gameBoard[xpos][ypos] = 1;
        player2.shipsCount++
      }
    }

    for (var x = 0; x < 4; x++) {
      const li1 = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board
      const li2 = document.createElement('li');

        for (var y = 0; y < 4; y++) {
          const cell1 = document.createElement('div');
          const cell2 = document.createElement('div');

          cell1.className = "square"; // adding css properties to make it looks like a square
          cell2.className = "square";
         
          cell1.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
          cell2.textContent = `${x},${y}`;
          
          cell1.value = 0;//state of the cell1

          const pos1 = player1.gameBoard[x][y];
          const pos2 = player2.gameBoard[x][y];

          let lives1 =document.getElementById('ships_player1');
          let lives2 = document.getElementById('ships_player2');    
                  
          lives2.textContent = `${player2.shipsCount}`;
          lives1.textContent = `${player1.shipsCount}`;

          cell1.addEventListener( 'click', (e) => { 
              if(player1.shipsCount !== 0 && player2.shipsCount !== 0)
              {
                if(turn.textContent === `${player2.player2_Name}`) {
                  let cell1 = e.target; 
                  cell1.style.backgroundColor = "purple";
                  turn.textContent = `${player1.player1_Name}`;
                  if(pos1 === 1) {
                    player1.shipsCount--;
                    lives1.textContent = `${player1.shipsCount}`;
                    if(player1.shipsCount == 0) {
                      turn.textContent = `Congratulationes ${player2.player2_Name.toUpperCase()}!! you win!`;
                      alert(`Congratulationes ${player2.player2_Name.toUpperCase()}!! you win!`);
                    }
                  } 
                  cell1.textContent = `${pos1}`;
                  console.log("pos1:", pos1);
                } 
                  else {
                    alert(`It is ${player2.player2_Name}'s turn!`)
                  }
              }
            });

          cell2.addEventListener( 'click', (e) => {
            if(player1.shipsCount !== 0 && player2.shipsCount !== 0) {
              if(turn.textContent === `${player1.player1_Name}`)  {
                let cell2 = e.target;
                cell2.style.background ="purple";
                cell2.textContent = `${pos2}`;
                console.log("pose2:", pos2);
                turn.textContent = `${player2.player2_Name}`;
                if(pos2 === 1) {
                  player2.shipsCount--;
                  lives2.textContent = `${player2.shipsCount}`;
                  if(player2.shipsCount == 0) {
                    turn.textContent = `Congrats ${player1.player1_Name.toUpperCase()}!! you win!`;
                    alert(`Congrats ${player1.player1_Name.toUpperCase()}!! you win!`);
                  }
                } 
              } 
                else {
                  alert(`It is ${player1.player1_Name}'s turn!`)
                }
            }
              
          });

          li1.appendChild(cell1); //adding each cell into the row number x
          li2.appendChild(cell2);
        }

      board_Player1.appendChild(li1); //adding each row into the board
      board_Player2.appendChild(li2);
    }
  }

  addShips();
  document.getElementById('reset').addEventListener('click', () => {
    board_Player1.innerHTML = '';
    board_Player2.innerHTML = '';
    addShips();
  });
}
new_Battleship ();
document.getElementById('new').addEventListener('click', (e) => {
document.getElementById('board_player1').innerHTML = '';
document.getElementById('board_player2').innerHTML = '';

new_Battleship();
});

