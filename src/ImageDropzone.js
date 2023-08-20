import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function ImageDropzone({ onDrop }) {
  const onDropCallback = useCallback(onDrop, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-4 cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag & drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default ImageDropzone;
