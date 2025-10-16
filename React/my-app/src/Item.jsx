export default function Item({ name, location, isUsed }) {
  return (
    <li className="item">
      <button>Click Me</button>
      {name}, {location} - {isUsed && '+used'}
    </li>
  )
}