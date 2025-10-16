import { useState } from 'react'
import './index.css';

// export default function App() {
//   const [answer, setAnswer] = useState('');
//   const [error, setError] = useState(null);
//   const [status, setStatus] = useState('typing')

//   if (status === 'success') {
//     return <h1>Perfect! Man</h1>
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setStatus('submitting');
//     try {
//       await submitForm(answer);
//       setStatus('success');
//     } catch (err) {
//       setStatus('typing');
//       setError(err);
//     }
//   }

//   function handleTextareaChange(e) {
//     setAnswer(e.target.value);
//   }

//   return(
//     <>
//       <h2>City Quiz</h2>
//       <p>
//         In which city is city that is famous to joshua?
//       </p>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={answer}
//           onChange={handleTextareaChange}
//           disabled={status === 'submitting'}
//         ></textarea>
//         <br />
//         <button disabled={
//           answer.length === 0 || 
//           status === 'submitting'
//         }>
//           Submit
//         </button>
//         {error !== null && 
//           <p className='Error'>
//             {error.message}
//           </p>  
//         }
//       </form>
//     </>
//   )
// }

// function submitForm(answer) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let shouldError = answer.toLowerCase() !== 'tagum'
//       if (shouldError) {
//         reject(new Error('Good guess but wrong answer. Try again!'));
//       } else {
//         resolve();
//       }
//     }, 2000);
//   });
// }



export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  return(
    <>
      <h2>Almaty, Kazak</h2>
      <Panel 
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      > 
        With a populatoin of about 2 millio
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from apple
      </Panel>
    </>
  )
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className='panel'>
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  )
}