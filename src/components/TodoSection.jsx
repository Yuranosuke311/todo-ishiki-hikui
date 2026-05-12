import { useState } from 'react'
import TodoItem from './TodoItem'

const PRIORITIES = ['めんどい', '超めんどい', 'もう無理']
const DEADLINES = ['まあそのうち', '気が向いたら', '生きてる間に']

const TSUKKOMI_MESSAGES = [
  'どうせやらないでしょ',
  'タスク増やしてる場合？',
  'まずは今あるやつやろ？',
  'ほんとにやる気ある？',
]

export default function TodoSection({ todos, setTodos }) {
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('めんどい')
  const [deadline, setDeadline] = useState('まあそのうち')
  const [confirming, setConfirming] = useState(false)
  const [tsukkomi, setTsukkomi] = useState('')

  function handleAddClick() {
    if (!input.trim()) return
    setConfirming(true)
  }

  function handleConfirm() {
    const pending = todos.filter(t => !t.done && !t.skipped)
    if (pending.length >= 3) {
      const msg = TSUKKOMI_MESSAGES[Math.floor(Math.random() * TSUKKOMI_MESSAGES.length)]
      setTsukkomi(msg)
      setTimeout(() => setTsukkomi(''), 3000)
    }
    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        text: input.trim(),
        priority,
        deadline,
        done: false,
        skipped: false,
        createdAt: Date.now(),
      }
    ])
    setInput('')
    setConfirming(false)
  }

  function handleCancel() {
    setConfirming(false)
  }

  function markDone(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: true } : t))
  }

  function markSkipped(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, skipped: true } : t))
  }

  function markGiveUp(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, skipped: true, gaveUp: true } : t))
  }

  function remove(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const pending = todos.filter(t => !t.done && !t.skipped)
  const done = todos.filter(t => t.done)
  const skipped = todos.filter(t => t.skipped)

  return (
    <section className="todo-section">
      <h2>📝 やることリスト（たぶん）</h2>

      {tsukkomi && <div className="tsukkomi-banner">💬 {tsukkomi}</div>}

      <div className="add-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAddClick()}
          placeholder="やること（やらなくてもいい）"
        />
        <div className="add-options">
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            {PRIORITIES.map(p => <option key={p}>{p}</option>)}
          </select>
          <select value={deadline} onChange={e => setDeadline(e.target.value)}>
            {DEADLINES.map(d => <option key={d}>{d}</option>)}
          </select>
          <button className="btn-add" onClick={handleAddClick}>追加</button>
        </div>
      </div>

      {confirming && (
        <div className="confirm-dialog">
          <p>「{input}」、<strong>ほんとにやる？</strong></p>
          <div className="confirm-buttons">
            <button className="btn-yes" onClick={handleConfirm}>やる（たぶん）</button>
            <button className="btn-no" onClick={handleCancel}>やっぱやめとく</button>
          </div>
        </div>
      )}

      {pending.length === 0 && todos.length === 0 && (
        <p className="empty-message">タスクなし。完璧な一日だ。</p>
      )}

      {pending.length > 0 && (
        <div className="todo-list">
          {pending.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDone={() => markDone(todo.id)}
              onSkip={() => markSkipped(todo.id)}
              onGiveUp={() => markGiveUp(todo.id)}
              onRemove={() => remove(todo.id)}
            />
          ))}
        </div>
      )}

      {done.length > 0 && (
        <div className="done-section">
          <h3>✅ やった（えらい）</h3>
          {done.map(todo => (
            <div key={todo.id} className="todo-done">
              <span>{todo.text}</span>
              <button className="btn-remove" onClick={() => remove(todo.id)}>消す</button>
            </div>
          ))}
        </div>
      )}

      {skipped.length > 0 && (
        <div className="skipped-section">
          <h3>💤 やめといた</h3>
          {skipped.map(todo => (
            <div key={todo.id} className="todo-skipped">
              <span>{todo.text}{todo.gaveUp ? '（無理だった）' : ''}</span>
              <button className="btn-remove" onClick={() => remove(todo.id)}>消す</button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
