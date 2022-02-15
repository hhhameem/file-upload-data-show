import React, { useState } from "react";
import { sweetAlertFire } from "../../customFunctions/customTasks";
import icon from "../../upload-file.png";
const axios = require("axios");

const InputFile = ({ uploaded, setUploaded, setSubmitted }) => {
  const [fileState, setFile] = useState({});
  const [deactive, setDeactive] = useState(true);
  const [type, setType] = useState("");
  const [size, setSize] = useState(0);
  const [name, setName] = useState("");

  //! function to handle files on change and to check if the file
  //! size and file type are ok. If ok then prepare files to upload by storing
  //! files information in state. User can upload files with max 2 MB size and
  //! only .xlsx, xls, & csv file type. If not then displays alert.
  const handleChange = (e) => {
    setType("");
    setSize(0);
    const myFile = e.target.files[0];
    const myFileType = myFile.type.split("/")[1];

    //! show alert and stop loading file if file size is greater than 2 MB
    //! & not.xls, xlsx, & csv file type.
    if (myFile.size > 2000000) {
      setDeactive(true);
      sweetAlertFire(
        "error",
        "Oops...",
        "File size can not be more than than 2MB"
      );
      return;
    } else if (
      myFileType !== "vnd.ms-excel" &&
      myFileType !== "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setDeactive(true);
      sweetAlertFire(
        "error",
        "Oops...",
        "Only .xls, .xlsx & .csv file type accepted"
      );
      return;
    }

    setType(myFileType);
    setSize(myFile.size);
    setName(myFile.name);
    setDeactive(false);

    //! creating form data to send on backend
    var formData = new FormData();
    formData.append("uploadedFiles", e.target.files[0]);
    setFile(formData);
  };

  //! function to send files to the bakcend
  //! here again file size and type is checked for security. If size and type
  //! does not match with our reirements then shows alert and stop sending file to the backend.
  //! file size and type is ok then sends the file to the backend.
  const handleSubmit = (e) => {
    e.preventDefault();
    //! show alert and stop loading file if file size is greater than 2 MB
    //! & not.xls, xlsx, & csv file type.
    if (type === "" || size === 0) {
      sweetAlertFire(
        "info",
        "Clicked",
        "Only .xls, .xlsx & .csv file type accepted. Also file size can not be more than than 2MB"
      );
      return;
    }
    //! upload or send file to the backend and shows
    //! success alert to user if the file upload is successfull
    axios
      .post("http://localhost:5000/", fileState)
      .then(function (response) {
        if (response.status === 200) {
          sweetAlertFire("success", "Thank you..", "We got your data");
          setUploaded(true);
          setSubmitted(true);
        }
      })
      .catch(function (error) {
        sweetAlertFire("error", "oops..", error.message);
      });
  };

  return (
    <form method='post' encType='multipart/form-data'>
      <input
        type='file'
        id='file-input'
        className='file-input__input'
        name='uploadedFiles'
        onChange={(e) => handleChange(e)}
      />
      <label className='file-input__label' htmlFor='file-input'>
        <img src={icon} alt='' />
        <span>{name || "Upload File"}</span>
      </label>
      <input
        type='submit'
        className='submitBtn'
        disabled={deactive}
        onClick={(e) => handleSubmit(e)}
      />
    </form>
  );
};

export default InputFile;
