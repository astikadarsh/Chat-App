
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCrY_lhhj7XjChhK9-XNRBtGuo4qyLh1Fg",
  authDomain: "chat-app-d89f5.firebaseapp.com",
  projectId: "chat-app-d89f5",
  storageBucket: "chat-app-d89f5.firebasestorage.app",
  messagingSenderId: "222214180328",
  appId: "1:222214180328:web:f83d3dc8c6b4613142e85d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);

const signup=async (username,email,password) => {
    try {
        const res= await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio: "Hey, There i am using chat app",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatData:[]
        })

    } catch (error) {
        console.error(error)
        toast.error(error.code)
    }
}
export{signup}