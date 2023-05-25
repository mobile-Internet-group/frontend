import Bottom from '../../compoment/Bottom/Bottom';
import { Avatar, Button, Card, List, Modal, Toast } from 'antd-mobile'
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
	{/* 获取用户昵称显示 -> username */}
	let username = '用户001';
	let user_intro = '你好！';
	return {username, user_intro};
}

function Me() {
	const {username, user_intro}= getUsername();

	const navigate = useNavigate()

	return (
		<div>
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
			<Bottom activeKey='/me'/>
		</div>
	);
}

export default Me;