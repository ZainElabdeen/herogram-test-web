import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";

type FileUploadProps = {
  onFileUpload: (file: File) => void;
};

const FileUpload: FC<FileUploadProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    maxFiles: 1,
  });

  const handleUploadClick = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`w-full p-8 text-center cursor-pointer focus:outline-none ${
          isDragActive ? "bg-gray-200 border-gray-500" : ""
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-700">Drop the file here ...</p>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <UploadCloud className="w-10 h-10 text-gray-400" />
            <p className="text-gray-600">
              Drag and drop a file here, or click to select a file
            </p>
          </div>
        )}
      </div>

      {/* Display Selected File Info */}
      {selectedFile && (
        <div className="w-full mt-4">
          <h4 className="mb-2 text-sm font-semibold text-gray-800">
            Selected File:
          </h4>
          <div className="text-sm text-gray-600">
            {selectedFile.name} - {Math.round(selectedFile.size / 1024)} KB
          </div>
        </div>
      )}

      {/* Display Image Preview */}
      {previewUrl && (
        <div className="w-full mt-4 ">
          <h4 className="mb-2 text-sm font-semibold text-gray-800">
            Image Preview:
          </h4>
          <div className="w-full flex items-center justify-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-64 rounded-lg shadow-md"
            />
          </div>
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && (
        <Button variant="default" className="mt-4" onClick={handleUploadClick}>
          Upload File
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
