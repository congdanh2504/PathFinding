export const colors = {
    '0': "#FFFFFF",
    '1': '#0C3547',
    '2': '#00BEDABF',
    '3': "#FFFE6A",
    '4': '#e83e8c',
    '5': '#ffffff'
}

export const row = 20; 
export const col = 46;

export const xMove = [-1,0,1,0];
export const yMove = [0,1,0,-1];
export const start = [10,6];
export const target = [12,40]

export const opts = [{id: 'bfs', label: "BFS"}, {id: 'dfs', label: "DFS"}, {id: 'bi_bfs', label: "Bi BFS"}]

export const sleep = (time = 1) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

