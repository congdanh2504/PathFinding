import { col, row, sleep, start, target, xMove, yMove } from "../constants";

const bfs = async (queue, visited, matrix, handleChange, path) => {
    var node = queue.shift();
    let x = node[0];
    let y = node[1];
    for (let i=0; i<4; i++) {
        let newX = x + xMove[i];
        let newY = y + yMove[i];
        if (newX >= 0 && newX < row && newY >= 0 && newY < col && !visited[newX][newY] && (matrix[newX][newY] != 1)) {          
            await sleep();
            queue.push([newX, newY]);
            path[newX][newY] = [x,y];
            handleChange(newX, newY, 2);
            visited[newX][newY] = true;
        }
    }
}

const isIntersecting = (s_visited, t_visited) => {
    for (let i=0; i<row; i++) {
        for (let j=0; j<col; j++) {
            if (s_visited[i][j] && t_visited[i][j]) {
                return [i, j];
            }
        }
    }
    return [-1,-1];
}

export const bi_bfs = async (handleChange, toast, matrix) => {
    var s_queue = [];
    var t_queue = [];
    var s_visited = [];
    var t_visited = [];
    var t_path = [];
    var s_path = []; 
    for (let i = 0; i < row; i++) {
        s_path[i] = Array(col).fill([0,0]);
        t_path[i] = Array(col).fill([0,0]);
        s_visited[i] = Array(col).fill(false);
        t_visited[i] = Array(col).fill(false);
    }
    s_path[start[0]][start[1]] = [-1,-1];
    t_path[target[0]][target[1]] = [-1,-1];
    t_queue.push([target[0], target[1]]);
    s_queue.push([start[0], start[1]]);
    s_visited[start[0]][start[1]] = true
    t_visited[target[0]][target[1]] = true
    let check = false
    let inter;
    dl:
    while (s_queue.length > 0 && t_queue.length > 0) {
        await bfs(s_queue, s_visited, matrix, handleChange, s_path)
        await bfs(t_queue, t_visited, matrix, handleChange, t_path)
        inter = isIntersecting(s_visited, t_visited);
        if (inter[0] != -1) {
            toast.success("Success")
            check = true
            break dl;
        }
    }
    if (check) {
        let s_x = inter[0];
        let s_y = inter[1];  
        let t_x = inter[0];
        let t_y = inter[1]; 
        while (!(s_x == start[0] && s_y == start[1]) || !(t_x == target[0] && t_y == target[1])) {
            await sleep()
            if (s_x != -1) {
                if (!(s_x == start[0] && s_y == start[1]))
                handleChange(s_x, s_y, 3)
                document.getElementById(`a${s_x}a${s_y}`).classList.add('node2')
                let s_newX = s_path[s_x][s_y][0];
                let s_newY = s_path[s_x][s_y][1];
                s_x = s_newX;
                s_y = s_newY;
            }
            if (t_x != -1) {
                if (!(t_x == target[0] && t_y == target[1]))
                handleChange(t_x, t_y, 3)
                document.getElementById(`a${t_x}a${t_y}`).classList.add('node2')
                let t_newX = t_path[t_x][t_y][0];
                let t_newY = t_path[t_x][t_y][1];
                t_x = t_newX;
                t_y = t_newY;
            }          
        }
    }
};