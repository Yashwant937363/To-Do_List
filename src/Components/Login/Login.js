import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Login.css';
import './cardflip.css';
import { getUser, loginUser, setAuthToken, setSignUpDetails, signupUser } from '../../store/slices/userSlice';
import Cookies from 'js-cookie';

export default function Login() {
   const [username, changeUsername] = useState('');
   const [email, changeEmail] = useState('');
   const [password, changePassword] = useState('');
   const dispatch = useDispatch();
   const isLogin = useSelector((state) => state.user.isLogin);
   const [showpass, changePass] = useState(false);
   const [signup, changeSign] = useState(false);
   const [position, changePosition] = useState('static');
   const isPending = useSelector((state) => state.user.isPending);

   useEffect(() => {
      const token = Cookies.get('authtoken');
      if (token !== undefined) {
         dispatch(setAuthToken(token));
         dispatch(getUser({ token, dispatch }));
      }
      // eslint-disable-next-line
   },[])
   const handleSignupChange = () => {
      setTimeout(() => {
         changeUsername('');
         changeEmail('');
         changePassword('');
         changePosition(signup ? 'static' : 'absolute');
      }, 200);
   };

   const handleSignUpSubmit = async (event) => {
      event.preventDefault();
      dispatch(setSignUpDetails({ username, email }));
      dispatch(signupUser({ username, email, password, dispatch }));
   };

   const handleLoginSubmit = async (event) => {
      event.preventDefault();
      dispatch(setSignUpDetails({ username, email }));
      dispatch(loginUser({ email, password, dispatch }));
   };

   useEffect(() => {
      handleSignupChange();
      // eslint-disable-next-line
   }, [signup]);

   if (isPending) {
      return <div>Request Has Been Sent</div>;
   }

   return (
      <div className='body'>
         <style>
            {`
					body{
					background-image: url("${isLogin ? 'none' : 'https://wallpapers.com/images/hd/lush-green-forest-neblzag5t76yolal.jpg'}");
					}

					.round-checkbox .checkmark {
						background-color:${showpass ? '#00CC00' : 'rgba(255,255,255,0.2)'} ;
					}

					/* Show the checkmark when the checkbox is checked */
					.round-checkbox .checkmark:after {
						display: ${showpass ? 'block' : 'none'};
					}

					.flip-card-inner {
						transform: rotateY(${signup ? '0deg' : '180deg'});
					}

					.signup{
						position : ${position};
					}
        	`}
         </style>
         <div className='flip-card'>
            <div className='flip-card-inner'>
               <div className='flip-card-front loginbody'>
                  <h1>User Details</h1>
                  <form className='form' onSubmit={handleSignUpSubmit}>
                     <span>Username :</span>
                     <span className='input'>
                        <input type='text' value={username} onChange={(e) => changeUsername(e.target.value)} />
                        <i className="bi bi-person-fill"></i>
                     </span>
                     <span>Email :</span>
                     <span className='input'>
                        <input type='text' value={email} onChange={(e) => changeEmail(e.target.value)} />
                        <i className="bi bi-envelope"></i>
                     </span>
                     <span>Password :</span>
                     <span className='input'>
                        <input type={showpass ? 'text' : 'password'} value={password} onChange={(e) => changePassword(e.target.value)} />
                        <i className="bi bi-lock-fill"></i>
                     </span>
                     <span onClick={() => changePass(!showpass)} className='showpass'>
                        <span className="round-checkbox">
                           <input type='checkbox' value={showpass} />
                           <span className="checkmark"></span>
                           Show Password
                        </span>
                     </span>
                     <input type='submit' className='submit' value='Sign Up' />
                  </form>
                  <div className='signup'>
                     Already Have an Account
                     <span onClick={() => changeSign(!signup)}> Log In</span>?
                  </div>
               </div>
               <div className='flip-card-back loginbody'>
                  <h1>User Details</h1>
                  <form className='form' onSubmit={handleLoginSubmit}>
                     <span>Email :</span>
                     <span className='input'>
                        <input type='text' value={email} onChange={(e) => changeEmail(e.target.value)} />
                        <i className="bi bi-envelope"></i>
                     </span>
                     <span>Password :</span>
                     <span className='input'>
                        <input type={showpass ? 'text' : 'password'} value={password} onChange={(e) => changePassword(e.target.value)} />
                        <i className="bi bi-lock-fill"></i>
                     </span>
                     <span onClick={() => changePass(!showpass)} className='showpass'>
                        <span className="round-checkbox">
                           <input type='checkbox' value={showpass} />
                           <span className="checkmark"></span>
                           Show Password
                        </span>
                     </span>
                     <input type='submit' className='submit' value='Log In' />
                  </form>
                  <div className='signup'>
                     Don't Have an Account
                     <span onClick={() => changeSign(!signup)}> Sign Up</span>?
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
