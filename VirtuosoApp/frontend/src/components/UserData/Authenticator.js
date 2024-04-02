import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const Authenticator = createContext({
 auth:null,
 setAuth: () => {},
 user: null,
});


export const userAuth = () => useContext(Authenticator)

const provider = ({children}) => {
    const[auth, setAuth] = useState(null);
    const[user, setUser] = useState(null);

    useEffect(() => {
        const isAuth = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:5000/api/authenticate_user/',
                    { withCredentials: true }
                  );
                
                  setUser(res.data);
                } catch(error) {
                  setUser(null);
                };
            };

            isAuth();
        }, [auth]);

        return (
            <AuthContext.Provider value={{ auth, setAuth, user }}>
              {children}
            </AuthContext.Provider>
          );
        };
        
export default AuthProvider;
