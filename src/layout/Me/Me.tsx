import Bottom from '../../compoment/Bottom/Bottom';
import { Avatar, Button, Card, List, Modal, Toast, NavBar } from 'antd-mobile'
import user_img from "./default-user.png"
import { useNavigate } from 'react-router-dom';

const waitTime = (time: number = 100) => {
	return new Promise((resolve) => {
	  setTimeout(() => {
		resolve(true);
	  }, time);
	});
};

const getUsername = () => {
	let username = window.username;
	let user_intro = '你好！';
	return {username, user_intro};
}

function Me() {
	const {username, user_intro}= getUsername();

	const navigate = useNavigate()

	if (typeof(window.username) == "undefined") {
		navigate('/login');
	}

	return (
		<div>
			<NavBar backArrow={false} style={{background:'linear-gradient(to left, #58ACFA, #1677FF)', color:'white'}}>个人主页</NavBar>
			<div style={{background: 'rgb(240,240,240)', width: '100%', height:'85%', position: 'absolute'}}>
				<Card title='个人信息'>
					<List>
						<List.Item
							prefix={<Avatar src={user_img} style={{ '--size': '64px' }}/>}
							description={user_intro}
						>
							{username}
						</List.Item>
					</List>
				</Card>
				<Button
					block
					onClick={() =>
						Modal.confirm({
							content: '确定退出？',
							onConfirm: async () => {
								await waitTime(1000)
								Toast.show({
									icon: 'success',
									content: '期待您的下次使用！',
								})
								navigate('/login')
							},
						})
					}
					color='primary' 
					size='large'
				>
					退出登录
				</Button>
			</div>
			
			<Bottom activeKey='/me'/>
		</div>
	);
}

export default Me;