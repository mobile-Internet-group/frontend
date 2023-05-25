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

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
	marginInlineStart: '16px',
	color: 'rgba(0, 0, 0, 0.2)',
	fontSize: '24px',
	verticalAlign: 'middle',
	cursor: 'pointer',
};

const waitTime = (time: number = 100) => {
	return new Promise((resolve) => {
	  setTimeout(() => {
		resolve(true);
	  }, time);
	});
};

const TODO = () => {
	Modal.alert({
		content: '暂不支持该功能',
		closeOnMaskClick: true,
	})
}

export default () => {
	const [loginType, setLoginType] = useState<LoginType>('account');

	const navigate = useNavigate();

	const onFinish = async (values:any) => {
		await waitTime(2000);
		Toast.show({
			icon: 'success',
			content: '欢迎使用',
		})
    	navigate('/home')
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
						placeholder={'用户名: admin or user'}
						rules={[
							{
								required: true,
								message: '请输入用户名!',
							},
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