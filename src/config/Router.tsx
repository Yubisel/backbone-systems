import React from "react";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import(/*webpackChunkName: 'Home' */ "../pages/Home"));
const Contacts = React.lazy(() => import(/*webpackChunkName: 'Contacts' */ "../pages/contacts/Contacts"));

export function RouteConfig() {
  return (
    <Routes>
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};