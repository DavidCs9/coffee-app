"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CoffeeIcon, CakeIcon, UploadIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function UploadReview() {
  const [open, setOpen] = useState(false);
  const [coffeeName, setCoffeeName] = useState("");
  const [coffeeRating, setCoffeeRating] = useState(0);
  const [dessertRating, setDessertRating] = useState(0);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setCoffeeName("");
    setCoffeeRating(0);
    setDessertRating(0);
    setLocation("");
    setImage(null);
    setImagePreview(null);
    setIsLoading(false);
  };

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
        console.log("Image URL:", imageUrl);
      }

      const formData = new FormData();
      formData.append("shop_name", coffeeName);
      formData.append("coffee_rating", coffeeRating.toString());
      formData.append("dessert_rating", dessertRating.toString());
      formData.append("location", location);
      formData.append("picture_url", imageUrl);

      const response = await fetch("/api/review", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Success");
        toast({
          title: "Success",
          description: "Review uploaded successfully!",
          variant: "default",
        });
        resetForm();
        setOpen(false);
        router.refresh();
      } else {
        console.error("Error");
        toast({
          title: "Error",
          description: "Failed to upload review",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to upload review",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:max-w-sm bg-primary text-primary-foreground hover:bg-primary/90">
          <UploadIcon className="mr-2 h-4 w-4" /> Add New Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image" className="flex items-center cursor-pointer">
              <UploadIcon className="mr-2" />
              Upload Image
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="coffeeName">Coffee Shop Name</Label>
            <Input
              id="coffeeName"
              value={coffeeName}
              onChange={(e) => setCoffeeName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coffeeRating" className="flex items-center">
              <CoffeeIcon className="mr-2" />
              Coffee Rating
            </Label>
            <Slider
              id="coffeeRating"
              min={0}
              max={5}
              step={1}
              value={[coffeeRating]}
              onValueChange={(value) => setCoffeeRating(value[0])}
            />
            <span className="text-sm text-gray-500">{coffeeRating} / 5</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dessertRating" className="flex items-center">
              <CakeIcon className="mr-2" />
              Dessert Rating
            </Label>
            <Slider
              id="dessertRating"
              min={0}
              max={5}
              step={1}
              value={[dessertRating]}
              onValueChange={(value) => setDessertRating(value[0])}
            />
            <span className="text-sm text-gray-500">{dessertRating} / 5</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
