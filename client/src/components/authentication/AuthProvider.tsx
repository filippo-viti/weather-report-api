import {createContext, useContext, useState, ReactNode, FC} from 'react';
import {JWTResponse} from "../../types";

interface AuthContextType {
  accessToken: string | null;
  login: (token: JWTResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = function ({children}) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = (token: JWTResponse) => {
    setAccessToken(token.access);
    if (token.refresh) {
      localStorage.setItem('refreshToken', token.refresh);  // Notice: this is insecure but has been done for simplicity
    }
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('refreshToken');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{accessToken, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
