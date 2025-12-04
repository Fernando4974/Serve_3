"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        // Verificar si el usuario ya existe
        const existingUser = await User_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        // Hashear la contraseña
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Crear el usuario
        const user = await User_1.default.create({
            email,
            password: hashedPassword,
            username
        });
        // Generar token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '24h'
        });
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            token,
            user: { id: user.id, email: user.email, username: user.username }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Buscar usuario
        const user = await User_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        // Verificar contraseña
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        // Generar token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '24h'
        });
        res.status(200).json({
            message: 'Login exitoso',
            token,
            user: { id: user.id, email: user.email, username: user.username }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};
exports.login = login;
