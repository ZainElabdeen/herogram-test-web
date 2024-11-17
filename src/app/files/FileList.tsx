import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios, { baseURL } from "@/utils/axios";
import { IFileItem } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import {
  FileText,
  FileImage,
  FileVideo,
  File,
  ExternalLink,
  Link,
} from "lucide-react";
import { useCallback } from "react";

const sharedLinkMutation = async (fileId: string) => {
  const response = await axios.post(`/files/${fileId}/share`);
  return response.data;
};

const renderFileIcon = (mimetype: string) => {
  if (mimetype.startsWith("image/")) {
    return <FileImage className="w-6 h-6 text-blue-500" />;
  }
  if (mimetype.startsWith("video/")) {
    return <FileVideo className="w-6 h-6 text-green-500" />;
  }
  if (mimetype === "application/pdf") {
    return <FileText className="w-6 h-6 text-red-500" />;
  }
  return <File className="w-6 h-6 text-gray-500" />;
};

const FileListItem = ({ file }: { file: IFileItem }) => {
  const { mutate } = useMutation({
    mutationFn: sharedLinkMutation,
    onSuccess: (data: any) => {
      const sharedLink = `${baseURL}/files/shared/${data?.sharedLink}`;
      alert(`Shared Link: ${sharedLink}`);
    },
    onError: (err: any) => {
      console.error("Error uploading file:", err);
    },
  });

  const handleOpenFile = (filePath: string) => {
    const openFilePath = `${baseURL}/${filePath}`;
    window.open(openFilePath, "_blank");
  };

  const handleGenerateLink = useCallback(() => {
    mutate(file._id);
  }, []);

  return (
    <div
      key={file._id}
      className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
    >
      {/* File Avatar */}
      <div className="flex items-center">
        <Avatar className="mr-4">{renderFileIcon(file.mimetype)}</Avatar>

        {/* File Information */}
        <div>
          <div className="font-medium text-gray-800">{file.filename}</div>
          <div className="text-sm text-gray-500">
            Views: {file.viewCount} | Type: {file.mimetype}
          </div>
        </div>
      </div>

      {/* Generate Shared Link Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleGenerateLink}
        className="ml-4"
      >
        <Link className="w-5 h-5 text-gray-600" />
      </Button>

      {/* Open File Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleOpenFile(file.path)}
        className="ml-4"
      >
        <ExternalLink className="w-5 h-5 text-gray-600" />
      </Button>
    </div>
  );
};

const FileList = ({ files }: { files: IFileItem[] }) => {
  return (
    <div className="space-y-4">
      {files.map((file) => (
        <FileListItem key={file._id} file={file} />
      ))}
    </div>
  );
};

export default FileList;
