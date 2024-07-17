import { createContext, useEffect, useReducer } from 'react';
import { jwtDecode } from 'jwt-decode';

const initial_state = {
   user: null,
   loading: false,
   error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN_START':
         return {
            user: null,
            loading: true,
            error: null,
         };
      case 'LOGIN_SUCCESS':
         return {
            user: action.payload,
            loading: false,
            error: null,
         };
      case 'LOGIN_FAILURE':
         return {
            user: null,
            loading: false,
            error: action.payload,
         };
      case 'LOGOUT':
         localStorage.removeItem("accessToken");
         localStorage.removeItem("user");
         return {
            user: null,
            loading: false,
            error: null,
         };
      default:
         return state;
   }
};

export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AuthReducer, initial_state);

   useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      console.log("AccessToken from localStorage:", accessToken);
      if (accessToken) {
         try {
            const decodedUser = jwtDecode(accessToken);
            console.log("Decoded user:", decodedUser);
            dispatch({ type: 'LOGIN_SUCCESS', payload: decodedUser });
         } catch (error) {
            console.error("Invalid token:", error);
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid token' });
         }
      }
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            dispatch,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
