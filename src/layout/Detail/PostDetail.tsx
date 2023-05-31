import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton, NavBar, Space, Card, Modal } from 'antd-mobile';
import { HeartOutline, MessageOutline } from 'antd-mobile-icons';
import axios from 'axios';

const TODO = () => {
	Modal.alert({
		content: '暂不支持该功能',
		closeOnMaskClick: true,
	})
}

// setV use id to change compoment.
let preWork = async (setV:any, id:any) => {
	console.log('get id: ', id);
	let post_url = `https://948a63d0-7109-464b-8a52-f333a78488bb.mock.pstmn.io/api/post/${id}`;
	let comment_url = `https://948a63d0-7109-464b-8a52-f333a78488bb.mock.pstmn.io/api/comment`;
	comment_url += `?post_id=${id}`;

	console.log(comment_url);

	let comments:any;
	await axios.get(comment_url).then(res => {
		comments = res.data.data.posts;
	});

	await axios.get(post_url).then(res => {
		let post = res.data.data;
		let title = <div>
			{post.title}
			<Space />
			<div style={{fontSize: '1px', color:'#A9A9A9', fontWeight:'normal'}}>
				来自于 {post.media_url}
			</div>
		</div>
		let comment_bar = <div style={{fontFamily:'sans-serif', fontWeight:'bold'}}>
			评论详情
		</div>
		let comment_list = comments.map((comment:any) => {
			return (
				<Card title={comment.user_id}>
					{comment.text}
				</Card>
			);
		});

		setV(
			<Space direction='vertical' style={{width:'90%', margin: 'auto'}} block>
				<Space />
				{/*  post  */}
				<Card title={title}>
					<Space direction='vertical'>
							{post.text}
						<Space>
							<HeartOutline onClick={TODO}/>{post.likes}
							<MessageOutline onClick={TODO}/>{post.comment_numbers}
						</Space>
					</Space>
				</Card>

				{/*  comments */}
				<Space />
				{comment_bar}
				{comment_list}
				<Space />
			</Space>
		);
	});
}

function PostDetail() {
	const navigate = useNavigate();

	const [detail, setDetail]:any= useState(
		<>
			<Skeleton.Title animated />
        	<Skeleton.Paragraph lineCount={5} animated />
		</>
	)

	let post_id = useParams().id;

	useEffect(() => {
		preWork(setDetail, post_id);
	}, []);

	const back = () => {
		navigate('/home')
	}
	return (
		<>
			<NavBar  back='首页' onBack={back} style={{background:'linear-gradient(to left, #58ACFA, #1677FF)', color:'white'}}>帖子详情</NavBar>
			<div  style={{background: 'rgb(240,240,240)', width: '100%', height:'93%', position: 'absolute'}}>
				{detail}
			</div>
		</>
	);

}

export default PostDetail;