import React from "react";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import(/*webpackChunkName: 'Home' */ "../pages/Home"));
const Contacts = React.lazy(() => import(/*webpackChunkName: 'Contacts' */ "../pages/contacts/Contacts"));
const ContactsDetails = React.lazy(() => import(/*webpackChunkName: 'Contacts' */ "../pages/contacts/ContactsDetails"));
const ContactsCreate = React.lazy(() => import(/*webpackChunkName: 'Contacts' */ "../pages/contacts/ContactsCreate"));
const ContactsEdit = React.lazy(() => import(/*webpackChunkName: 'Contacts' */ "../pages/contacts/ContactsEdit"));

export function RouteConfig() {
  return (
    <Routes>
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/contacts/details/:id" element={<ContactsDetails />} />
      <Route path="/contacts/create" element={<ContactsCreate />} />
      <Route path="/contacts/edit/:id" element={<ContactsEdit />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};