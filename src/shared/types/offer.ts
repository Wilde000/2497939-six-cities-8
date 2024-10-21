import { City } from "./city.js";
import { HouseType } from "./housetype.js";
import { Facility } from "./facilities.js";
import { User } from "./author.js";
import { Coordinates } from "./coordinates.js";

export type Offer = {
    title: string;
    description: string;
    publishDate: Date;
    city: City;
    previewImage: string;
    photos: string[];
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    houseType: HouseType;
    rooms: number;
    guests: number;
    price: number;
    facilities: Facility;
    author: User;
    comments: number;
    coordinates: Coordinates;
}