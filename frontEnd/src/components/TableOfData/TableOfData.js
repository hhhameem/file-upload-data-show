import axios from "axios";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import generateColumns, {
  sweetAlertFire,
} from "../../customFunctions/customTasks";

const TableOfData = ({ uploaded, setUploaded, data, setData }) => {
  //! only fetch data once the file is uploaded successfully
  //! and then prepare data according to the requirement of data table
  useEffect(() => {
    if (uploaded) {
      axios
        .get("http://localhost:5000/")
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (error) {
          sweetAlertFire("error", "Oops..", error.message);
        })
        .finally(() => setUploaded(false));
    } else {
      return;
    }
  }, [uploaded, setUploaded, setData]);

  //! generating columns to show on data table
  let generatedColumns = generateColumns(data);

  return (
    <DataTable
      title='List Of Data'
      columns={generatedColumns}
      data={data}
      pagination
      striped
      highlightOnHover
      selectableRows
    />
  );
};

export default TableOfData;
