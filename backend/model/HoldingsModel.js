const mongoose = require('mongoose');

const HoldingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Stock name/symbol is required'],
    uppercase: true,
    trim: true
  },
  qty: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  avg: {
    type: Number,
    required: [true, 'Average price is required'],
    min: [0, 'Price cannot be negative']
  },
  price: {
    type: Number,
    required: [true, 'Current price is required'],
    min: [0, 'Price cannot be negative'],
    default: 0
  },
  net: {
    type: String,
    default: "0.00%"
  },
  day: {
    type: String,
    default: "0.00%"
  },
  isLoss: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  company: {
    type: String,
    trim: true
  },
  sector: {
    type: String,
    trim: true
  },
  exchange: {
    type: String,
    trim: true,
    default: 'NSE'
  }
}, {
  timestamps: true
});

// Virtual for invested value
HoldingsSchema.virtual('investedValue').get(function() {
  return this.qty * this.avg;
});

// Virtual for current value
HoldingsSchema.virtual('currentValue').get(function() {
  return this.qty * this.price;
});

// Indexes
HoldingsSchema.index({ name: 1 });
HoldingsSchema.index({ userId: 1 });
HoldingsSchema.index({ createdAt: -1 });

// Update holding with new purchase
HoldingsSchema.methods.updateHolding = function(additionalQty, purchasePrice) {
  const totalQty = this.qty + additionalQty;
  const totalValue = (this.qty * this.avg) + (additionalQty * purchasePrice);
  
  this.avg = totalValue / totalQty;
  this.qty = totalQty;
  
  return this.save();
};

// Static method to find or create
HoldingsSchema.statics.findOrCreate = async function(name, qty, price, userId = null) {
  let holding = await this.findOne({ name, userId });
  
  if (holding) {
    const totalQty = holding.qty + qty;
    const totalValue = (holding.qty * holding.avg) + (qty * price);
    holding.avg = totalValue / totalQty;
    holding.qty = totalQty;
    await holding.save();
  } else {
    holding = await this.create({
      name,
      qty,
      avg: price,
      price: price,
      userId
    });
  }
  
  return holding;
};

// Reduce holding (selling)
HoldingsSchema.statics.reduceHolding = async function(name, qty, userId = null) {
  const holding = await this.findOne({ name, userId });
  
  if (!holding) {
    throw new Error('Holding not found');
  }
  
  if (holding.qty < qty) {
    throw new Error('Insufficient quantity to sell');
  }
  
  holding.qty -= qty;
  
  if (holding.qty === 0) {
    await holding.deleteOne();
    return null;
  }
  
  await holding.save();
  return holding;
};

const HoldingsModel = mongoose.model('Holdings', HoldingsSchema);

module.exports = { HoldingsModel };