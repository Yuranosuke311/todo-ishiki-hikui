import { useState, useEffect } from 'react'
import TodoSection from './components/TodoSection'
import AchievementSection from './components/AchievementSection'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('ishiki-todos')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('ishiki-todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 意識低い系 ToDoリスト</h1>
        <p className="subtitle">できたらいいな、くらいでいいよ</p>
      </header>
      <main className="app-main">
        <AchievementSection />
        <TodoSection todos={todos} setTodos={setTodos} />
      </main>
    </div>
  )
}

export default App
