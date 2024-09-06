"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coffee, CakeSlice, MapPin, Upload } from "lucide-react";
import { CoffeeSpotForm } from "./coffee-spot-form";

export function UploadReview() {
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleUpload = (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true);
    // Simulating upload process
    setTimeout(() => {
      setIsUploading(false);
      setShowForm(false);
      // Here you would typically handle the actual upload logic
    }, 2000);
  };

  return (
    <>
      {!showForm ? (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full md:max-w-sm bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Upload className="mr-2 h-4 w-4" /> Add New Review
        </Button>
      ) : (
        <CoffeeSpotForm />
      )}
    </>
  );
}
