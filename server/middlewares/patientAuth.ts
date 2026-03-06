import { Request, Response, NextFunction } from "express";

export const authenticatePatient = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Authentication required" });
    }

    if (user.role != "Patient")
        return res.status(401).json({ message: "Invalid credentials" });

    next();
}