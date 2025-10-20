import { useState } from 'react';

const products = [
  { id: 1, "name": "Camera", "price": 130, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrGEKSqlHRT60y4se5VJai1Qqu54iR-Bba0g&s"},
  { id: 2, "name": "Phone", "price": 1300, "image": "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400"},
  { id: 3, "name": "Headphone", "price": 200, "image": "https://jblstore.com.ph/cdn/shop/files/Tune720BT_Black_2_600x.png?v=1757250553"},
]


export default function App3() {
  // Tomorrow nani, start ko ugma sa states, then button
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(item) {
    setCartItems(prevItems => [...prevItems, item]);
  };

  function handleDelete(itemId) {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  }

  function handleReset() {
    setCartItems([])
  }


  return (
    <>
     <h1>Shoppee</h1>
     <hr />
     <ShoppingCart 
       items={cartItems}
       onReset={handleReset}
     />
     <hr />
     <ProductList 
       products={products}
       addFeatures={handleAddToCart}
       deleteFeatures={handleDelete}
       cartItems={cartItems}
       />
    </>
  );
}

function ProductList({products, cartItems, addFeatures, deleteFeatures}) {
  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <img src={product.image} alt={product.name} style={{height: "200px"}} />
          <br />
          <button onClick={() => addFeatures(product)}>Add to Cart</button>
          <button onClick={() => deleteFeatures(product.id)}>Delete</button>
          <p>Quantity: {cartItems.filter(item => item.id === product.id).length}</p>
          <p>Cost: {
            cartItems.filter(item => item.id === product.id)
              .reduce((total, item) => total + item.price, 0)
            }</p>
        </div>
      ))}
    </>
  )
}

function ShoppingCart({items, onReset}) {
  const numberOfItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  
  return(
    <>
      <h2>Shopping Cart</h2>
      <p>Qty. {numberOfItems}</p>
      <p>Total Payment: {totalPrice}</p>
      <button
        onClick={onReset}
      >Reset</button>
    </>
  )
}

