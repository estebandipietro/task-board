import './App.css'
import Board from './components/Board'

function App() {
  const boardData = {
    backlog: [
      { id: '1', content: 'Task 1' },
      { id: '2', content: 'Task 2' },
    ],
    todo: [
      { id: '3', content: 'Task 3' },
      { id: '4', content: 'Task 4' },
    ],
    doing: [
      { id: '5', content: 'Task 5' },
    ],
    done: [
      { id: '6', content: 'Task 6' },
    ],
  };

  return (
    <div className="App">
      <h1>Tasks Board</h1>
      <Board data={boardData} />
    </div>
  )
}

export default App
