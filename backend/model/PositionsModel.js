const mongoose = require('mongoose');

const PositionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Stock name/symbol is required'],
    uppercase: true,
    trim: true
  },
  qty: {
    type: Number,
    required: [true, 'Quantity is required'],
    validate: {
      validator: function(v) {
        return v !== 0;
      },
      message: 'Quantity cannot be zero'
    }
  },
  avg_price: {
    type: Number,
    required: [true, 'Average price is required'],
    min: [0, 'Average price cannot be negative']
  },
  price: {
    type: Number,
    required: [true, 'Current price is required'],
    min: [0, 'Price cannot be negative']
  },
  net: {
    type: Number,
    default: 0
  },
  day: {
    type: Number,
    default: 0
  },
  isLoss: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional: if you want to associate positions with users
  },
  product: {
    type: String,
    enum: ['CNC', 'MIS', 'NRML'], // CNC: Cash and Carry, MIS: Intraday, NRML: Normal
    default: 'CNC'
  },
  exchange: {
    type: String,
    trim: true,
    default: 'NSE'
  },
  entryTime: {
    type: Date,
    default: Date.now
  },
  exitTime: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['OPEN', 'CLOSED'],
    default: 'OPEN'
  }
}, {
  timestamps: true
});

// Virtual field for total value
PositionsSchema.virtual('totalValue').get(function() {
  return this.qty * this.price;
});

// Virtual field for invested amount
PositionsSchema.virtual('investedAmount').get(function() {
  return Math.abs(this.qty * this.avg_price);
});

// Virtual field for profit/loss
PositionsSchema.virtual('profitLoss').get(function() {
  return (this.price - this.avg_price) * this.qty;
});

// Virtual field for profit/loss percentage
PositionsSchema.virtual('profitLossPercent').get(function() {
  return ((this.price - this.avg_price) / this.avg_price) * 100;
});

// Indexes for better query performance
PositionsSchema.index({ name: 1 });
PositionsSchema.index({ userId: 1 });
PositionsSchema.index({ status: 1 });
PositionsSchema.index({ createdAt: -1 });
PositionsSchema.index({ userId: 1, status: 1 });

// Pre-save middleware to calculate net and isLoss
PositionsSchema.pre('save', function(next) {
  // Calculate net profit/loss
  this.net = (this.price - this.avg_price) * this.qty;
  
  // Determine if it's a loss
  this.isLoss = this.net < 0;
  
  next();
});

// Instance method to update position price
PositionsSchema.methods.updatePrice = function(newPrice) {
  this.price = newPrice;
  return this.save();
};

// Instance method to close position
PositionsSchema.methods.closePosition = function(exitPrice) {
  this.price = exitPrice;
  this.status = 'CLOSED';
  this.exitTime = new Date();
  return this.save();
};

// Static method to get all open positions
PositionsSchema.statics.getOpenPositions = function(userId = null) {
  const query = { status: 'OPEN' };
  if (userId) query.userId = userId;
  return this.find(query).sort({ createdAt: -1 });
};

// Static method to get closed positions
PositionsSchema.statics.getClosedPositions = function(userId = null, limit = 50) {
  const query = { status: 'CLOSED' };
  if (userId) query.userId = userId;
  return this.find(query).sort({ exitTime: -1 }).limit(limit);
};

// Static method to calculate total P&L for a user
PositionsSchema.statics.getTotalPnL = async function(userId = null) {
  const query = { status: 'OPEN' };
  if (userId) query.userId = userId;
  
  const positions = await this.find(query);
  
  return positions.reduce((total, position) => {
    return total + ((position.price - position.avg_price) * position.qty);
  }, 0);
};

// Static method to get positions by stock name
PositionsSchema.statics.getByStock = function(stockName, userId = null) {
  const query = { name: stockName.toUpperCase(), status: 'OPEN' };
  if (userId) query.userId = userId;
  return this.find(query);
};

const PositionsModel = mongoose.model('Positions', PositionsSchema);

module.exports = { PositionsModel };