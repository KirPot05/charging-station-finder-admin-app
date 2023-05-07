import { signInWithGoogle, logOut, login, signUp } from "../services/auth";

export function useAuth() {
  return {
    signInWithGoogle,
    logOut,
    login,
    signUp,
  };
}
