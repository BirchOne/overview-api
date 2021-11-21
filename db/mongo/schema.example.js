const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  _id: Number,
  campus: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  created_at: String,
  updated_at: String,
});


const FeatureSchema = mongoose.Schema({
  _id: Number,
  feature: String,
  value: String,
  product: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});


const StyleSchema = mongoose.Schema({
  _id: Number,
  name: String,
  original_price: Number,
  sale_price: Number,
  default: Boolean,
  product: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});


const PhotoSchema = mongoose.Schema({
  _id: Number,
  thumbnail_url: String,
  url: String,
  product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  style: [{ type: Schema.Types.ObjectId, ref: 'Style' }]
});


const SkuSchema = mongoose.Schema({
  _id: Number,
  quantity: Number,
  size: String,
  product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  style: [{ type: Schema.Types.ObjectId, ref: 'Style' }]
});


const RelatedSchema = mongoose.Schema({
  _id: Number,
  product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});


const Product = mongoose.model('Product', ProductSchema);
const Feature = mongoose.model('Feature', FeatureSchema);
const Style = mongoose.model('Style', StyleSchema);
const Photo = mongoose.model('Photo', PhotoSchema);
const Sku = mongoose.model('Sku', SkuSchema);
const Related = mongoose.model('Related', RelatedSchema);
