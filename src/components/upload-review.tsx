"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { CoffeeSpotForm } from "./coffee-spot-form";

export function UploadReview() {
  const [showForm, setShowForm] = useState(false);

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
