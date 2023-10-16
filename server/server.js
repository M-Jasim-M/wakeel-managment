const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// const session = require('express-session');
const User = require('./Schema'); // Adjust the path as needed
const  ItemModel = require('./model')
const app = express();
const port = 5000;

// Middleware to handle JSON data
app.use(express.json());
// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));

app.use(express.static("uploads"));

// Connect to MongoDB
mongoose.connect('mongodb+srv://jasimwazir098:khan!!!@cluster0.bbx0tzz.mongodb.net/wakeel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/', // Store uploaded images in the 'uploads' directory
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });




// Endpoint for file upload
// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Use port 587 for TLS (587 is the standard port for secure SMTP)
  secure: false,
  auth: {
    user: 'webdeveloper4888@gmail.com', // Change to your email address
    pass: 'ltiaryitzoskbjbj', // Change to your email password
  },
});


app.post('/signup', upload.single('profileImage'), async (req, res) => {
  try {
    const {userType, name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Email already exists, send an error response
      return res.status(400).json({ success: false, message: 'Email already exists.' });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    // const image = new Image({ img: file.filename });
    const image = file.filename;

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode();

    const user = new User({
        userType,
      name,
      email,
      password: hashedPassword,
      image,
      verificationCode,
      isVerified: false,
    });
    await user.save();

    await sendVerificationEmail(email, verificationCode);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});



// Generate a random 6-digit code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send the verification email
async function sendVerificationEmail(toEmail, code) {
  const mailOptions = {
    from: 'webdeveloper4888@gmail.com', // Change to your email address
    to: toEmail,
    subject: 'Verification Code',
    text: `Your verification code is: ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}

app.post('/verify', async (req, res) => {
  try {
    const { code } = req.body;
 console.log(req.body)
    // Find the user by the verification code in your database
    const user = await User.findOne({ verificationCode: code });

    if (!user) {
      // Invalid verification code
      return res.status(400).json({ success: false, message: 'Invalid verification code.' });
    }

    // Mark the user as verified
    user.isVerified = true;
    await user.save();

    res.json({ success: true, message: 'Email verification successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});


app.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email in your database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Generate a new 6-digit verification code
    const newVerificationCode = generateVerificationCode();

    // Update the user's verification code in the database
    user.verificationCode = newVerificationCode;
    user.isVerified = false; // Mark as not verified
    await user.save();

    // Send the new verification code to the user's email
    await sendVerificationEmail(email, newVerificationCode);

    res.json({ success: true, message: 'New verification code sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});


function generateResetToken() {
  const length = 32; // Adjust the length of the token as needed
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
}

// Endpoint for initiating password reset
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email in your database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Generate a unique reset token
    const resetToken = generateResetToken();

    // Save the reset token and its expiration time in the user's document
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send the reset email to the user with a link to the reset page
    const resetLink = `http://localhost:3000/reset?token=${resetToken}`;
    // await sendPasswordResetEmail(email,resetLink );
    await sendVerificationEmail(email, resetLink);
    res.json({ success: true, message: 'Password reset email sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

// ...
// Make sure to adjust the generateResetToken function according to your requirements, including the desired length and character set for the reset token.


app.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
console.log(req.body)
    // Find the user by the reset token in your database
    const user = await User.findOne({ resetToken: token, resetTokenExpires: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
    }

    // Update the user's password with the new password
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});


const store = new MongoDBStore({
  uri: 'mongodb+srv://jasimwazir098:khan!!!@cluster0.bbx0tzz.mongodb.net/wakeel',
  collection: 'sessions', // Name of the collection to store sessions
});

// Initialize the express-session middleware with the store
app.use(
  session({
    secret: 'your-secret-ke', // Replace with a secret key
    resave: false,
    saveUninitialized: false,
    store: store, // Use the MongoDBStore for session storage
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Session expires in 24 hours (adjust as needed)
    },
  })
);


app.post('/login', async (req, res) => {
    try {
      const { userType, email, password } = req.body;
  
      console.log(req.body);
      // Find the user by email in your database
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
  
      // Check if the user's email is verified
      if (!user.isVerified) {
        return res.status(401).json({ success: false, message: 'Email not verified. Please verify your email.' });
      }
  
      // Check if the user is attempting to login as a different userType
      if (user.userType !== userType) {
        return res.status(401).json({ success: false, message: 'Invalid user type.' });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid password.' });
      }
  
      // If the login is successful, store user data in the session
      req.session.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        // You can include other user-related data here as needed
      };
      // req.session.save();
      res.json({ success: true, message: 'Login successful.', user: req.session.user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'An error occurred.' });
    }
  });
  

// Endpoint to get the logged-in user's data
app.get('/api/user/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
console.log(userEmail)
    // Query your MongoDB or database to find the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // If user found, send the user data in the response
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});


app.put('/update-profile', upload.single('profileImage'), async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Update user data if new values are provided
    if (name) {
      existingUser.name = name;
    }

    // Check if a profileImage file was uploaded
    if (req.file) {
      // Save the filename to the user's profileImage field
      existingUser.image = req.file.filename;
    }
console.log(req.file);
    // Save the updated user data in the database
    await existingUser.save();

    res.json({ success: true, message: 'User data updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

app.delete('/delete-account', async (req, res) => {
  try {
    const { email } = req.body; // Assuming the email is sent in the request body
console.log(req.body)
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Delete the user account
    await User.deleteOne({ email });

    res.json({ success: true, message: 'User account deleted successfully.' }); // Send the response once after successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' }); // Send an error response if an error occurs
  }
});


// Add this route to your Express app
app.get('/api/layers', async (req, res) => {
  try {
    const { searchTerm } = req.query;
    console.log('Received request with searchTerm:', searchTerm);

    // Query your MongoDB or database to find layers matching the searchTerm
    const layers = await User.find({ name: { $regex: searchTerm, $options: 'i' } });

    res.json({ success: true, layers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

// this is the product apis


app.post('/api/items', upload.single('image'), async (req, res) => {
  try {
    // Extract form data including the uploaded image file (req.file)
    const { name, email, category, price } = req.body;
    const file = req.file;
    console.log(req.body)
    const imagePath = file.filename;
    // Create a new item with the form data
    const newItem = new ItemModel({
      name,
      email,
      category,
      price,
      image: imagePath, // Assign the image path to the 'image' field
    });

    // Save the new item to the database
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/glass', async (req, res) => {
  try {
    const glassItems = await ItemModel.find({ category: 'glass' });
    res.status(200).json(glassItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/glass/search', async (req, res) => {
    try {
      const minPrice = parseFloat(req.query.minPrice);
      const maxPrice = parseFloat(req.query.maxPrice);
  
      if (isNaN(minPrice) || isNaN(maxPrice)) {
        return res.status(400).json({ error: 'Invalid price range' });
      }
  
      const glassItems = await ItemModel.find({
        category: 'glass',
        price: { $gte: minPrice, $lte: maxPrice },
      });
  
      res.status(200).json(glassItems);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  app.get('/api/gla/search', async (req, res) => {
    try {
      const query = req.query.query;
      const minPrice = parseFloat(req.query.minPrice || 0);
      const maxPrice = parseFloat(req.query.maxPrice || Number.MAX_SAFE_INTEGER);
  
      const filter = {
        category: 'glass',
        name: { $regex: `^${query}`, $options: 'i' }, // Case-insensitive search
        price: { $gte: minPrice, $lte: maxPrice }, // Price range filter
      };
  
      const glassItems = await ItemModel.find(filter);
  
      res.status(200).json(glassItems);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.delete('/api/glass/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
  
      // Find and delete the product by ID
      await ItemModel.deleteOne({ _id: productId });
  
      res.status(204).send(); // Send a 204 No Content response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.put('/api/glass/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProduct = req.body; // New product data
  
      // Update the product by ID
      await ItemModel.findByIdAndUpdate(productId, updatedProduct);
  
      res.status(204).send(); // Send a 204 No Content response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
// Backend route to fetch items by category
app.get('/api/items/:category', async (req, res) => {
    try {
      const category = req.params.category;
  
      // Fetch items based on the selected category
      const items = await ItemModel.find({ category });
  
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


app.get('/api/perfume', async (req, res) => {
  try {
    const perfumeItems = await ItemModel.find({ category: 'perfume' });
    res.status(200).json(perfumeItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/cloth', async (req, res) => {
    try {
      const clothItems = await ItemModel.find({ category: 'cloth' });
      res.status(200).json(clothItems);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



