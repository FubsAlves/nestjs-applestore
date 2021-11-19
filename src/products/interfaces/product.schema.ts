/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

const ColorsSchema = new mongoose.Schema({
    color: {type: String, required: true, lowercase: true},
    colorUrl: {type: String}
})

export const ProductSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    photoUrl: {type: String},
    sellingPrice: {type: mongoose.Types.Decimal128, required: true},
    colors: [{type: ColorsSchema, required: true}],
}, {timestamps: true, collection:'products' });
