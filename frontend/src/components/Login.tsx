import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import type {SignInRequest} from "../types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSnackbar} from "notistack";
import {signin} from "../features/auth/auth-api.ts";
import {saveToken, saveUserId} from "../utils/storage.ts";
    import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const [form, setForm] = useState<SignInRequest>({ email: "", password: "" });
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: (form: SignInRequest) => signin(form),
        onSuccess: (response) => {
            if (response.data) {
                saveToken(response.data.token);
                saveUserId(response.data.userDto.id.toString());
                enqueueSnackbar(response.message || "Login Successful.", { variant: "success" });
                setForm({
                    email: "",
                    password: "",
                });
                // Refetch user data after successful login
                queryClient.invalidateQueries({ queryKey: ["auth"] });
                navigate("/files");
            } else {
                enqueueSnackbar(response.message || "Login Failed.", {variant: "error",});
            }
        },
        onError: (error: any) => {
            const message =
                error.response?.data?.message || "Login Failed. Please try again.";
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
                // minHeight: "100vh",
                backgroundColor: "#ffffff",
                p: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: "100%",
                    maxWidth: 300,
                    borderRadius: 8,
                }}
            >
                <Typography variant="h5" align="center" mb={2}>
                    Sign In
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, borderRadius: 2 }}
                        disabled={isPending}
                    >
                        {isPending ? "Signing in..." : "Login"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
