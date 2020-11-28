import React, { Component } from "react";
import "./FileLoader.scss";
import { uploadImage } from "actions";

export class FileLoader extends Component {
  constructor() {
    super();
    this.fileReader = new FileReader();
    this.selectedImage = null;
    this.state = {
      imgBase64: "",
    };
  }

  componentDidMount() {
    this.listenToFileLoading();
  }

  componentWillUnmount() {
    this.removeFileLoadListener();
  }

  handleImageUpload = () => {
    uploadImage(this.selectedImage)
      .then(() => {
        alert("Image Uploaded");
      })
      .catch(() => {
        alert("Upload failed");
      });
  };

  handleImageLoad = ({ target: { result: imgBase64 } }) => {
    this.setState({
      imgBase64,
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

  render() {
    const { imgBase64 } = this.state;
    return (
      <div className="img-upload-container">
        <label className="img-upload btn btn-bwm-main">
          <span className="upload-text">Select an image</span>
          <input
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
                <img src={imgBase64} alt="" />
              </div>
            </div>
            <button
              className="btn btn-success mr-1"
              type="button"
              onClick={this.handleImageUpload}
            >
              Upload
            </button>
            <button className="btn btn-danger" type="button">
              Cancel
            </button>
          </>
        )}
      </div>
    );
  }
}

export default FileLoader;
