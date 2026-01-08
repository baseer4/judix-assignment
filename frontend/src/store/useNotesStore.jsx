import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useNotesStore = create((set) => ({
  notes: [],
  isLoading: false,
  isAdding: false,
  isDeleting: false,

  fetchNotes: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/notes");
      set({ notes: res.data });
    } catch (error) {
      console.error("Error fetching notes:", error);
      set({ notes: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  addNote: async (data) => {
    set({ isAdding: true });
    try {
      const res = await axiosInstance.post("/notes", data);
      set((state) => ({ notes: [...state.notes, res.data] }));
      return res.data;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    } finally {
      set({ isAdding: false });
    }
  },

  deleteNote: async (id) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`/notes/${id}`);
      set((state) => ({ 
        notes: state.notes.filter((note) => note._id !== id) 
      }));
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    } finally {
      set({ isDeleting: false });
    }
  },
}));


