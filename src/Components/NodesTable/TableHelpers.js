export const columns = [
  { title: "Number", field: "id" },
  { title: "Address", field: "address" },
  { title: "Port", field: "port", type: "numeric" },
  { title: "Status", field: "status", editable: "never" },
  { title: "Location", field: "location", editable: "never" },
];

export const checkIfValid = (adress) => {
  const regexExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  return regexExp.test(adress);
};
