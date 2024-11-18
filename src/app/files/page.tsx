import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { IFileItem } from "@/utils/types";
import axios from "@/utils/axios";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

const fetchUserFiles = async () => {
  const response = await axios.get(`/files/my-files`);
  return response.data.files;
};

const uploadFileMutation = async (file: File): Promise<IFileItem> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.file;
};

const FilesPage = () => {
  const [items, setItems] = useState<IFileItem[]>([]);

  const { data, refetch } = useQuery({
    queryKey: ["fetchUserFiles"],
    queryFn: () => fetchUserFiles(),
  });

  const { mutate } = useMutation({
    mutationFn: uploadFileMutation,
    onSuccess: () => {
      refetch();
    },
    onError: (err: any) => {
      console.error("Error uploading file:", err);
    },
  });

  const handleFileUpload = (file: File) => {
    mutate(file);
  };

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 p-8">
      <div className="flex-1 mb-8 lg:mb-0">
        <FileUpload onFileUpload={handleFileUpload} />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Uploaded Files</h1>
        <FileList files={items} />
      </div>
    </div>
  );
};

export default FilesPage;
