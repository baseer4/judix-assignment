import Note from "../models/notes.model.js";

export const createNote = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user._id;

    try {
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newNote = new Note({
            title,
            content,
            userId,
        });

        await newNote.save();

        res.status(201).json(newNote);
    } catch (error) {
        console.log("Error while creating note", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getNotes = async (req, res) => {
    const userId = req.user._id;

    try {
        const notes = await Note.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error while fetching notes", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized - You can only delete your own notes" });
        }

        await Note.findByIdAndDelete(id);

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.log("Error while deleting note", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

