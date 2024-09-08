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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CoffeeIcon, CakeIcon, MapPinIcon } from "lucide-react";
import { Coffee } from "@/app/models/Coffee";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function CafeCard(props: Coffee) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [cafeData, setCafeData] = useState(props);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCafeData({ ...cafeData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Here you would typically send the updated data to your backend
    try {
      const formData = new FormData();
      formData.append("id", cafeData.id.toString());
      formData.append("shop_name", cafeData.shop_name);
      formData.append("created_at", cafeData.created_at);
      formData.append("coffee_rating", cafeData.coffee_rating.toString());
      formData.append("dessert_rating", cafeData.dessert_rating.toString());
      formData.append("location", cafeData.location!);

      const res = await fetch(`/api/review?id=${cafeData.id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to update cafe entry");
      }
      console.log("Cafe entry updated successfully");
      toast({
        title: "Cafe entry updated",
        description: "Your changes have been saved successfully",
        variant: "default",
      });
      router.refresh();
      setIsSaveDialogOpen(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating cafe entry:", error);
      toast({
        title: "Error",
        description: "Failed to update cafe entry",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    // Here you would typically send a delete request to your backend
    try {
      console.log("Deleting:", cafeData);
      const res = await fetch(`/api/review?id=${cafeData.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete cafe entry");
      }
      console.log("Cafe entry deleted successfully");
      toast({
        title: "Cafe entry deleted",
        description: "The cafe entry has been deleted successfully",
        variant: "default",
      });
      router.refresh();
      setIsDeleteDialogOpen(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting cafe entry:", error);
      toast({
        title: "Error",
        description: "Failed to delete cafe entry",
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
    }
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
                  name="shop_name"
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
                  name="created_at"
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
                  name="coffee_rating"
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
                  name="dessert_rating"
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
            <DialogFooter className="gap-2">
              <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the cafe entry.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog
                open={isSaveDialogOpen}
                onOpenChange={setIsSaveDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button>Save changes</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to save these changes?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSave}>
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
