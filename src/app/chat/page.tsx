"use client";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../../firebase/quizfire";
import { getFirestore, serverTimestamp, collection, addDoc, getDocs, query, orderBy, limit, where, FieldValue, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

interface IMessage {
  id?: string;
  msg: string;
  uid: string;
  timestamp: FieldValue;
};

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

  const db = getFirestore(firebaseApp);
  const [user, loading] = useAuthState(auth);
  const [messages, setMessages] = useState([])

  return (
    <div>
      <header></header>
      <section className="h-full w-full">
        {user ? <ChatRoom
          user={user}
          signOut={signOut}
          db={db}
          messages={messages}
          setMessages={setMessages}
        /> : <SignIn signIn={signIn} />}
      </section>
    </div>
  );
}

function ChatRoom(props) {

  const sendMessage = async (event) => {
    event.preventDefault();

    const message: IMessage = {
      msg: event.target.message.value,
      uid: props.user.uid,
      timestamp: serverTimestamp(),
    }
    addDoc(collection(props.db, 'chats'), message);

  }

  const q = query(collection(props.db, 'chats'), orderBy('timestamp', 'desc'), limit(10))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const result = [];
    querySnapshot.forEach((doc) => {
      let tmp = doc.data();
      result.push({
        id: doc.id,
        msg: tmp.msg,
        uid: tmp.uid,
        timestamp: tmp.timestamp,
      })
    })
    props.setMessages(result);
  });



  // const msgs:IMessage[] = getMessages().then((response) => {return response.docs});
  return (<MessageList sendMessage={sendMessage} messages={props.messages} setMessages={props.setMessages} />)
};

function MessageList(props) {
  return (
    <div className="h-full w-full flex flex-col place-items-center">
      <div className="flex-auto place-self-center">Welcome to Quizzy time {props?.user?.displayName || 'Unknown User'}</div>
      <div className="flex-auto"><SignOut signOut={props.signOut} /></div>
      <ul>
        {props.messages.map((msg: IMessage) => { return (<li key={msg.id}>{msg.msg || 'No message'}</li>) })}
      </ul>
      <div>
        <form onSubmit={props.sendMessage}>
          <label htmlFor="message">Say What?</label>
          <input className="text-black" type="text" id="message" name="message" required />
          <button type="submit">Send</button>
        </form>
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
