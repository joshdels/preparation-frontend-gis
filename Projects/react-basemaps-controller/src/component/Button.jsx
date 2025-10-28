export default function Button({ name, onClick, isActive }) {
  
  return(
    <>
      <button onClick={onClick}>
        {name} {isActive && <p>is activated</p>}
      </button>
    </>
  )
}