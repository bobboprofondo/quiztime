import React from "react";
import { firebaseApp } from "../../firebase/quizfire";

// Configure FirebaseUI.
const uiConfig = {
    // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    
  };



export default function Page() {
    return <h1>Hello?</h1>
}