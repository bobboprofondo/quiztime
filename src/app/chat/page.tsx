"use client";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { firebaseApp } from "../../firebase/quizfire";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function Page() {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  const signOut = () => {
    auth.signOut();
  }

  const [user, loading] = useAuthState(auth);

  return (
    <div>
      <header></header>
      <section>
        {user ? <ChatRoom user={user} signOut={signOut} /> : <SignIn signIn={signIn} />}
      </section>
    </div>
  );
}

function ChatRoom(props) {
  return (
    <div>
      <div>Welcome to Quiztime {props?.user?.displayName || 'Unknown User'}</div>
      <div><SignOut signOut={props.signOut} /></div>
    </div>
  );
}
function SignIn({ signIn }) {
  return <button onClick={signIn}>Sign in With Google</button>;
}
function SignOut({ signOut }) {
  return <button onClick={signOut}>Sign Out</button>;
}
