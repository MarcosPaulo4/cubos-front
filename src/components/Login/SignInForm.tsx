import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AuthAPI } from "../../api/auth";
import { FormField } from "../Forms/FormField";
import { PasswordField } from "../Forms/PasswordField";
import { schema, type ScheduleFormData } from "./signIn.schema";

export const SignInForm = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const fields: {
    name: keyof ScheduleFormData;
    type?: string;
    label?: string
    placeholder?: string
  }[] = [
    { placeholder: "Digite seu nome/email", label: "Nome/E-mail", name: "identifier", type: "text" },
    { placeholder: "Digite sua senha", label: "Senha", name: "password" },
  ] as const;

  const methods = useForm<ScheduleFormData>({
    resolver: zodResolver(schema()),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const handleSubmit = async (data: ScheduleFormData) => {
    setIsLoading(true);
    try {
      await AuthAPI.login(data.identifier, data.password);
      window.location.href = "/";
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível concluir o login. Tente novamente."
      methods.setError("identifier", {
        type: "manual",
        message,
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(handleSubmit)}
        display="flex"
        flexDirection="column"
        gap="16px"
      >
        {fields.map((field) => (
          <Box
            key={field.name}
            display="flex"
            flexDirection="column"
            width="360px"
            height="67px"
            borderRadius="4px"
          >
            <Box pb={1}>
              <Typography fontWeight="bold" fontSize="12.8px">
                {field.label}
              </Typography>
            </Box>
            {field.name === "password" ? (
              <PasswordField<ScheduleFormData>
                placeholder={field.placeholder}
                name={field.name}
                control={methods.control}
              />
            ) : (
              <FormField<ScheduleFormData>
                placeholder={field.placeholder}
                control={methods.control}
                name={field.name}
                type={field.type}
              />
            )}
          </Box>
        ))}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            color={theme.palette.secondary.main}
            fontWeight={400}
            fontSize="16px"
            sx={{ textDecoration: "underline" }}
          >
            Esqueci minha senha
          </Typography>

          <Button sx={{ width: "83px" }} variant="contained" type="submit">
            {isLoading ? "..." : "Entrar"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};
