import Swal from "sweetalert2";

//! generate columns for data table
function generateColumns(params) {
  let generatedColumns = [];
  for (const key in params[0]) {
    generatedColumns.push({
      name: key,
      selector: (row) => row[key],
      sortable: true,
    });
  }
  return generatedColumns;
}

//! universal function to show sweet alert.
export function sweetAlertFire(type, heading, text) {
  Swal.fire(heading, text, type);
}

export default generateColumns;
