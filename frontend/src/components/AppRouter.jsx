import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { privateRoutes } from "../router";

const AppRouter = () => {
  return (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} element={<route.element />} path={route.path} />
      ))}
      <Route path="*" element={<Navigate to="/main" replace={true} />} />
    </Routes>
  );
};

export default AppRouter;
