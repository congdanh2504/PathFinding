import { col, row, sleep, start, target, xMove, yMove } from "../constants";

export const bfs = async (visited, handleChange, toast, matrix) => {
    var queue = [];
    queue.push([start[0], start[1]]);
    var path = [];
    for (var i = 0; i < row; i++) {
      path[i] =  Array(col).fill([0,0]);
    }
    let check = false
    dl:
    while (queue.length > 0) {
        var node = queue.shift();
        let x = node[0]
        let y = node[1]  
        visited[x][y] = true; 
        for (let i=0; i<4; i++) {
            let newX = x + xMove[i];
            let newY = y + yMove[i];
            if (newX >= 0 && newX < row && newY >= 0 && newY < col && !visited[newX][newY] && (matrix[newX][newY] == 0 || matrix[newX][newY] == 4)) {          
                await sleep()
                path[newX][newY] = [x,y];   
                queue.push([newX, newY]);       
                if (newX == target[0] && newY == target[1]) {
                  toast.success("Success")
                  check = true
                  break dl;
                }
                handleChange(newX, newY, 2)
            }
        }
    }
    if (check) {
      let x = path[target[0]][target[1]][0];
      let y = path[target[0]][target[1]][1];  
      while (!(x == start[0] && y == start[1])) {
        await sleep()
        handleChange(x, y, 3)
        document.getElementById(`a${x}a${y}`).classList.add('node2')
        let newX = path[x][y][0];
        let newY = path[x][y][1];
        x = newX;
        y = newY;
      }
    }
};