import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoute.tsx";
import FileUploadPage from "../pages/FileUploadPage.tsx";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
            <Route
                path="/files"
                element={
                    <ProtectedRoute>
                        <FileUploadPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
