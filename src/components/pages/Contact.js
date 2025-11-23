// Author: Lakshay Bansal (A00467478)
// Purpose: To display the Contact section of the Woodland Conservation website.

import React from "react";
import Speaker from "../UI/Speaker";
import { useForm } from "react-hook-form";
import FormError from "../UI/FormError";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Contact = () => {
  let { register, handleSubmit, formState } = useForm();
  let { errors } = formState;
  console.log(errors);

  function onSubmit() {}
  return (
    <div
      id="contact"
      className="body-text p-8 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center transition-colors duration-300"
    >
      {/* Section Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900 dark:text-white">Get in Touch</h1>
      <p className="text-lg text-center mb-8 max-w-2xl text-gray-700 dark:text-gray-300">
        Want to connect or say hello? We'd love to hear from you! Fill out the
        form below or connect with us through our social channels.
      </p>

      {/* Contact Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-10 max-w-4xl w-full transition-colors duration-300">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="form-label text-gray-900 dark:text-gray-100">
                Name
                <Speaker content="please enter a name"></Speaker>
              </label>
              <TextField
                id="name"
                label="Your Name"
                className="form-input"
                variant="outlined"
                fullWidth
                {...register("name", { required: "Name field is mandatory" })}
              />

              {/** Displaying error message if any occured in name field */}
              {errors?.name?.message && (
                <FormError>{errors.name.message}</FormError>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="form-label text-gray-900 dark:text-gray-100">
                Email
                <Speaker content="please enter an email"></Speaker>
              </label>
              <TextField
                id="email"
                label="Email"
                className="form-input"
                variant="outlined"
                fullWidth
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
            <label htmlFor="message" className="form-label text-gray-900 dark:text-gray-100">
              Message
              <Speaker content="please enter a message"></Speaker>
            </label>
            <TextField
              id="message"
              label="Your Message"
              className="form-input"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
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
          <div className="text-right">
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'rgb(22, 163, 74)',
                '&:hover': {
                  bgcolor: 'rgb(21, 128, 61)',
                },
                px: 4,
                py: 1.5,
              }}
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Contact;
