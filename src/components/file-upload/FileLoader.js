import React, { Component } from "react";
import "./FileLoader.scss";
import { uploadImage } from "actions";
import Spinner from "components/shared/Spinner";

export class FileLoader extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.fileReader = new FileReader();
    this.selectedImage = null;
    this.state = {
      imgBase64: "",
      imgStatus: "INIT",
    };
  }

  componentDidMount() {
    this.listenToFileLoading();
  }

  componentWillUnmount() {
    this.removeFileLoadListener();
  }

  handleImageUpload = () => {
    this.changeImageStatus("PENDING");
    uploadImage(this.selectedImage)
      .then((uploadedImage) => {
        this.props.onFileUpload(uploadedImage._id);
        this.changeImageStatus("UPLOADED");
      })
      .catch(() => {
        this.changeImageStatus("ERROR");
      });
  };

  handleImageLoad = ({ target: { result: imgBase64 } }) => {
    this.setState({
      imgBase64,
      imgStatus: "LOADED",
    });
  };

  listenToFileLoading = () => {
    this.fileReader.addEventListener("load", this.handleImageLoad);
  };

  removeFileLoadListener = () => {
    this.fileReader.removeEventListener("load", this.handleImageLoad);
  };

  handleChange = (event) => {
    this.selectedImage = event.target.files[0];
    this.fileReader.readAsDataURL(this.selectedImage);
  };

  cancelImage = () => {
    this.inputRef.current.value = null;
    this.selectedImage = null;
    this.setState({ imgBase64: "", imgStatus: "INIT" });
  };

  changeImageStatus = (imgStatus) => {
    this.setState({ imgStatus });
  };

  render() {
    const { imgBase64, imgStatus } = this.state;
    return (
      <div className="img-upload-container">
        <label className="img-upload btn btn-bwm-main">
          <span className="upload-text">Select an image</span>
          <input
            ref={this.inputRef}
            onChange={this.handleChange}
            accept=".jpg, .png, .jpeg"
            className="file-input"
            type="file"
          />
        </label>
        {imgBase64 && (
          <>
            <div className="img-preview-container mb-2">
              <div className="img-preview">
                <img src={imgBase64} alt="Image to be uploaded" />
              </div>
              {imgStatus === "PENDING" && (
                <div className="spinner-container upload-status">
                  <Spinner />
                </div>
              )}
              {imgStatus === "UPLOADED" && (
                <div className="alert alert-success upload-status">
                  Image has been successfully uploaded!
                </div>
              )}
              {imgStatus === "ERROR" && (
                <div className="alert alert-danger upload-status">
                  Image upload failed!
                </div>
              )}
            </div>
            {imgStatus === "LOADED" && (
              <button
                className="btn btn-success mr-1"
                type="button"
                onClick={this.handleImageUpload}
              >
                Upload
              </button>
            )}

            {imgStatus === "LOADED" ||
            imgStatus === "PENDING" ||
            imgStatus === "ERROR" ? (
              <button
                className="btn btn-danger"
                type="button"
                onClick={this.cancelImage}
              >
                Cancel
              </button>
            ) : (
              <button
                className="btn btn-success"
                type="button"
                onClick={this.cancelImage}
              >
                Okay
              </button>
            )}
          </>
        )}
      </div>
    );
  }
}

export default FileLoader;
