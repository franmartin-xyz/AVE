import React, { useState } from 'react'
import { getAuth,GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                navigate('/AVE');
            })
            .catch((error) => {
                setAuthing(false);
            });
    };

  return (
    <div>Login</div>
  )
}

export default Login