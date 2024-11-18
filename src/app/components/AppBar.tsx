import { Button } from "@/components/ui/button"; // Assuming you have a Button component from ShadCN
import { FC } from "react";

type AppBarProps = {
  onLogout: () => void;
};

const AppBar: FC<AppBarProps> = ({ onLogout }) => {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 shadow-md">
      <div className="text-lg font-semibold">File Upload App</div>

      <Button
        variant="ghost"
        className="text-gray-500 hover:bg-gray-700"
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default AppBar;
