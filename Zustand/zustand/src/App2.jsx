import useCartStore from './store/useCartStore';

export default function App2() {
  const { item, items, setItem, addItem, clearCart } = useCartStore();

  return (
    <>
      <h3>List of Items</h3>
      {items.length === 0 ? (
        <p>No items</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {/* 💡 handleSubmit hidden in Zustand now */}
      <form onSubmit={addItem}>
        <label>New Item:</label>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <br />
      <button onClick={clearCart}>Clear</button>
    </>
  );
}
