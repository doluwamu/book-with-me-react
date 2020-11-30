import React, { Component } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/lib/ReactCrop.scss";

export class ImageCrop extends Component {
  state = {
    crop: {
      unit: "%", // default, can be 'px' or '%'
      x: 0,
      y: 0,
      width: 100,
      aspect: 3 / 2,
    },
  };

  onChange = (crop) => {
    this.setState({ crop });
  };

  render() {
    const { src, onImageLoaded, onCropComplete } = this.props;
    const { crop } = this.state;
    return (
      <ReactCrop
        src={src}
        crop={crop}
        onComplete={onCropComplete}
        onImageLoaded={onImageLoaded}
        onChange={this.onChange}
      />
    );
  }
}

export default ImageCrop;
