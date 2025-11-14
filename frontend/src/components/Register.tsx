import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { signup } from "../features/auth/auth-api";
import type { SignUpRequest } from "../types";

const Register: React.FC = () => {
    const [form, setForm] = useState<SignUpRequest>({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { enqueueSnackbar } = useSnackbar();

    const { mutate, isPending } = useMutation({
        mutationFn: (form: SignUpRequest) => signup(form),
        onSuccess: (response) => {
            enqueueSnackbar(response.message || "Registration Successful.", {
                variant: "success",
            });
            setForm({ email: "", password: "", confirmPassword: "" });
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message || "Registration Failed.";
            enqueueSnackbar(message, { variant: "error" });
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(form);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 8,
                }}
            >
                <Typography variant="h5" align="center" mb={2}>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        margin="normal"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, borderRadius: 2 }}
                        disabled={isPending}
                    >
                        {isPending ? "Registering..." : "Register"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;
