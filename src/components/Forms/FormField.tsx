import { TextField } from "@mui/material";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  label?: string;
};

export const FormField = <T extends FieldValues>({
  control,
  name,
  type = "text",
  placeholder,
  label
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          type={type}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          size="small"
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
