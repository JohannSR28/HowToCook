"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";
const router = express_1.default.Router();
router.get("/profile", authenticateToken_1.authenticateToken, (req, res) => {
  const user = req.user; // Récupère les données utilisateur depuis le token
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  res.status(200).json({
    message: "Profile accessed successfully.",
    user,
  });
});
// Regex pour validation
const NAME_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Route POST : Créer un utilisateur
router.post("/", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { name, username, email, password } = req.body;
      /*
        // Vérifier que tous les champs sont remplis
        if (!name || !username || !email || !password) {
          res.status(400).json({ error: "All fields are required." });
          return;
        }
    
        // Validation des champs avec regex
        if (!NAME_REGEX.test(name)) {
          res.status(400).json({
            error:
              "Name must be 4-24 characters and can contain letters, numbers, underscores, or hyphens.",
          });
          return;
        }
    
        if (!EMAIL_REGEX.test(email)) {
          res.status(400).json({ error: "Invalid email format." });
          return;
        }
    
        // Vérification de l'unicité de l'email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
          res.status(409).json({ error: "Email is already in use." });
          return;
        }
    
        // Vérification de l'unicité du username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
          res.status(409).json({ error: "Username is already in use." });
          return;
        }
        */
      // Hachage du mot de passe avec bcrypt
      const saltRounds = 10; // Nombre de rounds pour générer le sel
      const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
      // Création du nouvel utilisateur avec le mot de passe haché
      const newUser = new userModel_1.default({
        name,
        username,
        email,
        password: hashedPassword, // Utiliser le mot de passe haché
        recipesId: [],
      });
      yield newUser.save();
      res
        .status(201)
        .json({ message: "User created successfully.", user: newUser });
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the user." });
    }
  })
);
// login route
router.post("/auth", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { username, password } = req.body;
      // Recherche l'utilisateur par username
      const user = yield userModel_1.default
        .findOne({ username })
        .select("+password");
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      // Vérifie le mot de passe
      const isMatch = yield bcrypt_1.default.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid password." });
      }
      // Crée un token avec l'ID utilisateur et d'autres infos si nécessaires
      const token = jsonwebtoken_1.default.sign(
        {
          userId: user._id,
          username: user.username, // Optionnel : ajoute le rôle si nécessaire
        },
        SECRET_KEY,
        { expiresIn: "1h" } // Durée de validité
      );
      // Retourner le token au frontend
      res.status(200).json({
        message: "User authenticated successfully.",
        token,
      });
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred during authentication." });
    }
  })
);
// get user by id
router.get("/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = yield userModel_1.default.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      res.status(200).json({ user });
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while getting the user." });
    }
  })
);
exports.default = router;
