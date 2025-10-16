import { useState } from 'react'
import Box  from './Box.jsx'
import './index.css';
import { sculptureList } from './data.js'

export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <>
      <h1>Hello Components</h1>
      <Box />
      <button onClick={handleClick}>
        Click Me {count}
      </button>
    </>
  )
}


export function App2() {
  const [liked, setLiked] = useState(true);
  const [text, setText] = useState('hello');

  function handleCheckboxChange(e) {
    setLiked(e.target.checked);
  };

  function handleTextChange(e) {
    setText(e.target.value);
  };
  

  return (
    <>
      <hr />
      <h1>States Practice</h1>
      <label>
        <input 
          type="checkbox"
          checked={liked}
          onChange={handleCheckboxChange}
        />
        I like this
      </label>
      <p>You {liked ? 'awit': 'did not awit'} this.</p>
      <input 
        value={text}
        onChange={handleTextChange}
       />
       <p>You type: {text}</p>
       <button onClick={() => setText('hello')}>Reset</button>

       <Box />
    </>
  )
}


export function App3() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length -1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  return(
    <>
      <hr />
      <h1>Interactivity</h1>
      <Toolbar 
        onPlayMovie={() => alert('Playing')}
        onUploadImage={() => alert('Uploading')}
      />
    </>
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Moview
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}

function Button({ onClick, children }){
  return (
    <>
      <button onClick={onClick}>
        {children}
      </button>
    </>
  );
}

// export function App4() {
//   const [to, setTo] = useState('Alice');
//   const [message, setMessage] = useState('Hello');

//   function handleSubmit(e) {
//     e.preventDefault();
//     setTimeout(() => {
//       alert(`You said ${message} to ${to}`)
//     }, 2000);
//   }

//   return (
//     <>
//       <hr />
//       <form onSubmit={handleSubmit}>
//         <label>
//           To:{' '}
//           <select 
//             value={to}
//             onChange={e => setTo(e.target.value)}>  
//             <option value="Alice">Alice</option>
//             <option value="Bob">Bod</option>
//           </select>
//         </label>
//         <textarea
//           placeholder='Message' 
//           value={message}
//           onChange={e => setMessage(e.target.value)}
//         />  
//         <button type="submit">Send</button>
//       </form>
//     </>
//   );
// }


export function App4() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value    
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }


  return (
    <>
      <br />
      <label>
        Name:
        <input 
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input 
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input 
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Title:
        <input 
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title} 
      />
    </>
  )
}

const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export function App5() {
  const [list, setList] = useState(
    initialList
  );

  function handleToggle(artworkId, nextSeen) {
    setList(list.map(artwork => {
      if (artwork.id === artworkId ) {
        return { ...artwork, seen: nextSeen};
      } else {
        return artwork;
      }
    }));
  }

  return (
    <>
      <hr />
      <h1>Art Bucket List</h1>
      <h2>My List of art to see:</h2>
      <ItemList 
        artworks={list}
        onToggle={handleToggle}
      />
    </>
  );
} 

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input 
              type='checkbox'
              checked = {artwork.seen}
              onChange={ e=> {
                onToggle(
                  artwork.id,
                  e.target.checked
                )
              }} 
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  )
}



