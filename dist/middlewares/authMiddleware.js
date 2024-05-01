"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const server_1 = require("../server");
const authMiddleware = async (req, res, next) => {
    const userId = req.headers["x-user-id"];
    if (!userId) {
        return res.status(403).json({
            data: null,
            error: { message: "You must be authorized user" },
        });
    }
    if (userId === "admin") {
        return next();
    }
    if (!(await server_1.DI.userRepository.findOne({
        id: userId,
    }))) {
        return res.status(401).json({
            data: null,
            error: { message: "User is not authorized" },
        });
    }
    next();
};
exports.authMiddleware = authMiddleware;
