import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, CardBody, Col, Row } from "reactstrap"
import { Link } from "react-router-dom"
import { map } from "lodash"
import moment from "moment"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import AvField from "availity-reactstrap-validation/lib/AvField"
import axiosApi from "helpers/api_helper"

const Comments = ({ comments, id }) => {
  const [role, setrole] = useState("");
  const [loginUser, setLoginUser] = useState("");
  const [addedFile, setAddedFile] = useState(false);
  const [delCommentId, setDelComment] = useState(-1);
  const [delCommentDocId, setDelCommentDoc] = useState(-1);
  const [delDocId, setDelDoc] = useState(-1)
  const [delDocComId, setDelDocCom] = useState(-1)
  const [editCommentId, setEditCommentId] = useState(-1)
  const [deleteText, setText] = useState("comment");
  const [fileValue, setFile] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [submitComment, setSubmitText] = useState("Add Comment");
  const [replyingto, setreplyingto] = useState("tester");
  const [replyingID, setReplyingID] = useState(-1)
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setrole(obj.userrole)
        setLoginUser(obj.first_name + " " + obj.last_name)
      }
    }
  }, []);

  function onExpand(e) {
    e.preventDefault();
    const title = document.getElementById("comments-trail");
    const ul = document.getElementById("comments-items")
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
    const date1 = moment(new Date(date)).format("hh:mm MMM DD Y");
    return date1;
  };

  const handleValidSubmit = async values => {
    if (replyingID != -1) {
      if (addedFile) {
        let replyData = new FormData();
        replyData.append("name", fileValue.name);
        replyData.append("file", fileValue);
        replyData.append("id", id);
        await axiosApi().post(`api/upload-doc`, replyData)
          .then(response => {
            const replydocumentID = response.data.document._id;
            let replycommentData = {
              content: values.content,
              id: id,
              documents: [replydocumentID],
              parentId: replyingID
            }
            axiosApi().post(`api/add-comment`, replycommentData)
              .then(response => {
                window.location.reload();
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        let replyaddData = {
          content: values.content,
          id: id,
          parentId: replyingID
        }
        axiosApi().post(`api/add-comment`, replyaddData)
          .then(response => {
            window.location.reload();
          })
          .catch(err => {
            console.log(err)
          })
      }
    } else if (editCommentId != -1) {
      if (addedFile) {
        let addedData = new FormData();
        addedData.append("name", fileValue.name);
        addedData.append("file", fileValue);
        addedData.append("id", id);
        await axiosApi().post(`api/upload-doc`, addedData)
          .then(response => {
            const docID = response.data.document._id;
            let updateData = {
              comments: values.content,
              id: id,
              documents: [docID]
            }
            axiosApi().patch(`api/comments/${editCommentId}`, updateData)
              .then(response => {
                window.location.reload();
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        let updatedData = {
          comments: values.content,
          id: id,
        }
        await axiosApi().patch(`api/comments/${editCommentId}`, updatedData)
          .then(response => {
            window.location.reload();
          })
          .catch(err => {
            console.log(err)
          })
      }
    } else {
      if (addedFile) {
        let formData = new FormData();
        formData.append("name", fileValue.name);
        formData.append("file", fileValue);
        formData.append("id", id);
        await axiosApi().post(`api/upload-doc`, formData)
          .then(response => {
            const documentID = response.data.document._id;
            let commentData = {
              content: values.content,
              id: id,
              documents: [documentID]
            }
            axiosApi().post(`api/add-comment`, commentData)
              .then(response => {
                window.location.reload();
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        let addData = {
          content: values.content,
          id: id,
        }
        axiosApi().post(`api/add-comment`, addData)
          .then(response => {
            window.location.reload();
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }

  const onAddFile = (event) => {
    if (event.target.files[0].size > 5242880) {
      document.getElementById('file-error-pop').style.display = 'flex';
      document.body.style.overflowY = "hidden"
      return;
    };
    document.getElementById("attachfile").style.display = 'flex';
    setAddedFile(true);
    const file = event.target.files[0];
    setFile(file);
    document.getElementById("attachfilename").innerText = event.target.files[0].name
  }

  const cancelFile = () => {
    setAddedFile(false);
    document.getElementById("attachfile").style.display = 'none';
    document.getElementById("attachfilename").innerText = "";
  }

  const deleteComment = (commentId, docID) => {
    setText("comment");
    setDelComment(commentId);
    setDelCommentDoc(docID)
    let popup = document.getElementById('saved-pop');
    popup.style.display = 'flex';
    document.body.style.overflowY = "hidden"
  }

  const deleteDocument = (docId, comId) => {
    setText("attachment");
    setDelDoc(docId);
    setDelDocCom(comId);
    let popup = document.getElementById('saved-pop');
    popup.style.display = 'flex';
    document.body.style.overflowY = "hidden"
  }

  const replyComment = (commentid, author) => {
    console.log(commentid)
    setreplyingto(author);
    setReplyingID(commentid)
    setSubmitText("Reply Comment")
    document.getElementById("reply_comment_container").style.display = "flex";
  }

  const cancelReply = () => {
    setCommentText("");
    document.getElementById("reply_comment_container").style.display = "none";
    setReplyingID(-1)
    setSubmitText("Add Comment")
  }

  const editComment = (commentid) => {
    const commentValue = Array.from(document.querySelector("p#" + ("comment-" + commentid)).childNodes)
      .reduce((text, node) => text + (node.wholeText || ''), '');
    setCommentText(commentValue);
    setSubmitText("Edit Comment")
    setEditCommentId(commentid);
    document.getElementById("edit_comment_container").style.display = "flex";
  }
  const cancelEdit = () => {
    setCommentText("");
    document.getElementById("edit_comment_container").style.display = "none";
    setSubmitText("Add Comment")
    setEditCommentId(-1);
  }

  const closePopup = () => {
    let popup = document.getElementById('saved-pop');
    popup.style.display = 'none';
    document.body.style.overflowY = "auto";
    setDelComment(-1);
    setDelCommentDoc(-1);
    setDelDoc(-1)
    setDelDocCom(-1)
  }

  const onCommentDelete = async () => {
    if (delCommentId != -1) {
      await axiosApi().delete(`api/comments/${delCommentId}`)
        .then(response => {
          if (delCommentDocId != -1) {
            axiosApi().delete(`api/upload-doc/${delCommentDocId}`)
              .then(response => {
                window.location.reload();
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      if (delDocId != -1) {
        await axiosApi().delete(`api/upload-doc/${delDocId}`)
          .then(response => {
            let delDocData = {
              documents: []
            }
            axiosApi().patch(`api/comments/${delDocComId}`, delDocData)
              .then(response => {
                window.location.reload();
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    closePopup()
  }



  return (
    <Card>
      <CardBody className="contractor-overview m-4">
        <Link to="" id="comments-trail" className="font-size-15 has-arrow " style={{ fontWeight: "600", color: "#495057" }} onClick={e => onExpand(e)}>
          Comments
        </Link>
        <div className="success-container" id="saved-pop" style={{ display: "none" }}>
          <div className="success-card">
            <div className="close-button">
              <button className="btn" onClick={() => { closePopup() }}><i className="mdi mdi-close-thick"></i></button>
            </div>
            {delDocId != -1 ? <div className="success-icon">
              <i className="mdi mdi-delete-outline" style={{ fontSize: "25px", background: "#F46A6A", color: "#FFF", borderRadius: "50%", padding: "2px 7px" }}></i>
            </div> : null}
            {delDocId != -1 ? <div style={{ fontSize: "18px", fontWeight: "500", padding: "10px 0 20px 0" }}>Delete Attachment</div> : null}
            <div className="mt-2" style={{ fontWeight: "500", fontSize: "14px" }}>
              Do you want to delete this {deleteText}?
            </div>
            <div className="mt-4 go-btn-container">
              <button onClick={() => { closePopup() }} className={delDocId != -1 ? "btn btn-danger" : "btn btn-primary"} style={{ color: "#495057", background: "transparent", width: "130px", marginRight: "10px" }}>Cancel</button>
              <button onClick={() => { onCommentDelete() }} className={delDocId != -1 ? "btn btn-danger" : "btn btn-primary"} style={{ width: "130px", marginLeft: "10px" }}>Delete</button>
            </div>
          </div>
        </div>
        <ul className="list-unstyled text-center mt-4 sub-menu mm-collapse" id="comments-items">
          {map(comments, (comment, index) => (
            <li style={{ textAlign: "left", paddingBottom: "24px", position: "relative" }} key={index}>
              <Row>
                <Col xs={3} style={{ display: "flex", alignItems: "flex-start" }}>
                  <div className="avatar-xs" style={{ marginRight: "10px" }}>
                    <span className="comment avatar-title rounded-circle bg-soft-primary text-primary">
                      {(comment.author).charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-size-15">{comment.author}</div>
                    <div className="font-size-13" style={{ color: "#CACCCF" }}>
                      {handleValidDate(comment.created_time)}
                    </div>
                  </div>

                </Col>
                <Col xs={role == "ir35pro" ? 7 : 9}>
                  <p id={"comment-" + comment._id} className="font-size-15">{comment.comments}
                    {(comment.created_time !== comment.updated_time && loginUser == comment.author) ? <span style={{ fontSize: "13px", color: "#CACCCF" }}> (edited)</span> : null}
                  </p>
                  {comment.documents.length > 0 ?
                    <div className="document-container">
                      <Link style={{ background: "#d4ecfe", padding: "5px 10px", borderRadius: "3px" }} to={{ pathname: (comment.documents[0].doc_path).substr(0, (comment.documents[0].doc_path).lastIndexOf('/') + 1) + comment.documents[0].doc_title }} target="_blank" download>
                        <i className="bx bxs-file-pdf" style={{ paddingRight: "10px", color: "#00AEEF" }}></i>
                        {comment.documents[0].doc_title}
                        <i className="mdi mdi-download" style={{ fontSize: "16px", color: "#00aeef", paddingLeft: "10px" }}></i>
                      </Link>
                      <Link className="btn" to="#" onClick={e => { deleteDocument(comment.documents[0]._id, comment._id) }}>X</Link>
                    </div> : null}
                </Col>
                {role == "ir35pro" ?
                  <Col xs={2} style={{ textAlign: "right" }}>
                    {loginUser == comment.author ?
                      <Link className="btn" to="#" onClick={e => { editComment(comment._id) }}><i className="mdi mdi-square-edit-outline" style={{ fontSize: "16px", color: "#00aeef" }}></i></Link> :
                      <Link className="btn" to="#" onClick={e => { replyComment(comment._id, comment.author) }}><i className="mdi mdi-reply-outline" style={{ fontSize: "16px", color: "#00aeef" }}></i></Link>
                    }
                    <Link className="btn" to="#" onClick={e => { deleteComment(comment._id, comment.documents.length > 0 ? comment.documents[0]._id : -1) }} style={{ transform: "rotate(45deg)" }}><i className="mdi mdi-plus-thick" style={{ fontSize: "16px" }}></i></Link>
                  </Col> : null}
              </Row>
              {comment.childrenComments ?
                <div style={{ position: "absolute", width: "1px", height: "calc(100% - " + (50 + 20 * Object.keys(comment.childrenComments).length) + "px)", background: "#ced4d9", top: "50px", left: "15px" }}></div> :
                null
              }
              {comment.childrenComments ?
                <ul className="list-unstyled text-center mt-4 reply-comment">
                  {map(comment.childrenComments, (child_comment, index) => (
                    <li style={{ textAlign: "left", paddingBottom: "24px" }} key={index}>
                      <Row>
                        <Col xs={3} style={{ display: "flex", alignItems: "flex-start", paddingLeft: "50px" }}>
                          <div className="avatar-xs" style={{ marginRight: "10px" }}>
                            <span className="comment avatar-title rounded-circle bg-soft-primary text-primary">
                              {(child_comment.author).charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-size-15">{child_comment.author}</div>
                            <div className="font-size-13" style={{ color: "#CACCCF" }}>
                              {handleValidDate(child_comment.created_time)}
                            </div>
                          </div>

                        </Col>
                        <Col xs={role == "ir35pro" ? 7 : 9}>
                          <p id={"comment-" + child_comment._id} className="font-size-15">{child_comment.comments}</p>
                          {child_comment.documents.length > 0 ?
                            <div className="document-container">
                              <Link style={{ background: "#d4ecfe", padding: "5px 10px", borderRadius: "3px" }} to={{ pathname: (child_comment.documents[0].doc_path).substr(0, (child_comment.documents[0].doc_path).lastIndexOf('/') + 1) + child_comment.documents[0].doc_title }} target="_blank" download>
                                <i className="bx bxs-file-pdf" style={{ paddingRight: "10px", color: "#00AEEF" }}></i>
                                {child_comment.documents[0].doc_title}
                                <i className="mdi mdi-download" style={{ fontSize: "16px", color: "#00aeef", paddingLeft: "10px" }}></i>
                              </Link>
                              <Link className="btn" to="#" onClick={e => { deleteDocument(child_comment.documents[0]._id, child_comment._id) }}>X</Link>
                            </div> : null}
                        </Col>
                        {role == "ir35pro" ?
                          <Col xs={2} style={{ textAlign: "right" }}>
                            {loginUser == child_comment.author ?
                              <Link className="btn" to="#" onClick={e => { editComment(child_comment._id) }}><i className="mdi mdi-square-edit-outline" style={{ fontSize: "16px", color: "#00aeef" }}></i></Link> :
                              <Link className="btn" to="#" onClick={e => { replyComment(comment._id, child_comment.author) }}><i className="mdi mdi-reply-outline" style={{ fontSize: "16px", color: "#00aeef" }}></i></Link>
                            }
                            <Link className="btn" to="#" onClick={e => { deleteComment(child_comment._id, child_comment.documents.length > 0 ? child_comment.documents[0]._id : -1) }} style={{ transform: "rotate(45deg)" }}><i className="mdi mdi-plus-thick" style={{ fontSize: "16px" }}></i></Link>
                          </Col> : null}
                      </Row>
                    </li>))}
                </ul> :
                null
              }
            </li>
          ))}
          {role != "user" ?
            <li>
              <AvForm
                onValidSubmit={(e, v) => {
                  handleValidSubmit(v)
                }}
                style={{ textAlign: "right", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
              >
                <div style={{ width: "100%", position: "relative", textAlign: "left" }}>
                  <div id="edit_comment_container" style={{ display: "none", position: "absolute", top: "-25px", width: "100%", color: "#CACCCF", justifyContent: "space-between", padding: "0 5px" }}>
                    <div>Edit comment</div>
                    <Link to="#" onClick={() => { cancelEdit() }} style={{ color: "#CACCCF" }}>X</Link>
                  </div>
                  <div id="reply_comment_container" style={{ display: "none", position: "absolute", top: "-25px", width: "100%", color: "#CACCCF", justifyContent: "space-between", padding: "0 5px" }}>
                    <div>Replying to {replyingto}</div>
                    <Link to="#" onClick={() => { cancelReply() }} style={{ color: "#CACCCF" }}>X</Link>
                  </div>
                  <AvField
                    type="textarea"
                    className="form-control"
                    rows={3}
                    name="content"
                    style={{ paddingBottom: "50px" }}
                    required
                    value={commentText}
                  />
                  <div id="attachfile"
                    style={{ position: "absolute", bottom: "0", left: "0", background: "#D4ECFE", marginLeft: "12px", marginBottom: "8px", display: "none", alignItems: "center", borderRadius: "4px" }}>
                    <i className="mdi mdi-file-document-outline" style={{ fontSize: "20px", color: "#00aeef", padding: "0 10px" }}></i>
                    <div id="attachfilename" style={{ paddingRight: "10px" }}></div>
                    <Link className="btn" to="#" onClick={e => { cancelFile() }} style={{ background: "#FFF", borderRadius: "0" }}>X</Link>
                  </div>
                </div>
                <div style={{ marginLeft: "15px" }}>
                  <AvField
                    onChange={e => { onAddFile(e) }}
                    type="file" accept=".doc, .pdf, .docx, .jpg, .jpeg, .png, .xls, .xlsx, .odt, .ods, .csv, .gsheet"
                    className="form-control"
                    name="input-upload-doc"
                    aria-describedby="inputDocFileUpload"
                    aria-label="Upload"
                    id="chooseCommentDoc"
                    hidden
                  />
                  <label htmlFor="chooseCommentDoc" style={{ transform: "rotate(315deg)" }}> <i className="mdi mdi-attachment" style={{ fontSize: "20px", color: "#00aeef" }}></i></label>
                </div>
                <button className="btn btn-primary  mt-3" type="submit" style={{ width: "170px", marginLeft: "50px" }}>{submitComment}</button>
              </AvForm>
            </li> : ""
          }
        </ul>
      </CardBody>
    </Card>
  )
}

Comments.propTypes = {
  comments: PropTypes.object,
  id: PropTypes.string,
}

export default Comments
