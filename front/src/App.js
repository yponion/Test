import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import axios from "axios";

function App() {
    const [input, setInput] = useState('')
    const [data, setData] = useState([]);

    const getData = async () => {
        axios.get('/api/data').then(res => {
            console.log(res.data.data)
            setData(res.data.data)
        }).catch(error => {
            console.error('post fail:', error)
        });
    }

    useEffect(() => {
        getData()
    }, []);

    const onClickHandler = () => {
        axios.post('/api/data', {input}).then(res => {
            setInput('')
            getData()
        }).catch(error => {
            console.error('post fail:', error)
        });
    }

    return (
        <div>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
            <br/>
            <button onClick={onClickHandler}>DB에 올리기
            </button>
            {data.map((d, index) => (
                <div key={d._id}>{d.content}</div>
            ))}

        </div>
    );

    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
}

export default App;
