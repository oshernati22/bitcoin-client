import "./App.scss";
import Logo from "./Assets/logo.jpg";
import Form from "./Components/form/Form";

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
        <Form /> {/* inputs ips & ports to send the server*/}
      </div>
    </>
  );
}

export default App;
