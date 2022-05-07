import { useState } from 'react';
import { useForm } from "react-hook-form";
import APP_CONFIG from "../../config/AppConfig";
import ContactForm from "./ContactForm";

export default function ContactCreate() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleOnSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${APP_CONFIG.API_URL}/contacts`, {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.status === 200) {
        setIsError(false);
        setIsSuccess(true);
        reset();
        setSuccessMessage("The contact was created.");
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
    headerText={"Create contact"}
    handleOnSubmit={handleOnSubmit}
    handleSubmit={handleSubmit}
    register={register}
    errors={errors}
    isError={isError}
    successMessage={successMessage}
    isSuccess={isSuccess}
    isLoading={isLoading}
    errorMessage={errorMessage}
  />
}
