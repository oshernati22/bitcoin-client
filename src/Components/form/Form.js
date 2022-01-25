import React, { useState } from "react";
import "./form.scss";
import IPut from "iput";
import Select from "react-dropdown-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { adressesActions } from "../../store/adressesSlice";
import DataHandler from "./DataHandler";
import { useSelector } from "react-redux";
import { switcherActions } from "../../store/switcherSlice";

//data picker options
const options = [
  { value: "5", label: "5 Minutes" },
  { value: "10", label: "10 Minutes" },
  { value: "15", label: "15 Minutes" },
];

const Form = () => {
  //inputs data of the form
  const [ip, setIp] = useState();
  const [port, setPort] = useState();
  const [interval, setInterval] = useState();

  //global states
  const dispatch = useDispatch();
  const adressesJson = useSelector((state) => state.adresses.data);
  const switcher = useSelector((state) => state.switcher.switcher);

  //make adress lists
  const handleAddBtn = (event) => {
    event.preventDefault();
    dispatch(adressesActions.addAdressesData({ ip, port }));
  };

  //after submit fill the json data to the server and show dataHandler
  const handleSubmit = (event) => {
    event.preventDefault();
    if (interval && adressesJson.length > 0) {
      dispatch(adressesActions.addInterval(interval));
      dispatch(switcherActions.changeMode());
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
            /*if port not valid zero the value*/
            onChange={(e) => {
              let port = e.target.value;
              if (port > 65535) e.target.value = 0;
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
        <button type="submit" disabled={switcher} className="button">
          {" "}
          {/*after click start show data */}
          <FontAwesomeIcon className="icon" icon={faBold} spin={switcher} />
        </button>
        <button
          onClick={handleAddBtn}
          disabled={switcher}
          className="addButton"
        >
          add to Adresses list{" "}
        </button>
        <div className="labelContainer__adresses">
          {/*show all the adress that the user fill*/}
          {adressesJson.map((adress) => {
            return (
              <p key={adress.ip + adress.port}>
                {adress.ip}: {adress.port}
              </p>
            );
          })}
        </div>
      </form>
      {switcher && <DataHandler />}
    </>
  );
};

export default Form;
