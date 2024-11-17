import axios from "@/utils/axios";
import { IFileItem } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

const fetchUserFiles = async () => {
  const response = await axios.get(`/files/my-files`);
  return response.data.files;
};

const FilesPage = () => {
  const [items, setItems] = useState<IFileItem[]>([]);

  const { data, refetch } = useQuery({
    queryKey: ["fetchUserFiles"],
    queryFn: () => fetchUserFiles(),
  });

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  const onSuccess = () => {
    refetch();
  };

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 p-8">
      <div className="flex-1 mb-8 lg:mb-0">
        <FileUpload onFileUpload={onSuccess} />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Uploaded Files</h1>
        <FileList files={items} />
      </div>
    </div>
  );
};

export default FilesPage;