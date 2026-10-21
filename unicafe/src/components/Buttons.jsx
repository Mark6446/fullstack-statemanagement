import { useUnicafeActions } from '../store'

const Buttons = () => {
  const { incrementGood, incrementNeutral, incrementBad, resetStats } = useUnicafeActions()

  return (
    <div>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
      <button onClick={resetStats}>reset stats</button>
    </div>
  )
}

export default Buttons