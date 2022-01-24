import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import useFetch from "use-http";

const columns = [
  { title: "Address", field: "address" },
  { title: "Port", field: "port", type: "numeric" },
  { title: "Status", field: "status", editable: "never" },
  { title: "Location", field: "location", editable: "never" },
];

const checkIfValid = (adress) => {
  const regexExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  return regexExp.test(adress);
};

const getRows = (data) => {
  const rows = [];

  for (const el of data) {
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
      address: el.address,
      port: el.port,
      status: el.status,
      location: location,
    });
  }
  return rows;
};

const NodesTable = ({ adressesJson, setAdressesJson }) => {
  const [tableData, setTableData] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);

  const { post, response, loading, error } = useFetch(
    "https://osherserver.herokuapp.com/api/v1"
  );
  const intervalInMili = adressesJson.timeInterval * 60000;
  async function sendAdresses() {
    const bitcoinNodesJson = await post("/bitcoins", adressesJson);
    if (response.ok) {
      setRows(getRows(bitcoinNodesJson.data));
      setTableData(bitcoinNodesJson.data);
    }
  }

  useEffect(() => {
    sendAdresses();
    setInterval(() => sendAdresses(), intervalInMili);
  }, [adressesJson]);

  const handleDelete = () => {
    if (selectedRows) {
      for (const row of selectedRows) {
        adressesJson.data = adressesJson.data.filter((adress) => {
          return !(adress.ip === row.address);
        });
      }

      setAdressesJson((prevState) => {
        return {
          timeInterval: prevState.timeInterval,
          initial: false,
          data: adressesJson.data,
        };
      });
    }
  };
  return (
    <div>
      {tableData && (
        <MaterialTable
          // get selected rows
          // onRowClick={(event, rowData) => {
          //   navigate(`students/${rowData?.id}`);
          //   event?.stopPropagation();
          // }}
          style={{ backgroundColor: "#ffffffa6" }}
          columns={columns}
          title={"Bitcoin node"}
          data={rows}
          onSelectionChange={(rows) => setSelectedRows(rows)}
          options={{
            selection: true,
          }}
          actions={[
            {
              icon: "delete",
              tooltip: "Delete Selected Rows ",
              onClick: () => handleDelete(),
            },
          ]}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (!checkIfValid(newData.address) || newData.port > 65535) {
                    return reject();
                  }
                  const index = oldData.tableData.id;

                  adressesJson.data[index].ip = newData.address;
                  adressesJson.data[index].port = newData.port.toString();
                  setAdressesJson((prevState) => {
                    return {
                      timeInterval: prevState.timeInterval,
                      initial: prevState.initial,
                      data: adressesJson.data,
                    };
                  });

                  resolve();
                }, 1000);
              }),
          }}
        />
      )}
      {loading && <p>loadinggggggggggg</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default NodesTable;
