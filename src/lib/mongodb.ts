import { MongoClient, Db, Collection } from 'mongodb';

// Define types for your data
export interface Post {
  _id?: string; // MongoDB assigns this automatically
  title: string;
  content: string;
  createdAt: Date;
}

// MongoDB connection URI
const uri = 'your-mongodb-connection-string'; // Use an environment variable for production
const client = new MongoClient(uri);

let db: Db;
let postsCollection: Collection<Post>;

/**
 * Initialize the MongoDB client and collections.
 */
async function connectToDatabase(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db('svelte_app'); // Replace with your database name
    postsCollection = db.collection<Post>('posts');
  }
  return db;
}

/**
 * Get all posts.
 */
export async function getPosts(): Promise<Post[]> {
  await connectToDatabase();
  const posts = await postsCollection.find().toArray();
  return posts.map((post) => ({
    ...post,
    _id: post._id?.toString(), // Convert ObjectId to string for the frontend
  }));
}

/**
 * Add a new post.
 */
export async function addPost(title: string, content: string): Promise<Post> {
  await connectToDatabase();
  const result = await postsCollection.insertOne({
    title,
    content,
    createdAt: new Date(),
  });
  return { _id: result.insertedId.toString(), title, content, createdAt: new Date() };
}
