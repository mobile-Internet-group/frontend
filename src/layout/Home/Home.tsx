import Bottom from '../../compoment/Bottom/Bottom';
import { useState, useEffect } from 'react';
import { Card, Space, NavBar, SpinLoading, Modal,  } from 'antd-mobile';
import { HeartOutline, MessageOutline } from 'antd-mobile-icons';
import curPos from '../../utils/getCurPosition';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TODO = () => {
	Modal.alert({
		content: '暂不支持该功能',
		closeOnMaskClick: true,
	})
}

type post = {
	id: string,
	locationx: number,
	locationy: number,
	title: string,
	text: string,
	likes: number,
	comment_numbers: number,
	media_url: string,
};

const test_posts:post[] = [
	{id:'9527', locationx:121.1, locationy:31.222, title:'Good weather', text:'Today is a good day!', likes: 26, comment_numbers: 5, media_url: 'http:/aaa'},
	{id:'4396', locationx:121.1, locationy:31.221, title:'Peace Mood', text:'I will be better.', likes: 550, comment_numbers: 267, media_url: 'http:/aaa'},
];

let posts:post[] = test_posts;

const waitTime = (time: number = 100) => {
	return new Promise((resolve) => {
	  setTimeout(() => {
		resolve(true);
	  }, time);
	});
};

let prePreWork = async (setV:any, setP:any) => {
	curPos(preWork, setV, setP);
}


// setV change compoment while setP use navigate to change page.
let preWork = async (lng:any, lat:any, setV:any, setP:any) => {
	let dis = 0.0001;
	//let url = 'https://948a63d0-7109-464b-8a52-f333a78488bb.mock.pstmn.io/api/post';
	let url = 'http://127.0.0.1:8000/api/post';
	url += `?locationx=${lng}&locationy=${lat}&distance=${dis}`;
	const options = {
		method: 'GET',
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		url,
	};
	await axios(options).then(res =>{
		posts = res.data.results;
		let tmp = posts.map((post) =>
			<>
				<Space></Space>
					<Card title={post.title} onClick={() => {setP(post.id)}}>
						<Space direction='vertical'>
							{post.text}
							<Space>
								<HeartOutline onClick={TODO}/>{post.likes}
								<MessageOutline onClick={TODO}/>{post.comment_numbers}
							</Space>
						</Space>
					</Card>
			</>
		);
		setV(tmp);
	})
}

// 显示周围的帖子 latitude 维度 longitude 经度
function Home() {
	const navigate = useNavigate();

	const [listPosts, setListPosts]:any= useState(
		<SpinLoading  
			color='primary' 
			style={{ '--size': '96px', top: '35%', left:'40%', position: 'absolute' }}
		/>
	);

	const showPost = (id:string) => {
		console.log(id);
		navigate(`/post/${id}`);
	};

	useEffect(() => {
		prePreWork(setListPosts, showPost);
	}, []);

	
	
	return (
		<div>
			<NavBar backArrow={false} style={{background:'linear-gradient(to left, #58ACFA, #1677FF)', color:'white'}}>主页</NavBar>
			<div  style={{background: 'rgb(240,240,240)', width: '100%', height:'85%', position: 'absolute'}}>
				<Space direction='vertical' style={{width:'90%', margin: 'auto'}} block>
					{ listPosts }
				</Space>
			</div>
			<Bottom activeKey='/home' />
		</div>
	);
}

export default Home;
