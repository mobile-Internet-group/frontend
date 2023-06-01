import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton, NavBar, Space, Card, Modal, FloatingBubble } from 'antd-mobile';
import { HeartOutline, MessageOutline, MessageFill } from 'antd-mobile-icons';
import axios from 'axios';

const TODO = () => {
	Modal.alert({
		content: '暂不支持该功能',
		closeOnMaskClick: true,
	})
}



function PostDetail() {
	const navigate = useNavigate();

	if (typeof(window.username) == "undefined") {
		navigate('/login');
	}
	
	const [detail, setDetail]:any= useState(
		<>
			<Skeleton.Title animated />
        	<Skeleton.Paragraph lineCount={5} animated />
		</>
	)

	let postid = useParams().id;

	// setV use id to change compoment.
	let preWork = async (setV:any, id:any) => {
		console.log('get id: ', id);
		//let post_url = `https://948a63d0-7109-464b-8a52-f333a78488bb.mock.pstmn.io/api/post`;
		//let comment_url = `https://948a63d0-7109-464b-8a52-f333a78488bb.mock.pstmn.io/api/comment`;
		let post_url = 'http://127.0.0.1:8000/api/post';
		let comment_url = 'http://127.0.0.1:8000/api/comment';
		post_url += `/${id}`;
		comment_url += `/${id}`;

		const comment_options = {
			method: 'GET',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			url: comment_url,
		};

		console.log(post_url)
		const post_options = {
			method: 'GET',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			url: post_url,
		};

		let comments:any;
		await axios(comment_options).then(async (res) =>  {
			comments = res.data;
			await axios(post_options).then(res => {
				// result here!!!
				let post = res.data;
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
						<FloatingBubble
							axis='xy'
							magnetic='x'
							style={{
							'--initial-position-bottom': '24px',
							'--initial-position-right': '24px',
							'--edge-distance': '24px',
							}}
							onClick={() => {
								navigate(`/comment/create/${postid}`);
							}}
						>
							<MessageFill fontSize={32} />
						</FloatingBubble>
					</Space>
				);
			});
		});	
	}

	useEffect(() => {
		preWork(setDetail, postid);
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