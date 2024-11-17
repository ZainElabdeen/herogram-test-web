import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

type InputFieldType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: PathValue<T, Path<T>>;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
};

const InputField = <T extends FieldValues>({
  name,
  defaultValue,
  control,
  label,
  placeholder,
  disabled,
  type = "text",
}: InputFieldType<T>) => {
  return (
    <div className="w-full space-y-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as PathValue<T, Path<T>>}
        render={({ field: { onChange, value } }) => (
          <Input
            id={name}
            placeholder={placeholder}
            type={type}
            value={value || ""}
            onChange={onChange}
            disabled={disabled}
            className="mt-2 placeholder:lowercase placeholder:text-sm"
          />
        )}
      />
    </div>
  );
};

export default InputField;
