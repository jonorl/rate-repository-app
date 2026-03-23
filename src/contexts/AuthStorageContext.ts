import { createContext } from 'react';
import AuthStorage from '../utils/authStorage'; // adjust path as needed

const AuthStorageContext = createContext<AuthStorage | null>(null);

export default AuthStorageContext;