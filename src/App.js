import React, { Component } from 'react'

import Snake from './Snake';

import Food from './food';

const getRandomCoordinates = () => {
  let arr = [];
  for(let i=1;i<=10;i++)
  {
    let min = 1;
    let max = 98;
    let x = Math.floor(Math.random() * (max - min + 1)) + min;
    let y = Math.floor(Math.random() * (max - min + 1)) + min;
    arr[i-1] = ([x,y]);
  }
  return arr;
  
}
class App extends Component
{

 
  state = {
    totScore: 0,
    food: getRandomCoordinates(),
    speed:200,
    direction: 'RIGHT',
    snakeDots: [
      [0,0],
      [2,0]
    ]
  }

  componentDidMount() {
    console.log("after mount");
  setInterval(this.moveSnake,this.state.speed);
  
   document.onkeydown = this.onKeyDown;
   document.getElementById("myBtn").addEventListener('click', () => {
    this.setState( {speed:200,
      direction: 'RIGHT',
      snakeDots: [
        [0,0],
        [2,0]
      ]
    });
  })
  }

  componentDidUpdate(prevProps, prevState) {

    this.checkCollapsed();
  }

  checkCollapsed()
  {
    console.log("checkCollapsed");
    let newSnake = [...this.state.snakeDots];
    let head = newSnake[newSnake.length - 1];
    newSnake.forEach((e,ind) => {
      if(e[0] == head[0] && e[1] == head[1] && (ind != newSnake.length-1))
      {
        alert('Game is over');
        (
          <div>totScore</div>
        )
        this.setState( {speed:200,
          direction: 'RIGHT',
          snakeDots: [
            [0,0],
            [2,0]
          ]
        });
      }
    })
  }
  onKeyDown = (e) => {
    e = e || window.event;
    console.log(e.keyCode);
    switch(e.keyCode)
    {

        case 38:
          this.setState({direction: 'UP'});
          break;
        case 40:
          this.setState({direction: 'DOWN'});
          break;
        case 37:
          this.setState({direction: 'LEFT'});
          break;
        case 39:
          this.setState({direction: 'RIGHT'});
          break;

      }
    }
  
    moveSnake = () => {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length-1];
      //console.log(head);
      if(head[0] > 100 || head[0] < 0 || head[1] >100 || head[1] < 0)
      {
        alert('Game is over',this.totScore);
        
        this.setState( {speed:200,
          direction: 'RIGHT',
          snakeDots: [
            [0,0],
            [2,0]
          ]
        });
      }
      else
      {

        
        switch(this.state.direction)
        {
          case 'RIGHT':
            head = [head[0]+2,head[1]];
            break;
          case 'LEFT':
            head = [head[0]-2,head[1]];
          break;
          case 'DOWN':
            head = [head[0],head[1]+2];
            break;
          case 'UP':
            head = [head[0],head[1]-2];
            break;

        }
        dots.push(head);
        dots.shift();
        this.setState({snakeDots:dots
        });
      }
     
    }
  render()
  {
    let foo = this.state.food;
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length-1];
    let fooss = this.state.food;
    let arr;
   // console.log(fooss.find(e => e === head),"finding head");
   var found =0;
   let newfood;
   for(let j=0;j<fooss.length;j++)
   {
     console.log(fooss[j][0],head[0],fooss[j][1],head[1]);
     if(((fooss[j][0] == head[0] || head[0] == fooss[j][0] -1 || head == fooss[j][0]-2) && (fooss[j][1] == head[1] || head[1] == fooss[j][1] -1 || head[1] == fooss[j][1] - 2)))
     {
       //alert('eaten');
       this.state.totScore += 1;
       console.log("foundddd",head,j);
       newfood = [...this.state.food];
       let ind = this.state.food.indexOf(fooss[j]);
       newfood.splice(ind,1);
       console.log(newfood);
       found =1;
       break;
     }
    }
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    console.log("food",newfood);
    let newSpeed = this.state.speed == 10 ? this.state.speed : this.state.speed -10 ;
    if(found)
    {
      this.setState({
        food: newfood,
        snakeDots: newSnake,
        speed:newSpeed
      });
    }
   // console.log("foo",foo);
    //console.log("mount");
    let len;
    len = this.state.food.length;
    return(
      <div>
        <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        {[...Array(len)].map((x, i) =>
            <Food dot={foo[i]} />
        )}
      </div>
        <button id="myBtn">Restart</button>
        <hr></hr>
        <div>
          {this.state.totScore}
        </div>
      </div>
     
      
      
    );
  }
}

export default App;
