"use client";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { firebaseApp } from "../../firebase/quizfire";
import { getFirestore, serverTimestamp, collection, addDoc} from "firebase/firestore";
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

  const testSave = () => {
    const db = getFirestore(firebaseApp);
    const docco = {
      msg: 'Bramp',
      timestamp: serverTimestamp(),
      uid: user.uid
    }
    console.log(docco)
    addDoc(collection(db,'chats'),docco);
    // setDoc(doc(db, 'chats', '22vSXIhnIIJzygzCB5nL'), docco);
  }

  const [user, loading] = useAuthState(auth);

  return (
    <div>
      <header></header>
      <section className="h-full w-full">
        {user ? <ChatRoom user={user} signOut={signOut} testSave={testSave} /> : <SignIn signIn={signIn} />}
      </section>
    </div>
  );
}

function ChatRoom(props) {
  return (
    <div className="h-full w-full flex flex-col place-items-center">
      <div className="flex-auto place-self-center">Welcome to Quizzy time {props?.user?.displayName || 'Unknown User'}</div>
      <div className="flex-auto"><SignOut signOut={props.signOut} /></div>
      <div>
        <button onClick={props.testSave}>Click here!</button>
      </div>
    </div>
  );
}
function SignIn({ signIn }) {
  return <button onClick={signIn}>Sign in With Google</button>;
}
function SignOut({ signOut }) {
  return <button onClick={signOut}>Sign Out</button>;
}
