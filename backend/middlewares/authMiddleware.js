import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Protect middleware (checks JWT)
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token and decode user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user (exclude password)
      req.user = await User.findById(decoded.id).select("-passwordHash");

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next(); // Move to next middleware/route
    } catch (err) {
      console.error("Token verification failed:", err.message);
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Admin-only middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};
