// Author: Lakshay Bansal (A00467478)
// Purpose: To display the Contact section of the Woodland Conservation website.

import React from "react";
import Speaker from "../UI/Speaker";
import { useForm } from "react-hook-form";
import FormError from "../UI/FormError";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
const Contact = () => {
  let { register, handleSubmit, formState } = useForm();
  let { errors } = formState;
  console.log(errors);

  function onSubmit() {}
  return (
    <div
      id="contact"
      className="body-text p-8 bg-gradient-to-br from-green-300 to-green-500 dark:from-green-800 dark:to-green-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center"
    >
      {/* Section Title */}
      <h1 className="secondary-heading mb-6 text-center">Get in Touch</h1>
      <p className=" text-center mb-8 max-w-2xl">
        Wanted to connect or say hello? We'd love to hear from you! Fill out the
        form below or connect with us through our social channels.
      </p>

      {/* Contact Form */}
      <div className="bg-white dark:bg-darkerBlue rounded-lg shadow-lg p-6 md:p-10 max-w-4xl w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="form-label">
                Name
                <Speaker content="please enter a name"></Speaker>
              </label>
              <TextField
                id="name"
                label="Your Name"
                className="form-input"
                variant="outlined"
                {...register("name", { required: "Name field is mandatory" })}
              />

              {/** Displaying error message if any occured in name field */}
              {errors?.name?.message && (
                <FormError>{errors.name.message}</FormError>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="form-label">
                Email
                <Speaker content="please enter an email"></Speaker>
              </label>
              <TextField
                id="email"
                label="Email"
                className="form-input"
                variant="outlined"
                {...register("email", {
                  required: "Email field is mandatory",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email is invalid",
                  },
                })}
              />
              {/** Displaying error message if any occured in name field */}
              {errors?.email?.message && (
                <FormError>{errors.email.message}</FormError>
              )}
            </div>
          </div>

          {/* Message Input */}
          <div className="mb-6">
            <label htmlFor="message" className="form-label">
              Message
              <Speaker content="please enter a message"></Speaker>
            </label>
            <TextField
              id="message"
              label="Your Message"
              className="form-input"
              variant="outlined"
              {...register("message", {
                required: "Message field is mandatory",
              })}
            />

            {/** Displaying error message if any occured in name field */}
            {errors?.message?.message && (
              <FormError>{errors.message.message}</FormError>
            )}
          </div>

          {/* Submit Button */}
          {/* <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white  py-3 px-6 rounded-md transition-all duration-300"
          >
            Send Message
          </button> */}
          <div className="text-right">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Contact;
