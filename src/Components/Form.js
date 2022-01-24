import React, { useState } from "react";
import "./form.scss";
import IPut from "iput";
import Select from "react-dropdown-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold } from "@fortawesome/free-solid-svg-icons";
import NodesTable from "./NodesTable";
const options = [
  { value: "5", label: "5 Minutes" },
  { value: "10", label: "10 Minutes" },
  { value: "15", label: "15 Minutes" },
];
const Form = () => {
  const [ip, setIp] = useState();
  const [port, setPort] = useState();
  const [interval, setInterval] = useState();
  const [switcher, setswitcher] = useState(false);
  const [adressesJson, setAdressesJson] = useState({
    timeInterval: 5,
    initial: true,
    data: [],
  });

  const handleAddBtn = (event) => {
    event.preventDefault();

    setAdressesJson((prevState) => {
      return {
        timeInterval: prevState.timeInterval,
        initial: prevState.initial,
        data: [...prevState.data, { ip: ip, port: port }],
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (interval && adressesJson.data.length > 0) {
      setAdressesJson((prevState) => {
        return {
          timeInterval: interval,
          initial: prevState.initial,
          data: [...prevState.data],
        };
      });
      setswitcher(true);
    } else {
      alert("please select interval/ip ");
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form_head">Find Bitcoins Nodes </div>
        <div className="labelContainer__ip">
          <label className="label">Enter IP Adress </label>
          <IPut onChange={(value) => setIp(value)} className="input" />
        </div>

        <div className="labelContainer__port">
          <label className="label">Enter Port Number : </label>
          <input
            className="input"
            type="number"
            min="0"
            max="65535"
            onChange={(e) => {
              let port = e.target.value;
              if (port > 65535) port = 0;
              setPort(port);
            }}
          />
        </div>
        <div className="labelContainer__time">
          <label className="label">Select Update Interval : </label>
          <Select
            placeholder=""
            searchable={false}
            className="input"
            options={options}
            onChange={(interval) => setInterval(interval[0].value)}
          />
        </div>
        <button type="submit" className="button">
          {" "}
          {/*after click start show data */}
          <FontAwesomeIcon className="icon" icon={faBold} spin={switcher} />
        </button>
        <button onClick={handleAddBtn} className="addButton">
          add to Adresses list{" "}
        </button>
        <div className="labelContainer__adresses">
          {adressesJson.data.map((adress) => {
            return (
              <p key={adress.ip}>
                {adress.ip}: {adress.port}
              </p>
            );
          })}
        </div>
      </form>
      {switcher && (
        <NodesTable
          setAdressesJson={setAdressesJson}
          adressesJson={adressesJson}
        />
      )}
    </>
  );
};

export default Form;
