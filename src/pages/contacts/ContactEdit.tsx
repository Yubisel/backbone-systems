import React from 'react';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import APP_CONFIG from "../../config/AppConfig";
import useFetch from '../../hooks/useFetch';
import ContactForm from "./ContactForm";


type ResultsType = {
  _id: string,
  firstName: string,
  email: string,
  phone: number,
  lastName: string,
  createdAt: string,
  updatedAt: string,
}

export default function ContactDetails() {
  let params = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { isLoading: isLoadingFetching, isError: isErrorFetching, data } = useFetch<ResultsType>(`${APP_CONFIG.API_URL}/contacts/${params.id}`);

  React.useEffect(() => {
    if (data) {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone
      });
    }
  }, [data, reset]);

  React.useEffect(() => {
    if (!isLoadingFetching) {
      setIsLoading(false);
    }
  }, [isLoadingFetching]);

  const handleOnSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/contacts/${params.id}`, {
        method: "PUT",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.status === 200) {
        setIsError(false);
        setIsSuccess(true);
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone
        });
        setSuccessMessage("The contact was saved.");
      } else {
        setIsError(true);
        setIsSuccess(false);
        setErrorMessage(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsSuccess(false);
      setIsError(true);
      setIsLoading(false);
      setErrorMessage("There was an error");
    }
  }

  return <ContactForm
    headerText={"Edit contact"}
    handleOnSubmit={handleOnSubmit}
    handleSubmit={handleSubmit}
    register={register}
    errors={errors}
    isError={isError || isErrorFetching}
    isSuccess={isSuccess}
    successMessage={successMessage}
    isLoading={isLoading || isLoadingFetching}
    errorMessage={errorMessage}
  />;
}
