// import React, { useState } from 'react';
import React, { useState } from 'react';
// import Header from './Header'
import Logon from './pages/Logon'
import Routes from './routes'
import './global.css'


//JSX
//Life reload -> after save the project, the changes will be displayed in the browser
function App() {

  // const [count, setCount] = useState(0) //it will create a state variable

  // const incrementCount = () => {
  //   setCount(count + 1); // setCount allow us to change the state variable.. we don't have access to update a state variable directly
  // }

  return (
    <div>
      <Routes />
      {/* <Logon /> */}

    </div>

  );
}

export default App;


// Example using props, props.children, and useState() method and its behavior
{/* <Header title="Semana Omnistack 11">
        Testando props children
      </Header> */}
{/* <div>
        <h1>Contador: {count}</h1>
        <button onClick={incrementCount}>Enter</button>
      </div> */}