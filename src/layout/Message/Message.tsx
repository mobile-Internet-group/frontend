import Bottom from '../../compoment/Bottom/Bottom';
import { useNavigate } from 'react-router-dom';
import { NavBar } from 'antd-mobile';

function Message() {
	const navigate = useNavigate();

	if (typeof(window.username) == "undefined") {
		navigate('/login');
	}

	return (
		<div>
			<NavBar backArrow={false} style={{background:'linear-gradient(to left, #58ACFA, #1677FF)', color:'white'}}>消息提醒</NavBar>
			<div style={{background: 'rgb(240,240,240)', width: '100%', height:'85%', position: 'absolute'}}>
				
			</div>
			<Bottom activeKey='/message'/>
		</div>
	);
}

export default Message;