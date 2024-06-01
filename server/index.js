const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 6000;
let registerErrors = {};

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "ngo",
  password: "",
  port: 3308,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

const verifyJwt = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(400).json({ error: "Cannot Access" });
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.status(400).json({ auth: false, message: "auth failed" + err });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

// Registration route
app.post("/register", (req, res) => {
  const { username, email, password, cpassword, phone, pass_key } = req.body;

  if (password === cpassword) {
    // Check if the email is already in use
    const emailQuery = "SELECT * FROM users WHERE email = ?";
    db.query(emailQuery, [email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length > 0) {
        obj1 = { email: "Email already in use" };
        registerErrors.in1 = obj1;
      }
    });

    // Check if the username is already in use
    const usernameQuery = "SELECT * FROM users WHERE username = ?";
    db.query(usernameQuery, [username], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length > 0) {
        obj2 = { username: "Username already in use" };
        registerErrors.in2 = obj2;
      }
      if (Object.keys(registerErrors).length > 0) {
        // There are validation errors; send a single response with all error messages
        res.status(400).json(registerErrors);
        registerErrors = {};
      } else {
        // if not converted to string it throws error
        let userPassword = password.toString();
        // Hash and salt the password
        bcrypt.hash(userPassword, 10, (err, hash) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Error hashing the password " + err });
          }

          // Store the user in the database
          const user = { username, email, password: hash, phone, pass_key };
          const sql =
            "INSERT INTO users (username, email, password, phone, pass_key) VALUES (?, ?, ?, ?, ?)";
          const values = [
            user.username,
            user.email,
            user.password,
            user.phone,
            user.pass_key,
          ];

          db.query(sql, values, (err) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Error registering the user" });
            }
            res.json({ message: "User registered successfully" });
          });
        });
      }
    });
  } else {
    res
      .status(400)
      .json({ error: "Password and Confirm Password does'nt match" });
  }
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching user data" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ auth: false, error: "Invalid credentials" });
    }

    let newpass = password.toString();
    bcrypt.compare(newpass, results[0].password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res
          .status(401)
          .json({ auth: false, error: "Invalid credentials" });
      }

      const id = results[0].sno;
      const expiresInSeconds = 7 * 24 * 60 * 60;

      const token = jwt.sign({ id }, "jwtSecret", {
        expiresIn: expiresInSeconds,
      });
      res.json({ auth: true, token: token, results: results[0] });
    });
  });
});

//Admin Registration route
app.post("/admin/register", (req, res) => {
  const { username, email, password, cpassword, pass_key } = req.body;

  if (password === cpassword) {
    // Check if the email is already in use
    const emailQuery = "SELECT * FROM admin WHERE email = ?";
    db.query(emailQuery, [email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length > 0) {
        obj1 = { email: "Email already in use" };
        registerErrors.in1 = obj1;
      }
    });

    // Check if the username is already in use
    const usernameQuery = "SELECT * FROM admin WHERE username = ?";
    db.query(usernameQuery, [username], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length > 0) {
        obj2 = { username: "Username already in use" };
        registerErrors.in2 = obj2;
      }
      if (Object.keys(registerErrors).length > 0) {
        // There are validation errors; send a single response with all error messages
        res.status(400).json(registerErrors);
        registerErrors = {};
      } else {
        // if not converted to string it throws error
        let userPassword = password.toString();
        // Hash and salt the password
        bcrypt.hash(userPassword, 10, (err, hash) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Error hashing the password " + err });
          }

          // Store the user in the database
          const user = { username, email, password: hash, pass_key };
          const sql =
            "INSERT INTO admin (username, email, password, pass_key) VALUES (?, ?, ?, ?)";
          const values = [
            user.username,
            user.email,
            user.password,
            user.pass_key,
          ];

          db.query(sql, values, (err) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Error registering the user" });
            }
            res.json({ message: "User registered successfully" });
          });
        });
      }
    });
  } else {
    res
      .status(400)
      .json({ error: "Password and Confirm Password does'nt match" });
  }
});

//Admin Login route
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admin WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching user data" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ auth: false, error: "Invalid credentials" });
    }

    let newpass = password.toString();
    bcrypt.compare(newpass, results[0].password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res
          .status(401)
          .json({ auth: false, error: "Invalid credentials" });
      }

      const id = results[0].sno;
      const expiresInSeconds = 7 * 24 * 60 * 60;

      const token = jwt.sign({ id }, "jwtSecret", {
        expiresIn: expiresInSeconds,
      });
      res.json({ auth: true, token: token, results: results[0] });
    });
  });
});

app.post("/forgot-password", (req, res) => {
  const { email, name } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND pass_key = ?";
  db.query(sql, [email, name], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error " + err });
    }
    if (results.length > 0) {
      return res.json({ results });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  });
});

app.post("/reset-password", async (req, res) => {
  const { id, pass } = req.body;
  try {
    // Update the user's password in the database
    const hashedPassword = await bcrypt.hash(pass, 10);
    // Replace 'user123' with the actual user ID from the decoded token
    db.query("UPDATE users SET password = ? WHERE sno = ?", [
      hashedPassword,
      id,
    ]);
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to change password" });
  }
});

