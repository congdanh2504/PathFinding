import './App.css';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { col, colors, opts, row, start, target } from './constants';
import { dfs } from './Algorithms/dfs';
import { bfs } from './Algorithms/bfs';
import { bi_bfs } from './Algorithms/bi-bfs';

function App() {
  let visited = [];
  const [onMouseDown, setOnMouseDown] = useState(false)
  const [algorithm, setAlgorithm] = useState(null)
  const [matrix, setMatrix] = useState(Array(row).fill().map(() => Array(col).fill(0)));

  useEffect(() => {
    handleChange(start[0], start[1], 4);
    handleChange(target[0], target[1], 4);
  }, [])

  const handleChange = (row, column, value) => {
    let copy = [...matrix];
    copy[row][column] =+ value;
    setMatrix(copy);  
    document.getElementById(`a${row}a${column}`).classList.add('node')
  };

  const clear = () => {
    for (let i=0; i<row; i++) {
      for (let j=0; j<col; j++) {
        if (matrix[i][j] == 2 || matrix[i][j] == 5 || matrix[i][j] == 3) {
          handleChange(i, j, 0);
        }
        document.getElementById(`a${i}a${j}`).className = ''
      }
    }
  }

  const startFinding = () => {
    for (var i = 0; i < row; i++) {
      visited[i] = Array(col).fill(0);
    }
    if (!algorithm) {
      toast.error("Please choose an algorithm")
    } else {
      clear() 
      switch (algorithm) {
        case 'bfs':
          bfs(visited, handleChange, toast, matrix)
          break
        case 'dfs':
          dfs(start[0],start[1], visited, handleChange, toast, matrix)
          break
        case 'bi_bfs':
          bi_bfs(handleChange, toast, matrix)
          break
      }
    }
  }

  const onMouseDownHandle = (i, j, v) => {
    if (v == 4) return;
    v == 0 ? handleChange(i, j, 1) : handleChange(i, j, 0)
    setOnMouseDown(true)
  }

  const onMouseEnterHandle = (i, j, v) => {
    if (onMouseDown) {
      if (v == 4) return;
      v == 0 ? handleChange(i, j, 1) : handleChange(i, j, 0)
    }
  }

  const onMouseUpHandle = () => {
    setOnMouseDown(false)
  }

  return (
    <div className="App">
      <ToastContainer/>
      <div className="container-fluid">   
        <div className="row justify-content-center" style={{ alignItems: "center", marginBottom: "10px" }}>
          <div className="col-sm-3" style={{ marginTop: "20px" }}>
            <Select
              onChange={(e) => setAlgorithm(e.id)}
              options={opts}
              placeholder="Algorithms"
            />
          </div>
          <button className='solve col-sm-3' onClick={clear}>
            Clear
          </button>
          <button className='col-sm-3' onClick={startFinding}>
            Start
          </button>
        </div> 
        
        <div className="row">
        {matrix.map((value, i) => {
          return <div className="col-md-12" >
            {value.map((v, j)=> {
              return <span    
                onMouseDown={() => onMouseDownHandle(i, j, v)}
                onMouseEnter={() => onMouseEnterHandle(i, j, v)}
                onMouseUp={onMouseUpHandle}>
               <input id={`a${i}a${j}`}
                disabled={true}
                style={{backgroundColor: colors[v]}}/>
              </span>
            })}
          </div>
        })}
        </div>
      </div> 
      <div className="row">
      </div>
    </div>
  );
}

export default App;
