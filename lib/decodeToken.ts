import { JwtPayload, jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface DecodedToken extends JwtPayload {
  user: User;
}

const decodeToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      return null;
    }
    return decoded.user || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default decodeToken;
