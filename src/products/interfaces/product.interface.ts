import { Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  photoUrl: string;
  sellingPrice: number;
  colors: Array<Color>;
}

interface Color {
  color: string;
  colorUrl: string;
}
