import React, { Component } from "react";
import "./FileLoader.scss";
import { uploadImage } from "actions";
import Spinner from "components/shared/Spinner";
import ImageCrop from "./ImageCrop";
import { blobToFile, getCroppedImg } from "helpers/functions";

class ImageSnippet {
  constructor(src, name, type) {
    this.src = src;
    this.name = name;
    this.type = type;
  }
}

export class FileLoader extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.fileReader = new FileReader();
    this.originalImage = null;
    this.state = {
      croppedImg: null,
      selectedImg: null,
      imgStatus: "INIT",
    };
  }

  handleImageUpload = () => {
    const { croppedImg } = this.state;
    this.changeImageStatus("PENDING");

    const imageToUpload = blobToFile(croppedImg);
    uploadImage(imageToUpload)
      .then((uploadedImage) => {
        this.props.onFileUpload(uploadedImage);
        this.changeImageStatus("UPLOADED");
      })
      .catch(() => {
        this.changeImageStatus("ERROR");
      });
  };

  handleImageLoad = (image) => (this.originalImage = image);

  handleCropComplete = async (crop) => {
    if (!this.originalImage) {
      return;
    }
    const { selectedImg } = this.state;
    const croppedImg = await getCroppedImg(
      this.originalImage,
      crop,
      selectedImg.name
    );
    this.setState({ croppedImg });
  };

  handleChange = (event) => {
    const file = event.target.files[0];

    this.fileReader.onloadend = (event) => {
      const selectedImg = new ImageSnippet(
        event.target.result,
        file.name,
        file.type
      );
      this.setState({
        selectedImg,
        imgStatus: "LOADED",
      });
    };

    this.fileReader.readAsDataURL(file);
  };

  cancelImage = () => {
    this.inputRef.current.value = null;
    this.originalImage = null;
    this.setState({ selectedImg: null, croppedImg: null, imgStatus: "INIT" });
  };

  changeImageStatus = (imgStatus) => {
    this.setState({ imgStatus });
  };

  render() {
    const { selectedImg, imgStatus, croppedImg } = this.state;
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
        {selectedImg && (
          <ImageCrop
            onImageLoaded={this.handleImageLoad}
            onCropComplete={this.handleCropComplete}
            src={selectedImg.src}
          />
        )}
        {selectedImg && (
          <>
            <div className="img-preview-container mb-2">
              <div className="img-preview">
                <img
                  src={croppedImg ? croppedImg.url : selectedImg.src}
                  alt=""
                />
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
