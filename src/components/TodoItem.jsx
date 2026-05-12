const PRIORITY_COLORS = {
  'めんどい': '#f59e0b',
  '超めんどい': '#ef4444',
  'もう無理': '#7c3aed',
}

const DONE_PRAISES = [
  'えらい（小声）',
  'まじかよ、やるじゃん',
  '人間として及第点',
  'すごいじゃん（驚き）',
  'なんか感動した',
]

export default function TodoItem({ todo, onDone, onSkip, onGiveUp, onRemove }) {
  function handleDone() {
    const praise = DONE_PRAISES[Math.floor(Math.random() * DONE_PRAISES.length)]
    alert(`✨ ${praise}`)
    onDone()
  }

  return (
    <div className="todo-item">
      <div className="todo-meta">
        <span
          className="priority-badge"
          style={{ background: PRIORITY_COLORS[todo.priority] }}
        >
          {todo.priority}
        </span>
        <span className="deadline-badge">🕐 {todo.deadline}</span>
      </div>
      <p className="todo-text">{todo.text}</p>
      <div className="todo-actions">
        <button className="btn-done" onClick={handleDone}>やった！</button>
        <button className="btn-skip" onClick={onSkip}>今日はやめとく</button>
        <button className="btn-giveup" onClick={onGiveUp}>やっぱ無理</button>
      </div>
    </div>
  )
}
