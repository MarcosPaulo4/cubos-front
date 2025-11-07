import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { UserAPI } from "../../api/user"
import { FormField } from "../Forms/FormField"
import { PasswordField } from "../Forms/PasswordField"
import { registerSchema, type RegisterScheduleFormData } from "./register.schema"

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);


  const fields: {
    name: keyof RegisterScheduleFormData;
    type?: string;
    label?: string
    placeholder?: string
  }[] = [
      { placeholder: "Digite seu nome", label: "Nome", name: "name", type: "text" },
      { placeholder: "Digite seu email", label: "E-mail", name: "email", type: "email" },
      { placeholder: "Digite sua senha", label: "Senha", name: "password" },
      { placeholder: "Digite sua senha novamente", label: "Confirmação de Senha", name: "confirmPassword" },
    ];


  const methods = useForm<RegisterScheduleFormData>({
    resolver: zodResolver(registerSchema()),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    }
  })

  const handleSubmit = async (data: RegisterScheduleFormData) => {
    const { name, email, password } = data

    setIsLoading(true)
    try {
      await UserAPI.create(name, email, password)
      window.location.href = "/login"
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível concluir o cadastro. Tente novamente."
      methods.setError("email", {
        type: "manual",
        message,
      })
    } finally {
      setIsLoading(false)
    }
  }

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
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            justifyItems="center"
            width="380px"
            height="67px"
            borderRadius="4px" >
            <Box pb={1}>
              <Typography fontWeight="bold" fontSize="12.8px">{field.label}</Typography>
            </Box>
            <Box key={field.label}>
              {field.name === "password" || field.name === "confirmPassword" ? (
                <PasswordField<RegisterScheduleFormData>
                  placeholder={field.placeholder}
                  name={field.name}
                  control={methods.control}
                />
              ) : (
                <FormField<RegisterScheduleFormData>
                  placeholder={field.placeholder}
                  control={methods.control}
                  name={field.name}
                  type={field.type}
                />
              )}
            </Box>
          </Box>

        ))}
        <Box display="flex" justifyContent="end" alignItems="center" justifyItems="center" >
          <Button
            sx={{ widht: "83px" }}
            variant="contained"
            type="submit"
          >
            {isLoading ? "..." : "Cadastrar"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  )
}