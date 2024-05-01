"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        }
        catch (error) {
            return res.status(400).json({
                data: null,
                error: {
                    message: error.details[0].message,
                },
            });
        }
    };
};
exports.validateBody = validateBody;
