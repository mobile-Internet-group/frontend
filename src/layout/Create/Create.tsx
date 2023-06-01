import Bottom from '../../compoment/Bottom/Bottom';
import { NavBar, Space, TextArea, Button, Toast } from 'antd-mobile';
import { useState } from 'react';
import curPos from '../../utils/getCurPosition';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const waitTime = (time: number = 100) => {
	return new Promise((resolve) => {
	  setTimeout(() => {
		resolve(true);
	  }, time);
	});
};



function Create() {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	const navigate = useNavigate();

	const doWork = (title:any, text:any) => {
		curPos(sendMsg, title, text);
	}
	
	const sendMsg = async (lng:any, lat:any, title:any, text:any) => {
		let url = 'http://127.0.0.1:8000/api/post';
		let data ={
			title: title,
			text : text,
			content_type: 0,
			media_url: `http://${title}`,
			location_x: lng,
			location_y: lat
		}
		const options = {
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			data: data,
			url,
		};
		await axios(options).then((res) => {
			let error_code = res.data.code;
			if (error_code === 0) {
				Toast.show({
					icon: 'success',
					content: '发帖成功',
				});
				navigate('/home');
			} else {
				Toast.show({
					icon: 'fail',
					content: '发帖失败！',
				});
				navigate('/create');
			}
		}).catch(err =>{
			Toast.show({
				icon: 'fail',
				content: `网络故障，请刷新后再尝试。`,
			});
		})
	}

	return (
		<div>
			<NavBar backArrow={false} style={{background:'linear-gradient(to left, #58ACFA, #1677FF)', color:'white'}}>
				创建新帖
			</NavBar>
			<div  style={{background: 'rgb(240,240,240)', width: '100%', height:'85%', position: 'absolute'}}>
				<Space direction='vertical' style={{width:'90%', margin: 'auto'}} block>
					<Space />
					<TextArea
						placeholder='请输入标题'
						value={title}
						onChange={val => {
							setTitle(val);
						}}
						autoSize
						maxLength={20}
						rows={1}
						style={{
							padding:'12px',
							background:'white',
							borderRadius:'20px',
							width:'94%',
							'--color': 'blue',
							'--font-size': '22px',
						}}
					/>
					<TextArea
						placeholder='请输入内容'
						value={text}
						onChange={ val => {
							setText(val);
						}}
						autoSize
						showCount
						maxLength={100}
						style={{
							padding:'20px',
							background:'white',
							borderRadius:'20px',
							width:'90%'
						}}
					/>
					<Space/>
					<Button 
						size='small' 
						color='primary' 
						style={{float:'right'}} 
						onClick={() => {
							doWork(title, text);
						}}
					>
            			创建
         			</Button>
				</Space>
			</div>
			<Bottom activeKey='/create'/>
		</div>
	);
}

export default Create;