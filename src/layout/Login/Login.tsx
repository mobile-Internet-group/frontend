import {
	LockOutlined,
	MobileOutlined,
	AlipayOutlined,
	TaobaoOutlined,
	UserOutlined,
	WechatFilled,
} from '@ant-design/icons';
import {
	LoginForm,
	ProFormCaptcha,
	ProFormCheckbox,
	ProFormText,
	ProConfigProvider,
} from '@ant-design/pro-components';
import { Toast, Modal } from 'antd-mobile'
import { message, Space, Tabs } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'
import axios from 'axios';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
	marginInlineStart: '16px',
	color: 'rgba(0, 0, 0, 0.2)',
	fontSize: '24px',
	verticalAlign: 'middle',
	cursor: 'pointer',
};


const TODO = () => {
	Modal.alert({
		content: '暂不支持该功能',
		closeOnMaskClick: true,
	})
}

function Login() {
	const [loginType, setLoginType] = useState<LoginType>('account');

	const navigate = useNavigate();
	
	const onFinish = async (values:any) => {
		let url = 'https://948a63d0-7109-464b-8a52-f333a78488bb.mock.pstmn.io/api/user/login'
		let data = {
			username: values.username,
			password: values.password
		};
		let err_code = 0.;
		let err_msg = '';
		await axios.post(url, data).then(res =>{
			err_code = res.data.code;
			err_msg = res.data.data.error_msg;
		}).catch(err =>{
			Toast.show({
				icon: 'fail',
				content: `网络故障，请刷新后再尝试。\n${err_msg}`,
			});
		})
		if (err_code === 0) {
			Toast.show({
				icon: 'success',
				content: '登录成功，欢迎使用本产品',
			});
			window.username = values.username;
			navigate('/home');
		} else {
			Toast.show({
				icon: 'fail',
				content: '用户名或密码错误！',
			});
			navigate('/login');
		}
	};

	return (
		
		<ProConfigProvider hashed={false}>
			<div style={{ backgroundColor: 'white' }}>
				<LoginForm
					onFinish={onFinish}

					logo={logo}
					title="云上地贴"
					subTitle="你身边的帖子"
					actions={
						<div>
							<Space>
							其他登录方式
							<AlipayOutlined style={{...iconStyles, color: '#1677FF'}} onClick={TODO} />
							<TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} onClick={TODO}/>
							<WechatFilled style={{ ...iconStyles, color: '#04BE02' }} onClick={TODO}/>
							</Space>

							<div style={{float: 'right'}}>
								或者 <a href="register">现在注册!</a>
							</div>
						</div>
					}
				>
				<Tabs
					centered
					activeKey={loginType}
					onChange={(activeKey) => setLoginType(activeKey as LoginType)}
				>
					<Tabs.TabPane key={'account'} tab={'账号密码登录'} />
					<Tabs.TabPane key={'phone'} tab={'手机号登录'} />
				</Tabs>
				{loginType === 'account' && (
					<>
					<ProFormText
						name="username"
						fieldProps={{
							size: 'large',
							prefix: <UserOutlined className={'prefixIcon'} />,
						}}
						placeholder={'用户名: admin or user(clearlove7)'}
						rules={[
							{
								required: true,
								message: '请输入用户名!',
							},
							{
								pattern: new RegExp('^(?=.*\\d).{1,13}$'),
								message: '至少包含数字， 1~13位'
							}
						]}
					/>
					<ProFormText.Password
						name="password"
						fieldProps={{
							size: 'large',
							prefix: <LockOutlined className={'prefixIcon'} />,
							}}
						placeholder={'密码: ant.design'}
						rules={[
							{
								required: true,
								message: '请输入密码！',
							},
							{
								pattern: new RegExp('^(?=.*\\d).{6,9}$'),
								message: '至少包含数字， 6~9位'
							}
						]}
					/>
					</>
				)}
				{loginType === 'phone' && (
					<>
					<ProFormText
						fieldProps={{
						size: 'large',
						prefix: <MobileOutlined className={'prefixIcon'} />,
						}}
						name="mobile"
						placeholder={'手机号'}
						rules={[
							{
								required: true,
								message: '请输入手机号！',
							},
							{
								pattern: /^1\d{10}$/,
								message: '手机号格式错误！',
							},
						]}
					/>
					<ProFormCaptcha
						fieldProps={{
							size: 'large',
							prefix: <LockOutlined className={'prefixIcon'} />,
						}}
						captchaProps={{
							size: 'large',
						}}
						placeholder={'请输入验证码'}
						captchaTextRender={(timing, count) => {
							if (timing) {
								return `${count} ${'获取验证码'}`;
							}
							return '获取验证码';
						}}
						name="captcha"
						rules={[
							{
								required: true,
								message: '请输入验证码！',
							},
						]}
						onGetCaptcha={async () => {
							message.success('获取验证码成功！验证码为：1234');
						}}
					/>
					</>
				)}
				<div
					style={{
						marginBlockEnd: 24,
					}}
				>
					<ProFormCheckbox noStyle name="autoLogin" initialValue={'true'}>
						自动登录
					</ProFormCheckbox>
					<a 
						href='register'
						style={{
							float: 'right',
						}}
					>
					忘记密码?
					</a>
				</div>
				</LoginForm>
		</div>
		</ProConfigProvider>
	);
};

export default Login;