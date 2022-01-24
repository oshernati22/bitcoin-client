import "./App.scss";
import Logo from "./Assets/logo.jpg";
import Form from "./Components/Form";

function App() {
  return (
    <>
      <div className="App">
        <div className="App">
          <div className="head_container">
            <div>
              {" "}
              <img className="logo" src={Logo} alt="logo"></img>{" "}
            </div>
          </div>
        </div>
        <Form />
      </div>
    </>
  );
}

export default App;
