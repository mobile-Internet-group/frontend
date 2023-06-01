import { Navigate, Route, Routes } from 'react-router-dom'
import CreateComment from '../layout/Create/CreateComment';
import PostDetail from '../layout/Detail/PostDetail';
import Register from '../layout/Register/Register';
import Message from '../layout/Message/Message';
import Create from '../layout/Create/Create';
import Nearby from '../layout/Nearby/Nearby';
import Login from '../layout/Login/Login'
import Home from '../layout/Home/Home';
import Me from '../layout/Me/Me';

function Pages() {
	return (
	  <div>
		<Routes>
			<Route path='/comment/create/:id' element={<CreateComment />} />
			<Route path='/post/:id' element={<PostDetail />} />
			<Route path='/register' element={<Register />} />
			<Route path="/message" element={<Message />} />
			<Route path="/nearby" element={<Nearby />} />
			<Route path="/create" element={<Create />} />
			<Route path="/login" element={<Login />} />
			<Route path="/home" element={<Home />} />
			<Route path="/me" element={<Me />} />
			<Route path='*' element={<Navigate to='/login' />} />
		</Routes>
	  </div>
	);
}
   
export default Pages;