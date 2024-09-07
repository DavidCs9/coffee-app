"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CoffeeIcon, CakeIcon, MapPinIcon } from "lucide-react";
import { Coffee } from "@/app/models/Coffee";
import Image from "next/image";

export function CafeCard(props: Coffee) {
  const [isOpen, setIsOpen] = useState(false);
  const [cafeData, setCafeData] = useState(props);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCafeData({ ...cafeData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saving:", cafeData);
    setIsOpen(false);
  };

  const handleDelete = () => {
    // Here you would typically send a delete request to your backend
    console.log("Deleting:", cafeData);
    setIsOpen(false);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{cafeData.shop_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={cafeData.picture_url!}
          alt={cafeData.shop_name}
          className="w-full h-[200px] object-cover rounded-md mb-4"
          width={350}
          height={200}
        />
        <p className="text-sm text-gray-500 mb-2">{cafeData.created_at}</p>
        <div className="flex items-center mb-2">
          <CoffeeIcon className="mr-2 h-4 w-4" />
          <span>Coffee Rating: {cafeData.coffee_rating}</span>
        </div>
        <div className="flex items-center mb-2">
          <CakeIcon className="mr-2 h-4 w-4" />
          <span>Dessert Rating: {cafeData.dessert_rating}</span>
        </div>
        <div className="flex items-center">
          <MapPinIcon className="mr-2 h-4 w-4" />
          <span>{cafeData.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Cafe Information</DialogTitle>
              <DialogDescription>
                Make changes to the cafe information here. Click save when you
                are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={cafeData.shop_name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  value={cafeData.created_at}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="coffeeRating" className="text-right">
                  Coffee Rating
                </Label>
                <Input
                  id="coffeeRating"
                  name="coffeeRating"
                  type="number"
                  value={cafeData.coffee_rating}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dessertRating" className="text-right">
                  Dessert Rating
                </Label>
                <Input
                  id="dessertRating"
                  name="dessertRating"
                  type="number"
                  value={cafeData.dessert_rating}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={cafeData.location}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
              <Button onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
