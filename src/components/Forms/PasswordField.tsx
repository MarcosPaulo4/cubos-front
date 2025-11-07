import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";

type PasswordFieldProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
};


export const PasswordField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder
}: PasswordFieldProps<T>) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          size="small"
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
};
