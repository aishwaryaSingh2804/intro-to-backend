import connectDB from "../../config/database.js";

// CREATE POST
export const createPost = async (postData) => {
  try {
    const connection = await connectDB();

    const { name, description, age } = postData;

    const query = `
      INSERT INTO posts (name, description, age)
      VALUES (?, ?, ?)
    `;

    const [result] = await connection.execute(query, [
      name,
      description,
      age
    ]);

    return result;

  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async () => {
    try {
        const connection = await connectDB();

  const [rows] = await connection.execute("SELECT * FROM posts");

  return rows;
    } catch (error) {
        throw error;
    }
  
};

export const getPostById = async (id) => {
    try{
        const connection = await connectDB();

  const [rows] = await connection.execute(
    "SELECT * FROM posts WHERE id = ?",
    [id]
  );

  return rows[0];
    } catch(error){
        throw error
    }
  
};

export const updatePost = async (id, data) => {
    try {
        const connection = await connectDB();

  const { name, description, age } = data;

  const query = `
    UPDATE posts
    SET name = ?, description = ?, age = ?
    WHERE id = ?
  `;

  const [result] = await connection.execute(query, [
    name,
    description,
    age,
    id
  ]);

  return result;
    } catch (error) {
        throw error
    }
  
};

export const patchPost = async (id, data) => {
    try {
         const connection = await connectDB();

  let query = "UPDATE posts SET ";
  let values = [];

  if (data.name) {
    query += "name = ?, ";
    values.push(data.name);
  }

  if (data.description) {
    query += "description = ?, ";
    values.push(data.description);
  }

  if (data.age) {
    query += "age = ?, ";
    values.push(data.age);
  }

  query = query.slice(0, -2); // remove last comma
  query += " WHERE id = ?";
  values.push(id);

  const [result] = await connection.execute(query, values);

  return result;
    } catch (error) {
        throw error
    }
 
};

export const deletePost = async (id) => {
    try{
const connection = await connectDB();

  const [result] = await connection.execute(
    "DELETE FROM posts WHERE id = ?",
    [id]
  );

  return result;
    } catch(error){
        throw error
    }
  
};