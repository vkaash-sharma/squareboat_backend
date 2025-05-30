const Users = require("../models/Users.models");

exports.signUpFn = async (req, res) => {
  try {
    const { email, password, userType, firstName, lastName } = req.body;

    // Validate input
    if (!email || !password || !userType) {
      return res
        .status(400)
        .json({ message: "Email, password, and user type are required." });
    }

    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Create new user
    const newUser = new Users({
      email,
      passwordHash: password, // In a real application, hash the password
      userType,
      firstName,
      lastName,
    });

    await newUser.save();
  return   res
      .status(201)
      .json({ message: "User created successfully.", userId: newUser._id });
  } catch (error) {
    console.error("Error during sign up:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



exports.loginFn = async (req, res) => {
try{
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);
    console.log("Login attempt with password:", password);
    // Check if email and password are provided 
    return;
    
    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }
    
    // Find user by email
    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    
    // Check password (in a real application, compare hashed passwords)
    if (user.passwordHash !== password) {
        return res.status(401).json({ message: "Invalid password." });
    }
    
    // Return user details (excluding password)
    const { _id, userType, firstName, lastName } = user;
    res.status(200).json({
        message: "Login successful.",
        user: { 
            _id, userType, firstName, lastName },
    });
}catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

exports.getUserProfileFn = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Find user by ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return user profile (excluding password)
    const { _id, email, userType, firstName, lastName, createdAt } = user;
    res.status(200).json({
      _id,
      email,
      userType,
      firstName,
      lastName,
      createdAt,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}; 

exports.updateUserProfileFn = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { firstName, lastName } = req.body;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Find user by ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user profile
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    
    user.updatedAt = Date.now(); // Update timestamp

    await user.save();

    res.status(200).json({ message: "User profile updated successfully." });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
