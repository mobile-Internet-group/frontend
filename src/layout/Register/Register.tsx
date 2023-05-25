import React, { useState } from 'react'
import { Form, Input, Button, Modal, Toast } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
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
			content: '是否提交申请',
			onConfirm: async () => {
			  await waitTime(3000)
			  Toast.show({
				icon: 'success',
				content: '注册成功',
			  })
			  navigate('/home')
			},
		})
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
			<Form.Item name='username' label='用户名' rules={[{ required: true }]}>
				<Input placeholder='可包含数字和字母' />
			</Form.Item>
			<Form.Item
				label='密码'
				name='password'
				rules={[{ required: true }]}
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
				rules={[{ required: true }]}
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