import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";


export const useAuthStore = create((set) => ({
    authUser:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLoggingIn:false,
    isViewingProfile:false,
    profileData:{},


    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data});
        } catch (error) {
            set({authUser: null});
            console.log("Error in checkAuth",error);
        } finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async(data)=>{
        set({isSigningUp:true})
        
        try {
            const res =await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data})
        } catch (error) {
            throw error;
        }finally{
            set({isSigningUp:false});
        }
    },
    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
        } catch (error) {
            console.error("Can't logout, please try again",error)
        }
    },
    login: async(data)=>{
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data})
        } catch (error) {
            throw error;
        } finally{
            set({isLoggingIn:false});
        }
    },
    profile: async() =>{
        set({isViewingProfile:true})
        try {
            const res = await axiosInstance.get("/auth/profile");
            set({profileData:res.data})
        } catch (error) {
            console.log("Error while checking Profile",error);
        } finally{
            set({isViewingProfile:false})
        }
    },
    updateProfile: async(data) => {
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.put("/auth/profile", data);
            set({authUser:res.data});
            return res.data;
        } catch (error) {
            throw error;
        } finally{
            set({isSigningUp:false});
        }
    },
    updatePassword: async(data) => {
        set({isSigningUp:true})
        try {
            await axiosInstance.put("/auth/password", data);
        } catch (error) {
            throw error;
        } finally{
            set({isSigningUp:false});
        }
    }
}));