import Bottom from '../../compoment/Bottom/Bottom';
import { Card, Space, NavBar } from 'antd-mobile'
import { useState } from 'react';
import { HeartOutline, MessageOutline } from 'antd-mobile-icons'
import curPos from '../../utils/getCurPosition';


// h5 position
const positionClick = () => {
	navigator.geolocation.getCurrentPosition(res => {
	  	console.log("获取位置成功:", res);
		let [longitude, latitude] = [res.coords.longitude, res.coords.latitude];
 		window.AMap.convertFrom([longitude, latitude], "gps", function (status:any, result:any) {
			console.log([result.locations[0].getLng(), result.locations[0].getLat()]);
		});
	}, err => {
	  	console.log("获取位置失败:", err);
	}, {
	  	enableHighAccuracy: true,
	  	timeout: 5000,
	  	maximumAge: 0
	});
}

// 显示周围的帖子 latitude 维度 longitude 经度
function Home() {

	type post = {
		locationx: number,
		locationy: number,
		title: string,
		content: string,
		likes: number,
		comment_numbers: number,
	};

	const test_posts:post[] = [
		{locationx:121.1, locationy:31.222, title:'Good weather', content:'Today is a good day!', likes: 26, comment_numbers: 5},
		{locationx:121.1, locationy:31.221, title:'Peace Mood', content:'I will be better.', likes: 550, comment_numbers: 267},
	];

	const [posts, setPosts] = useState(test_posts);
	
	const listPosts = posts.map((post) =>
		<>
			<Space></Space>
			<Card title={post.title} >
				<Space direction='vertical'>
					{post.content}
					<Space>
						<HeartOutline onClick={() => {alert("暂不支持该功能");}}/>{post.likes}
						<MessageOutline />{post.comment_numbers}
					</Space>
				</Space>
			</Card>
		</>
  	);

	return (
		<div>
			<NavBar backArrow={false} style={{background:'linear-gradient(to left, #58ACFA, #1677FF)', color:'white'}}>主页</NavBar>
			<div  style={{background: 'rgb(240,240,240)', width: '100%', height:'85%', position: 'absolute'}}>
				{/* <button onClick={positionClick}>Home</button> */}
				<Space direction='vertical' style={{width:'90%', margin: 'auto'}} block>
					{ listPosts }
				</Space>
			</div>
			<Bottom activeKey='/home' />
		</div>
	);
}

export default Home;
