import { NavBar, Space, TextArea, Button, Toast } from 'antd-mobile';
import { useState } from 'react';
import curPos from '../../utils/getCurPosition';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const waitTime = (time: number = 100) => {
	return new Promise((resolve) => {
	  setTimeout(() => {
		resolve(true);
	  }, time);
	});
};



function CreateComment() {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	const navigate = useNavigate();

	if (typeof(window.username) == "undefined") {
		navigate('/login');
	}

	const doWork = (title:any, text:any) => {
		sendMsg(title, text);
	}

	let postid = useParams().id;
	
	const sendMsg = async (title:any, text:any) => {
		let url = 'http://127.0.0.1:8000/api/comment';
		url += `/${postid}`
		let data ={
			postid: postid,
			text : text,
			content_type: 0,
			media_url: `http://${postid}/${text}`,
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
					content: '评论成功',
				});
				navigate(`/post/${postid}`);
			} else {
				Toast.show({
					icon: 'fail',
					content: '评论失败！',
				});
				navigate(`/comment/create/${postid}`);
			}
		}).catch(err =>{
			Toast.show({
				icon: 'fail',
				content: `网络故障，请刷新后再尝试。`,
			});
		})
	}

	const back = () => {
		navigate(`/post/${postid}`);
	}

	return (
		<div>
			<NavBar back='返回' onBack={back} style={{background:'linear-gradient(to left, #58ACFA, #1677FF)', color:'white'}}>
				创建评论
			</NavBar>
			<div  style={{background: 'rgb(240,240,240)', width: '100%', height:'93%', position: 'absolute'}}>
				<Space direction='vertical' style={{width:'90%', margin: 'auto'}} block>
					<Space />

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
		</div>
	);
}

export default CreateComment;