import Bottom from '../../compoment/Bottom/Bottom';
import { useState, useEffect } from 'react';
import { Card, Space, NavBar, SpinLoading } from 'antd-mobile';
import { HeartOutline, MessageOutline } from 'antd-mobile-icons';
import curPos from '../../utils/getCurPosition';
import axios from 'axios';

type post = {
	id: string,
	locationx: number,
	locationy: number,
	title: string,
	content: string,
	likes: number,
	comment_numbers: number,
};

const test_posts:post[] = [
	{id:'9527', locationx:121.1, locationy:31.222, title:'Good weather', content:'Today is a good day!', likes: 26, comment_numbers: 5},
	{id:'4396', locationx:121.1, locationy:31.221, title:'Peace Mood', content:'I will be better.', likes: 550, comment_numbers: 267},
];

let posts:post[] = test_posts;

let preWork = async (setV:any) => {
	let [lng, lat] = curPos();
	let dis = 0.0001;
	let url = 'https://948a63d0-7109-464b-8a52-f333a78488bb.mock.pstmn.io/api/post';
	url += `?locationx=${lng}&locationy=${lat}&distance=${dis}`;
	await axios.get(url).then(res =>{
		posts = res.data.data.posts;
		let tmp = posts.map((post) =>
			<>
				<Space></Space>
					<Card title={post.title} >
						<Space direction='vertical'>
							{post.content}
							<Space>
								<HeartOutline onClick={() => {alert("暂不支持该功能");}}/>{post.likes}
								<MessageOutline onClick={() => {alert("暂不支持该功能");}}/>{post.comment_numbers}
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

	const [listPosts, setListPosts]:any= useState(
		<SpinLoading  
			color='primary' 
			style={{ '--size': '96px', top: '35%', left:'40%', position: 'absolute' }}
		/>
	);

	useEffect(() => {
		preWork(setListPosts);
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
