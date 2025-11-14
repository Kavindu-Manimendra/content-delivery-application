import React from "react";
import { BrowserRouter } from "react-router-dom";
import {QueryClientProvider } from "@tanstack/react-query";
import {reactQueryClient} from "./api/reactQueryClient.ts";
import { Box } from "@mui/material";
import AppRoutes from "./routes/AppRoutes";

const queryClient = reactQueryClient;

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Box
                sx={{
                    backgroundColor: '#ffffff',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </Box>
        </QueryClientProvider>
    );
};

export default App;
