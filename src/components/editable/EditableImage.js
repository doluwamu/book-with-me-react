import React, { Component } from "react";
import EditableComponent from "./EditableComponent";
import FileLoader from "components/file-upload/FileLoader";

const ImageView = ({ value, ...rest }) => {
  return <img {...rest} src={value} alt="" />;
};

const createEvent = (value) => ({ target: { value } });

export class EditableImage extends Component {
  render() {
    return (
      <EditableComponent
        {...this.props}
        viewComponent={ImageView}
        renderComponent={(value, onChange, onKeyDown) => (
          <FileLoader onFileUpload={(image) => onChange(createEvent(image))} />
        )}
      />
    );
  }
}
