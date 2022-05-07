import React from "react";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import(/*webpackChunkName: 'Home' */ "../pages/Home"));
const Contacts = React.lazy(() => import(/*webpackChunkName: 'Contacts' */ "../pages/contacts/Contacts"));
const ContactDetails = React.lazy(() => import(/*webpackChunkName: 'Contacts' */ "../pages/contacts/ContactsDetails"));
const ContactCreate = React.lazy(() => import(/*webpackChunkName: 'Contacts' */ "../pages/contacts/ContactCreate"));
const ContactEdit = React.lazy(() => import(/*webpackChunkName: 'Contacts' */ "../pages/contacts/ContactEdit"));

export function RouteConfig() {
  return (
    <Routes>
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/contacts/details/:id" element={<ContactDetails />} />
      <Route path="/contacts/create" element={<ContactCreate />} />
      <Route path="/contacts/edit/:id" element={<ContactEdit />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};