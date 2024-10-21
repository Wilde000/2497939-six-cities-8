import {FileReader} from '../../interfaces/file-reader.interface.js';
import {Offer} from '../../types/offer.js';
import { readFileSync } from 'fs';
import {City} from '../../types/city.js';
import {House} from '../../types/housetype.js';
import { User } from '../../types/author.js';
import { Facility } from '../../types/facilities.js';
import { Coordinates } from '../../types/coordinates.js';
import { UserType } from '../../types/user-type.js';

export class TsvFileReader implements FileReader {
    private rawData = '';

    constructor(private readonly filename: string) {}

    private validateRawData():void {
        if (!this.rawData) {
            throw new Error('Файл не был прочитан');
        }
    }
    private parseRawDataToOffers(): Offer[] {
        return this.rawData
            .split('\n')
            .filter((row) => row.trim().length > 0)
            .map((line) => this.parseLineToOffer(line));
    }

    private parseLineToOffer(line: string): Offer {
        const [
            title,
            description,
            publishDate,
            city,
            previewImage,
            photos,
            isPremium,
            isFavorite,
            rating,
            houseType,
            rooms,
            guests,
            price,
            facilities,
            author,
            commentsCount,
            coordinates
        ] = line.split('\t');

        return {
            title,
            description,
            publishDate: new Date(publishDate),
            city: city as City, 
            previewImage,
            photos: this.parsePhotos(photos),
            isPremium: Boolean(isPremium),
            isFavorite: Boolean(isFavorite),
            rating: Number(rating),
            houseType: houseType as House,
            rooms: Number(rooms),
            guests: Number(guests),
            price: Number(price),
            facilities: this.parseFacilities(facilities),
            author: this.parseAuthor(author),
            commentsCount: Number(commentsCount),
            coordinates: this.parseCoordinates(coordinates),
        };
    }

    private parsePhotos(photos: string): string[] {
        return photos.split(',');
    }

    private parseFacilities(facilities: string): Facility[] {
        return facilities.split(', ').map((name) => (name as Facility));
    }

    private parseAuthor(author: string): User {
        const [username, email, avatarUrl, password, type] = author.split(';');
        return {username, email, avatarUrl: avatarUrl || undefined, password, type: type as UserType}; 
    }

    private parseCoordinates(coordinates: string): Coordinates {
        const [latitude, longitude] = coordinates.split(',').map(Number);
        return {latitude, longitude};
    }

    public read(): void {
        this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
    }

    public toArray(): Offer[] {
        this.validateRawData();
        return this.parseRawDataToOffers();
    }
}