app.post("/admin/forgot-password", (req, res) => {
  const { email, name } = req.body;
  const sql = "SELECT * FROM admin WHERE email = ? AND pass_key = ?";
  db.query(sql, [email, name], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error " + err });
    }
    if (results.length > 0) {
      return res.json({ results });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  });
});

app.post("/admin/reset-password", async (req, res) => {
  const { id, pass } = req.body;
  try {
    // Update the user's password in the database
    const hashedPassword = await bcrypt.hash(pass, 10);
    // Replace 'user123' with the actual user ID from the decoded token
    db.query("UPDATE admin SET password = ? WHERE sno = ?", [
      hashedPassword,
      id,
    ]);
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to change password" });
  }
});

app.get("/getAllUsers", verifyJwt, (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching user data" });
    }
    res.json({ results });
  });
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM  details WHERE sno = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching user data" });
    }
    if (results.length > 0) {
      return res.json({ results });
    } else {
      return res.json({ message: "NO DATA SUBMITTED YET" });
    }
  });
});
app.get("/getUser/details/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM  details WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching user data" });
    }
    if (results.length > 0) {
      return res.json({ results });
    } else {
      return res.json({ message: "NO DATA SUBMITTED YET" });
    }
  });
});

app.get("/isFormSubmitted", verifyJwt, (req, res) => {
  const user = req.userId;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "-" + mm + "-" + yyyy;
  db.query(
    "SELECT * FROM details WHERE sno = ? AND submit_date = ?",
    [user, today],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error " + err });
      }
      if (results.length > 0) {
        return res.json({ submitted: true, user });
      } else {
        return res.json({ submitted: false, user });
      }
    }
  );
});

//Submitting form
app.post("/postform", (req, res) => {
  let {
    rounds,
    service,
    speaker,
    hear_time,
    author,
    read_time,
    attend,
    game,
    hrUp,
    minUp,
    typeUp,
    hrbed,
    minbed,
    typebed,
    userId,
    submit_date,
  } = req.body;
  if (hrUp >= 0 && hrUp < 10) {
    hrUp = "0" + hrUp;
  }
  if (minUp >= 0 && minUp < 10) {
    minUp = "0" + minUp;
  }
  if (hrbed >= 0 && hrbed < 10) {
    hrbed = "0" + hrbed;
  }
  if (minbed >= 0 && minbed < 10) {
    minbed = "0" + minbed;
  }
  const up = hrUp + ":" + minUp + " " + typeUp;
  const bed = hrbed + ":" + minbed + " " + typebed;
  const formval = {
    userId,
    rounds,
    service,
    speaker,
    hear_time,
    author,
    read_time,
    attend,
    game,
    up,
    bed,
    submit_date,
  };
  const sql =
    "INSERT INTO `details` (`sno`, `chant_rounds`, `service`, `speaker`, `hear_time`, `author`, `read_time`, `attend_session`, `attend_game`, `up_time`, `bet_time`, `submit_date`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";
  const values = [
    formval.userId,
    formval.rounds,
    formval.service,
    formval.speaker,
    formval.hear_time,
    formval.author,
    formval.read_time,
    formval.attend,
    formval.game,
    formval.up,
    formval.bed,
    formval.submit_date,
  ];
  db.query(sql, values, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error Subbmiting the form" + err });
    }
    res.json({ message: "Form Subbmited Successfully" });
  });
});

// API endpoint to update user details
app.put("/edit/user/:id", (req, res) => {
  const detailId = req.params.id;
  let {
    chant_rounds,
    service,
    speaker,
    hear_time,
    author,
    read_time,
    attend_session,
    attend_game,
    hrUp,
    minUp,
    typeUp,
    hrbed,
    minbed,
    typebed,
  } = req.body;

  const up_time = hrUp + ":" + minUp + " " + typeUp;
  const bet_time = hrbed + ":" + minbed + " " + typebed;

  const formval = {
    chant_rounds,
    service,
    speaker,
    hear_time,
    author,
    read_time,
    attend_session,
    attend_game,
    up_time,
    bet_time,
  };

  db.query(
    "UPDATE details SET chant_rounds = ?, service = ?, speaker  = ?, hear_time= ?, author = ?, read_time = ?, attend_session = ?, attend_game = ?, up_time = ?, bet_time = ? WHERE id = ?",
    [
      formval.chant_rounds,
      formval.service,
      formval.speaker,
      formval.hear_time,
      formval.author,
      formval.read_time,
      formval.attend_session,
      formval.attend_game,
      formval.up_time,
      formval.bet_time,
      detailId,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating user details" + err);
      } else {
        res.send("User details updated successfully");
      }
    }
  );
});

app.post("/postnotes", (req, res) => {
  const { note } = req.body;
  const formval = { note };
  console.log(formval);
  const sql = "INSERT INTO `notes` (`note`) VALUES (?)";
  db.query(sql, [formval.note], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating user details" + err);
    } else {
      res.send("User details updated successfully");
    }
  });
});

app.get("/getnotes", (req, res) => {
  const sql = "SELECT * FROM notes";
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating user details" + err);
    } else {
      res.json({ result });
    }
  });
});

app.delete("/deletenote/:id", (req, res) => {
  const itemId = req.params.id;

  const query = "DELETE FROM notes WHERE id = ?";

  db.query(query, [itemId], (error, results) => {
    if (error) {
      res.status(500).send("Error deleting item");
    } else {
      res.status(200).send("Item deleted successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
