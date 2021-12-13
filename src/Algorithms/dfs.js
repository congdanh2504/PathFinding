import { col, row, sleep, start, target, xMove, yMove } from "../constants";

export const dfs = async (x, y, visited, handleChange, toast, matrix) => {  
    visited[x][y] = 1;
    if (x === target[0] && y === target[1]){
        toast.success("Success")
        return true;
    } 
    if (!(x == start[0] && y == start[1])) {
        await sleep()
        handleChange(x, y, 2)
    }
    for (let i=0; i<4; i++) {
        let newX = x + xMove[i];
        let newY = y + yMove[i];
        if (newX >= 0 && newX < row && newY >= 0 && newY < col && visited[newX][newY] == 0 && (matrix[newX][newY] == 0 || matrix[newX][newY] == 4)) {
        if (await dfs(newX, newY, visited, handleChange, toast, matrix)){
            if (!(x == start[0] && y == start[1])) {
                await sleep()
                handleChange(x, y, 3)
            } 
            document.getElementById(`a${x}a${y}`).classList.add('node2')    
            return true
        }   
        }    
    }
    await sleep()
    document.getElementById(`a${x}a${y}`).classList.add('node3')  
    return false
}