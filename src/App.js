import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'http://localhost/ostoslista/ostoslista.php/';


function App() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState([]);

  useEffect(() =>{
    axios.get(URL)
      .then((response) =>{
        setItems(response.data);
      }).catch(error => {
          alert(error.response ? error.response.data.error : error);
        });
  }, [])


function save(e) {
  e.preventDefault();
  const json = JSON.stringify({description:items,amount:amount});
      console.log(json);
  axios.post(URL + 'add.php',json, {
    headers: {
      'Content-type' : 'application/json'
    }
  })
  .then((response) => {
     setItems(items => [...items,response.data]);
     setItem('');
     setAmount('');
  }).catch(error => {
     alert(error.response ? error.response.data.error : error);
  })
}

  return (
    <div className='container'>
      <form onSubmit={save}>
        <h1> Ostoslista</h1> <br></br>
        <input value={item} placeholder='Lisää tuote' type='text' onChange={e => setItem(e.target.value)} /> 
        <input value={amount} placeholder= 'Lisää määrä' onChange={e => setAmount(e.target.value)} /> 
        <button> Lisää </button>
      </form>
      <ul>
          {items?.map(item => (
            <li key={item.id}>{item.description}</li>
          ))}
      </ul>
    </div>
    );
}

export default App;
