"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CoffeeIcon, CakeIcon, UploadIcon } from "lucide-react";

export function CoffeeSpotForm() {
  const [coffeeName, setCoffeeName] = useState("");
  const [coffeeRating, setCoffeeRating] = useState(0);
  const [dessertRating, setDessertRating] = useState(0);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend or state management
    console.log({ coffeeName, coffeeRating, dessertRating, location, image });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          New Coffee Spot Review
        </CardTitle>
      </CardHeader>
      <CardContent>
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
          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
