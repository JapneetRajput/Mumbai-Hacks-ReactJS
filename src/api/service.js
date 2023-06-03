import Axios from "axios";

// Base url
const apiUrl = process.env.REACT_APP_API_BASE_URL;
let token = localStorage.getItem("token");
const config = {
  headers: {
    authorization: token,
  },
};

// API call to create an account
export const registerUser = async (user) => {
  try {
    // Return the response
    return await Axios.post(apiUrl + "/api/users/register", user, config);
  } catch (error) {
    throw new Error("Server Error");
  }
};

// API call to login
export const loginUser = async (user) => {
  try {
    // Return the response
    return await Axios.post(apiUrl + "/api/users/login", user, config);
  } catch (error) {
    throw new Error("Server Error");
  }
};

// API call for profile
export const profileUser = async (token) => {
  try {
    // Return the response
    return await Axios.get(apiUrl + "/api/users/profile", {
      headers: {
        authorization: token,
      },
    });
  } catch (error) {
    throw new Error("Server Error");
  }
};

// API call for getting Blogs
export const getBlogs = async () => {
  try{
    // Return the response
    return await Axios.get(apiUrl + "/api/blogs", config);
  } catch(error) {
    throw new Error(error);
  }
};

// API call for getting specific Blog
export const getBlog = async (_id) => {
  try{
    // Return the response
    return await Axios.get(apiUrl + "/api/blogs/"+_id, config);
  } catch(error) {
    throw new Error(error);
  }
};

// API call for adding new Blog
export const addBlog = async (blog) => {
  try{
    console.log(blog);
    return await Axios.post(apiUrl + "/api/blogs/add", blog, config);
  } catch(error) {
    throw new Error(error);
  }
}

// API call for updating new Blog
export const updateBlog = async (blog, blog_id) => {
  try{
    return await Axios.put(apiUrl + "/api/blogs/" + blog_id, blog, config);
    // nothing
  } catch(error) {
    throw new Error(error);
  }
}

// API call for updating new Blog
export const deleteBlog = async (blog_id) => {
  try{
    return await Axios.delete(apiUrl + "/api/blogs/" + blog_id, config);
    // nothing
  } catch(error) {
    throw new Error(error);
  }
}