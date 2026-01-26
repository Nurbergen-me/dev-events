import mongoose from 'mongoose';

// Define the structure for the cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global object to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

// Validate that the MongoDB URI is configured
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local '
  );
}

// Initialize the cache object
// In development, use a global variable to preserve the connection across hot reloads
// In production, the cache is scoped to this module
let cached: MongooseCache = global.mongoose ?? {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose
 * Caches the connection to prevent creating multiple connections during development hot reloads
 * @returns Promise resolving to the Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Return existing connection promise if one is in progress
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Disable mongoose buffering
    };

    // Create new connection promise
    cached.promise = mongoose.connect(MONGODB_URI!, options).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Wait for connection to complete and cache it
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise on error so next call attempts reconnection
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
