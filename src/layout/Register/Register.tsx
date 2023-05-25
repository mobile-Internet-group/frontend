import React, { useState } from 'react'
import { Form, Input, Button, Modal, Toast } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Register.css"

const waitTime = (time: number = 100) => {
	return new Promise((resolve) => {
	  setTimeout(() => {
		resolve(true);
	  }, time);
	});
};

export default function () {
	const [visible, setVisible] = useState(false)

	const navigate = useNavigate()

	const onFinish = (values:any) => {
		Modal.confirm({
			content: '是否提交注册申请',
			onConfirm: async () => {
				if (!(values.password===values.confirm_password)) {
					Toast.show({
						icon: 'fail',
						content: '请确认两次输入的密码一致',
					});
				} else {
					let url = 'https://948a63d0-7109-464b-8a52-f333a78488bb.mock.pstmn.io/api/user/register'
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
							content: '网络故障，请刷新后再尝试',
						});
					})
					if (err_code === 0) {
						Toast.show({
							icon: 'success',
							content: '注册成功',
						});
						navigate('/home');
					} else {
						Toast.show({
							icon: 'fail',
							content: err_msg,
						});
					}
				}
			},
		});
	}

	return (
		<>
		<Form 
			layout='horizontal' 
			mode='card'
			footer={
				<div>
					<Button 
						block type='submit' 
						color='primary' 
						size='large'
					>
					注册
					</Button>
					<a href='login' style={{float:'right'}}>使用已有帐号</a>
				</div>
			}
			onFinish={onFinish}
		>

			<Form.Header>注册</Form.Header>
			<Form.Item 
				name='username' 
				label='用户名' 
				rules={[
					{ required: true },
					{
						pattern: new RegExp('^(?=.*\\d).{1,9}$'),
						message: '至少包含数字， 1~9位'
					},
				]}
			>
				<Input placeholder='可包含数字和字母' />
			</Form.Item>
			<Form.Item
				label='密码'
				name='password'
				rules={[
					{ required: true },
					{
						pattern: new RegExp('^(?=.*\\d).{6,9}$'),
						message: '至少包含数字， 6~9位'
					},
				]}
				extra={
					<div className="eye">
						{!visible ? (
							<EyeInvisibleOutline onClick={() => setVisible(true)} />
						) : (
							<EyeOutline onClick={() => setVisible(false)} />
						)}
					</div>
				}
			>
				<Input
					placeholder='请输入密码'
					clearable
					type={visible ? 'text' : 'password'}
				/>
			</Form.Item>
			<Form.Item
				label='确认密码'
				name='confirm_password'
				rules={[
					{ required: true },
					{
						pattern: new RegExp('^(?=.*\\d).{6,9}$'),
						message: '至少包含数字， 6~9位'
					},
				]}
				extra={
					<div className="eye">
						{!visible ? (
							<EyeInvisibleOutline onClick={() => setVisible(true)} />
						) : (
							<EyeOutline onClick={() => setVisible(false)} />
						)}
					</div>
				}
			>
				<Input
					placeholder='确认密码'
					clearable
					type={visible ? 'text' : 'password'}
				/>
			</Form.Item>
		</Form>
		
		</>
	)
}