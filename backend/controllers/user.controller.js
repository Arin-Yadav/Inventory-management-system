import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function handleCreateUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: err.message });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    // console.log(email)
    // console.log(password)

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const userData = {
      name: user.name,
      email: user.email,
      role: user.role
    }

    res.status(200).json({
      token,
      user: userData,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function handleUserDetails(req, res) {
  try {
    const userData = req.user
    const userId = userData.id

    const user = await User.findById(userId).select("-password")
    if(!user) {
      return res.status(401).json({
        success: false,
        message: "You are unauthorized"
      })
    }
    
    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    console.log("Error: ", error)
  }
}

export { handleCreateUser, handleUserLogin, handleUserDetails };
