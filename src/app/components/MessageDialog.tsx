import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type MessageDialogProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

const MessageDialog = ({ open, message, onClose }: MessageDialogProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Shared Link
          </DialogTitle>
          <DialogDescription>
            You can copy the link below to share it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center">
            <Input
              value={message}
              readOnly
              className="flex-grow mr-2 text-sm p-2 truncate"
              style={{ minWidth: "300px" }}
            />
            <Button
              variant="outline"
              onClick={handleCopy}
              className="min-w-[80px]"
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
