import { useUnicafeStore } from '../store'

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = () => {
  const good = useUnicafeStore(state => state.good)
  const neutral = useUnicafeStore(state => state.neutral)
  const bad = useUnicafeStore(state => state.bad)

  const total = good + neutral + bad

  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? "0 %" : (good / total) * 100 + " %"

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

export default Statistics