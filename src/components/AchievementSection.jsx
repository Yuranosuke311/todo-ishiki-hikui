import { useState, useEffect } from 'react'

const ACHIEVEMENTS = [
  { id: 'woke_up', label: '起きれた', praise: 'それだけで100点' },
  { id: 'ate', label: 'ご飯食べた', praise: '生きてる、えらい' },
  { id: 'shower', label: 'シャワー浴びた', praise: '清潔感の勝者' },
  { id: 'went_out', label: '外出た', praise: '外の空気は無料' },
  { id: 'no_cry', label: '今日一日泣かなかった', praise: 'メンタル鋼鉄' },
  { id: 'talked', label: '誰かと話した', praise: 'コミュ力あるじゃん' },
]

export default function AchievementSection() {
  const todayKey = new Date().toDateString()

  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem('achievements-' + todayKey)
    return saved ? JSON.parse(saved) : {}
  })
  const [smartphoneHours, setSmartphoneHours] = useState(() => {
    return localStorage.getItem('smartphone-' + todayKey) || ''
  })
  const [lastPraise, setLastPraise] = useState('')

  useEffect(() => {
    localStorage.setItem('achievements-' + todayKey, JSON.stringify(checked))
  }, [checked, todayKey])

  useEffect(() => {
    localStorage.setItem('smartphone-' + todayKey, smartphoneHours)
  }, [smartphoneHours, todayKey])

  function toggle(id, praise) {
    setChecked(prev => {
      const next = { ...prev, [id]: !prev[id] }
      if (next[id]) setLastPraise(praise)
      else setLastPraise('')
      return next
    })
  }

  const checkedCount = Object.values(checked).filter(Boolean).length
  const smartphoneScore = smartphoneHours !== ''
    ? Number(smartphoneHours) <= 2 ? '少なっ、天才か' :
      Number(smartphoneHours) <= 5 ? 'まあ人間だし' :
      Number(smartphoneHours) <= 8 ? 'スマホと同棲してる' : 'スマホに食われてる'
    : null

  return (
    <section className="achievement-section">
      <h2>✨ 今日のえらかったこと</h2>
      {lastPraise && <div className="praise-toast">{lastPraise}</div>}
      <div className="achievement-grid">
        {ACHIEVEMENTS.map(({ id, label, praise }) => (
          <button
            key={id}
            className={`achievement-btn ${checked[id] ? 'checked' : ''}`}
            onClick={() => toggle(id, praise)}
          >
            <span className="check-mark">{checked[id] ? '✅' : '⬜'}</span>
            {label}
          </button>
        ))}
      </div>

      <div className="smartphone-row">
        <label>📱 スマホ時間：</label>
        <input
          type="number"
          min="0"
          max="24"
          value={smartphoneHours}
          onChange={e => setSmartphoneHours(e.target.value)}
          placeholder="0"
        />
        <span>時間</span>
        {smartphoneScore && <span className="smartphone-score">{smartphoneScore}</span>}
      </div>

      {checkedCount >= 3 && (
        <p className="achievement-comment">
          {checkedCount}個もできてる、すごいじゃん（小声）
        </p>
      )}
    </section>
  )
}
