import { Request, Response } from "express";
import AppDataSource from "../config/db";
import { Internship } from "../entities/Internship";

class InternshipController {
    public static async createInternship(req: Request, res: Response) {
        try {
            const { joined_date, completion_date, is_certified, mentor_name, user_id } = req.body;

            const internshipRepo = AppDataSource.getRepository(Internship);
            const newInternship = internshipRepo.create({ joined_date, completion_date, is_certified, mentor_name, user: { id: user_id } });

            await internshipRepo.save(newInternship);
            return res.status(201).json({ message: "Internship created", internship: newInternship });
        } catch (error) {
            console.error("❌ Error creating internship:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async getAllInternships(req: Request, res: Response) {
        try {
            const internshipRepo = AppDataSource.getRepository(Internship);
            const internships = await internshipRepo.find({ relations: ["user"] });

            return res.status(200).json(internships);
        } catch (error) {
            console.error("❌ Error fetching internships:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async getInternshipsByUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const internshipRepo = AppDataSource.getRepository(Internship);
            const internships = await internshipRepo.find({ where: { user: { id: Number(userId) } }, relations: ["user"] });

            return res.status(200).json(internships);
        } catch (error) {
            console.error("❌ Error fetching internships for user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async updateInternship(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { completion_date } = req.body;
            const internshipRepo = AppDataSource.getRepository(Internship);

            const internship = await internshipRepo.findOne({ where: { id: Number(id) } });
            if (!internship) return res.status(404).json({ message: "Internship not found" });

            internship.completion_date = completion_date;
            await internshipRepo.save(internship);

            return res.status(200).json({ message: "Internship updated", internship });
        } catch (error) {
            console.error("❌ Error updating internship:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async deleteInternship(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const internshipRepo = AppDataSource.getRepository(Internship);

            const internship = await internshipRepo.findOne({ where: { id: Number(id) } });
            if (!internship) return res.status(404).json({ message: "Internship not found" });

            await internshipRepo.remove(internship);
            return res.status(200).json({ message: "Internship deleted" });
        } catch (error) {
            console.error("❌ Error deleting internship:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default InternshipController;
