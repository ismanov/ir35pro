import React, { useState } from "react"
import PropTypes from "prop-types"
import { Card, CardBody, Col, Row } from "reactstrap"
import { Link } from "react-router-dom"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import AvField from "availity-reactstrap-validation/lib/AvField"
import axiosApi from "helpers/api_helper"
import { map } from "lodash"
import * as moment from "moment";

const IRDocList = ({ docList, id }) => {
  // const [fileValue, setFile] = useState(null);
  function onExpand(e) {
    e.preventDefault();
    const title = document.getElementById("doc-list-title");
    const ul = document.getElementById("doc-items")
    if (title.classList.contains("mm-active")) {
      title.classList.remove("mm-active");
      ul.classList.remove("mm-show");
    } else {
      title.classList.add("mm-active");
      ul.classList.add("mm-show");
    }
  }

  const handleValidDate = date => {
    if (date == null || date == "undefined") {
      return "-";
    }
    const date1 = moment(new Date(date)).format("DD.MM.Y  hh:mm");
    return date1;
  };

  const downloadAll = () => {
    const elements = document.getElementsByClassName("download-container");
    for (let i = 0; i < elements.length; i++) {
      elements[i].getElementsByClassName("download-doc")[0].click();
    }
  }

  const onFileChange = async (e) => {
    if (e.target.files[0].size > 5242880) {
      document.getElementById('file-error-pop').style.display = 'flex';
      document.body.style.overflowY = "hidden"
      return;
    };
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("name", file.name);
    formData.append("file", file);
    formData.append("id", id);

    await axiosApi().post(`api/upload-doc`, formData)
      .then(response => {
        let popup1 = document.getElementById('del-success-pop');
        popup1.style.display = 'flex';
        document.body.style.overflowY = "hidden"
      })
      .catch(err => {
        console.log(err)
      })
  }
  const [deleteDocId, setDelDocID] = useState(-1)
  const deleteDoc = async (docid) => {
    setDelDocID(docid);
    let popup = document.getElementById('del-doc-pop');
    popup.style.display = 'flex';
    document.body.style.overflowY = "hidden"

  }
  const closeDocPopup = () => {
    let popup = document.getElementById('del-doc-pop');
    popup.style.display = 'none';
    document.body.style.overflowY = "auto";
    setDelDocID(-1)
  }
  const closeSucessPopup = () => {
    let popup = document.getElementById('del-success-pop');
    popup.style.display = 'none';
    document.body.style.overflowY = "auto";
    window.location.reload();
  }
  const onDoctDelete = async () => {
    await axiosApi().delete(`api/upload-doc/${deleteDocId}`)
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <Card>
      <CardBody className="contractor-overview m-4">
        <Link to="" id="doc-list-title" className="font-size-15 has-arrow " style={{ fontWeight: "600", color: "#495057" }} onClick={e => onExpand(e)}>
          Documents
        </Link>
        <div className="success-container" id="del-doc-pop" style={{ display: "none" }}>
          <div className="success-card">
            <div className="close-button">
              <button className="btn" onClick={() => { closeDocPopup() }}><i className="mdi mdi-close-thick"></i></button>
            </div>
            <div className="success-icon">
              <i className="mdi mdi-delete-outline" style={{ fontSize: "25px", background: "#F46A6A", color: "#FFF", borderRadius: "50%", padding: "2px 7px" }}></i>
            </div>
            <div style={{ fontSize: "18px", fontWeight: "500", padding: "10px 0 20px 0" }}>Delete Attachment</div>
            <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px" }}>
              Do you want to delete this attachment?
            </div>
            <div className="mt-4 go-btn-container">
              <button onClick={() => { closeDocPopup() }} className="btn btn-danger" style={{ color: "#495057", background: "transparent", width: "130px", marginRight: "10px" }}>Cancel</button>
              <button onClick={() => { onDoctDelete() }} className="btn btn-danger" style={{ width: "130px", marginLeft: "10px" }}>Delete</button>
            </div>
          </div>
        </div>
        <div className="success-container" id="del-success-pop" style={{ display: "none" }}>
          <div className="success-card">
            <div className="close-button">
              <button className="btn" onClick={() => { closeSucessPopup() }}><i className="mdi mdi-close-thick"></i></button>
            </div>
            <div className="success-icon">
              <i className="mdi mdi-check-circle" style={{ fontSize: "25px" }}></i>
            </div>
            <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px" }}>
              Your document was successfully uploaded.
            </div>
            <div className="mt-4 go-btn-container">
              <button onClick={() => { closeSucessPopup() }} className="btn btn-primary" style={{ width: "130px", marginRight: "10px" }}>Close</button>
            </div>
          </div>
        </div>
        <ul className="list-unstyled text-center mt-4 sub-menu mm-collapse" id="doc-items">
          {map(docList, (docItem, index) => (
            <li style={{ textAlign: 'left', borderBottom: "solid 1px #CED4D9", marginBottom: "15px" }} key={index}>
              <Row>
                <Col xs={4}>
                  <p className="font-size-15" style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                    <i className="bx bxs-file-pdf" style={{ paddingRight: "10px", color: "#00AEEF" }}></i>
                    {(docItem.title).substr(0, (docItem.title).lastIndexOf('.'))}
                  </p>
                </Col>
                <Col xs={1}>
                  <p style={{ fontSize: "12px", background: "#D4ECFE", color: "#00AEEF", borderRadius: "3px", display: "inline-block", padding: "2px 5px" }}>
                    {(docItem.title).substr((docItem.title).lastIndexOf('.') + 1).toUpperCase()}
                  </p>
                </Col>
                <Col xs={2}>
                  <p className="font-size-15" style={{ textAlign: "center" }}>
                    {handleValidDate(docItem.createdAt)}
                  </p>
                </Col>
                <Col xs={2}>
                  <p className="font-size-15" style={{ textAlign: "center" }}>
                    {docItem.user}
                  </p>
                </Col>
                <Col xs={3} style={{ textAlign: "right", paddingRight: "20px" }} className="download-container">
                  <Link className="download-doc" to={{ pathname: docItem.path}} target="_blank" style={{ paddingRight: "20px" }} download>
                    <i className="mdi mdi-download" style={{ fontSize: "16px", color: "#00aeef", paddingRight: "10px" }}></i>Download</Link>
                  <Link to="#" style={{ color: "#495057" }} onClick={() => deleteDoc(docItem.id)}>X</Link>
                </Col>
              </Row>
            </li>
          ))}
          <li className="mt-3">
            <AvForm style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Link to="#" className="btn" onClick={() => downloadAll()}
                style={{ border: "solid 1px #00AEEF", marginRight: "20px", width: "150px", padding: "8px 0" }}>Download All</Link>
              <div>
                <AvField
                  onChange={e => onFileChange(e)}
                  type="file" accept=".doc, .pdf, .docx, .jpg, .jpeg, .png, .xls, .xlsx, .odt, .ods, .csv, .gsheet"
                  className="form-control"
                  name="input-upload-doc"
                  aria-describedby="inputDocFileUpload"
                  aria-label="Upload"
                  id="choosedoc"
                  hidden
                />
                <label htmlFor="choosedoc" className="btn btn-primary" style={{ margin: "0", width: "130px", padding: "8px 0" }}>Upload File</label>

              </div>
            </AvForm>
          </li>
        </ul>

      </CardBody>
    </Card >
  )
}

IRDocList.propTypes = {
  docList: PropTypes.array,
  id: PropTypes.string,
}

export default IRDocList
