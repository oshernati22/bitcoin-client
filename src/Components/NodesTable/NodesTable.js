import React, { useState } from "react";
import MaterialTable from "@material-table/core";

import { useDispatch } from "react-redux";
import { adressesActions } from "../../store/adressesSlice";

import { columns, checkIfValid } from "./TableHelpers";

const NodesTable = ({ rows }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (selectedRows) {
      for (const row of selectedRows) {
        dispatch(adressesActions.removeData(row));
      }

      dispatch(adressesActions.addInitail(false));
    }
  };
  return (
    <div>
      <MaterialTable
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
                  alert("not valid");
                  return reject();
                }

                dispatch(adressesActions.addInitail(true));
                dispatch(adressesActions.updateData([newData, oldData]));

                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
};

export default NodesTable;
