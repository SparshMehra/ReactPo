import { supabaseUrl, supabase } from "../../supabase";
async function getGallery() {
  let { data: gallery, error } = await supabase.from("gallery").select("*");
  console.log(gallery); // shows array of rows
  if (error) console.error(error); // always good to log errors
  return gallery;
}

async function createGallery(newGallery, File) {
  // Extract just the original file name
  const originalName = sanitizeFileName(newGallery.imageUrl);

  // Create unique file name
  const fileName = `${Date.now()}-${originalName}`;
  const newUrl = `${supabaseUrl}/storage/v1/object/public/gallerImages/${fileName}`;
  const updatedGalleryRecord = { ...newGallery, imageUrl: newUrl };
  console.log("---------updatedGalleryRecord------\n", updatedGalleryRecord);

  const { data: insertedData, error } = await supabase
    .from("gallery")
    .insert([updatedGalleryRecord])
    .select();

  console.log("---------insertedData------\n", insertedData);

  if (error) {
    console.log(error);
    throw new Error("Error occured while inserting data in database");
  }
  //upload the image in bucket. if error 1. delete the uploaded data from gallery table, and throw the error.
  const { data: bucketData, error: bucketError } = await supabase.storage
    .from("gallerImages")
    .upload(fileName, File, { upsert: true });

  console.log("---------storage Bucket------\n", bucketData);
  if (bucketError) {
    console.error("Supabase Storage Upload Error:", bucketError);
    await supabase.from("gallery").delete().eq("id", insertedData[0].id);
    throw new Error(bucketError.message || "File upload failed");
  }

  return insertedData;
}

function sanitizeFileName(fileName) {
  return fileName
    .replace(/\s+/g, "-") // replace all spaces with '-'
    .replace(/\//g, "-") // replace all slashes with '-'
    .replace(/\(/g, "-") // replace '('
    .replace(/\)/g, "-") // replace ')'
    .replace(/[^a-zA-Z0-9\-_.]/g, ""); // remove other special chars
}
export { getGallery, createGallery };

//https://flnvwhzhgfouhdxyajml.supabase.co/storage/v1/object/public/gallerImages/cabin01.png
//
console.log(supabaseUrl);
