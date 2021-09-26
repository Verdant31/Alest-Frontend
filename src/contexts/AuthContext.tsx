import { createContext, useState, useEffect, ReactNode } from 'react';
import { useHistory } from 'react-router';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string,
  email: string | null,
}

type AuthContextType = {
  user: User | undefined;
  signIn: (email: string, password: string) => Promise<boolean>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const history = useHistory();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email,
        })
      } else {
        history.push('/');
      }
    })
    return () => {
      unsubscribe();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function signIn(email: string, password: string) {
    let error = false;
    await firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      if (user.user?.uid) {
        setUser({
          id: user.user.uid,
          email: user.user.email,
        })
      }
    }).catch((err) => {
      error = true;
      return error;
    })
    return error;
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}
