import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

// import useAxiosPublic from "../hooks/useAxiosPublic";
import auth from "../components/firebase.config";

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null);
    const [loading , setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    // const axiosPublic = useAxiosPublic();


    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email , password)
    }

    const createUserWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)

    }

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);

    }

    const logOut =()=>{
        setLoading(true);
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) =>{
       return updateProfile(auth.currentUser,{
            displayName:name, photoURL:photo
        })
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged( auth, currentUser =>{
            setUser(currentUser);
            console.log("current user", currentUser);
            setLoading(false);
            // if (currentUser) {
            //     const userInfo = {email: currentUser.email};
            //     axiosPublic.post('/jwt', userInfo)
            //     .then(res=>{
            //     console.log(res.data.token);
            //     if (res.data.token) {
            //         localStorage.setItem('access-token', res.data.token);
            //         const token = localStorage.getItem('access-token')
            //         if (token) {
            //             setLoading(false);
                        
            //         }
            //     }
            // }
            //     )
            // }
            // else{
            // localStorage.removeItem('access-token')}
            
        });
        return () =>{
            return unsubscribe();
        }
    },[])

    const authInfo ={
        user,
        loading,
        updateUserProfile,
        createUser,
        signIn,
        logOut,
        createUserWithGoogle
    }


    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;