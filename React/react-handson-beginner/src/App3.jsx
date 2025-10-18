import { useState } from 'react'

const questions = [
  {"id": 1, "question": "who is your dog", "answer": "kimchi"},
  {"id": 2, "question": "who is your cat", "answer": "keifer"},
  {"id": 3, "question": "who is your cat", "answer": "keifer"},
]

function App3() {
  // FAQ Accordion
  const [openId, setOpenId] = useState(null);

  function handleQuestion(id) {
    setOpenId(prev => (!prev == id ? null : id));
  }

 return (
  <>
    <h1>Questions</h1>
    {questions.map(q => (
      <ul key={q.id}>
        <li >
          {q.question} 
          <button onClick={() => handleQuestion(q.id)}>
            {openId === q.id ? "Hide" : "Show"}
          </button>
          <br />
          {openId === q.id  && <p>{q.answer}</p>}
        </li>
      </ul>
    ))}
  </>
 )
}

export default App3




