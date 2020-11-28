import React, { Component } from "react";
import "./FileLoader.scss";

export class FileLoader extends Component {
  constructor() {
    super();
    this.fileReader = new FileReader();
    this.state = {
      imgBase64: "",
    };
  }

  componentDidMount() {
    this.listenToFileLoading();
  }

  handleImageLoad = ({ target: { result: imgBase64 } }) => {
    this.setState({
      imgBase64,
    });
  };

  listenToFileLoading = () => {
    this.fileReader.addEventListener("load", this.handleImageLoad);
  };

  handleChange = (event) => {
    const file = event.target.files[0];
    this.fileReader.readAsDataURL(file);
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
        {imgBase64 && <img src={imgBase64} alt="" />}
      </div>
    );
  }
}

export default FileLoader;
