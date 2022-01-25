import { faBold } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import NodesTable from "../NodesTable/NodesTable";

//make matriel-table rows array
const getRows = (data) => {
  const rows = [];

  for (const [i, el] of data.entries()) {
    let location;

    if (el.status === "PENDING") {
      el.status = "Activated pending availability of a new snapshot";
    }
    if (el.status === "UP") el.status = "Currently reachable";
    if (el.status === "DOWN ") el.status = "Currently unreachable";
    if (el.data) {
      location = el.data[10];
    } else {
      location = "Unknown";
    }
    rows.push({
      id: i,
      address: el.address,
      port: el.port,
      status: el.status,
      location: location,
    });
  }
  return rows;
};

const DataHandler = () => {
  const [rows, setRows] = useState();
  const adressesJson = useSelector((state) => state.adresses);

  const { post, response, loading, error } = useFetch(
    "https://osherserver.herokuapp.com/api/v1"
  );

  const intervalInMili = adressesJson.timeInterval * 60000; //calculate user interval

  //send json to server and handle the results
  async function sendAdresses() {
    const bitcoinNodesJson = await post("/bitcoins", adressesJson);
    if (response.ok) {
      setRows(getRows(bitcoinNodesJson.data));
    }
  }
  //post to server
  useEffect(() => {
    sendAdresses();
    setInterval(() => sendAdresses(), intervalInMili);
  }, [adressesJson]);

  return (
    <div>
      {/* if we accept data from server show it in matrial-table */}
      {rows && <NodesTable rows={rows} />}
      {loading && (
        <FontAwesomeIcon className="icon" icon={faBold} spin={true} />
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default DataHandler;
