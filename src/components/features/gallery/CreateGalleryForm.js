// Author: Lakshay Bansal (A00467478)
// Purpose: To display the Contact section of the Woodland Conservation website.

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import FormError from "../../UI/FormError";
import Speaker from "../../UI/Speaker";
import { IoSend } from "react-icons/io5";
import { useFormStatus } from "react-dom";
import useCreateGallery from "./useCreateGallery";

const CreateGalleryForm = () => {
  let { register, handleSubmit, formState, control, reset } = useForm();
  let { errors, isSubmitting } = formState;
  let { isInserting, mutate } = useCreateGallery();

  function onSubmit(data) {
    const { photographer, imageUrl, imageDescription } = data;
    const file = imageUrl;
    const updatedGallery = {
      photographer,
      imageUrl: file.name,
      imageDescription,
    };
    console.log("--------------updatedGallery------------\n", updatedGallery);
    console.log("--------------File------------\n", file);
    mutate(
      { gallery: updatedGallery, file },
      {
        onSuccess: () => {
          reset(); // <-- resets all form fields
        },
      }
    );
  }
  function onError(error) {
    console.log(error);
  }
  return (
    <div className="mt-4 bg-white dark:bg-darkerBlue rounded-lg shadow-lg p-6 md:p-10 max-w-4xl w-full">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="grid grid-cols-1 gap-8 max-w-4xl">
          {/* Name Input */}
          <div>
            <label htmlFor="photographer" className="form-label">
              Full Name
              <Speaker content="please enter Full Name"></Speaker>
            </label>
            <TextField
              id="photographer"
              label="Full Name"
              className="form-input"
              variant="outlined"
              {...register("photographer", {
                required: "Name field is mandatory",
              })}
            />

            {/** Displaying error message if any occured in name field */}
            {errors?.photographer?.message && (
              <FormError>{errors.photographer.message}</FormError>
            )}
          </div>

          {/* Image Description Input */}
          <div>
            <label htmlFor="imageDescription" className="form-label">
              Want to say something about image?
              <Speaker content="please describe image in one sentence if you prefer."></Speaker>
            </label>
            <TextField
              id="imageDescription"
              label="Image description"
              className="form-input"
              variant="outlined"
              {...register("imageDescription", {
                maxLength: {
                  value: 80,
                  message: "Description cannot exceed 40 characters",
                },
              })}
            />
            {/** Displaying error message if any occured in name field */}
            {errors?.imageDescription?.message && (
              <FormError>{errors.imageDescription.message}</FormError>
            )}
          </div>

          {/* Message Input */}
          <div className="mb-6">
            <label htmlFor="imageUrl" className="form-label">
              Upload the image
              <Speaker content="please upload image. This field is mandatory"></Speaker>
            </label>

            <div>
              <Controller
                name="imageUrl"
                control={control}
                defaultValue={null}
                rules={{ required: "Please upload an image" }}
                render={({ field }) => (
                  <input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files[0])}
                  />
                )}
              />
            </div>
            {/** Displaying error message if any occured in name field */}
            {errors?.imageUrl?.message && (
              <FormError>{errors.imageUrl.message}</FormError>
            )}
          </div>
        </div>
        <div className="text-right">
          <Button
            disabled={isInserting}
            variant="outlined"
            color="primary"
            type="submit"
            sx={{
              "&.Mui-disabled": {
                backgroundColor: "rgb(203 213 225)", // slate-300
                color: "rgb(248 250 252)", // slate-50
                cursor: "not-allowed",
              },
            }}
          >
            {isInserting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateGalleryForm;
