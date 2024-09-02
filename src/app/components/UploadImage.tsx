"use client";
import { CldUploadButton } from "next-cloudinary";

export const UploadImage = () => (
  <CldUploadButton uploadPreset="<Upload Preset>" />
);
