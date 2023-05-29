import Bottom from '../../compoment/Bottom/Bottom';
import { useState, useEffect } from 'react';
import PMap from "../../compoment/PMap/PMap";
import curPos from '../../utils/getCurPosition';
import { SpinLoading } from 'antd-mobile';
import axios from 'axios';


let preWork = async (setV:any) => {
	let [lng, lat] = curPos();
	let dis = 0.0001;
	let url = 'https://948a63d0-7109-464b-8a52-f333a78488bb.mock.pstmn.io/api/post';
	url += `?locationx=${lng}&locationy=${lat}&distance=${dis}`;
	await axios.get(url).then(res =>{
		let posts:any = res.data.data.posts;
		let markers = posts.map((post:any) => {
			return ({
				position:{
					longitude: post.location_x,
					latitude: post.location_y
				}
			});
		});
		setV(<PMap markers={markers}/>);
		console.log('posts', posts);
		console.log('markers', markers);
	});
}

function Nearby() {

	const [pMap, setPMap]:any= useState(
		<SpinLoading  
			color='primary' 
			style={{ '--size': '96px', top: '35%', left:'40%', position: 'absolute' }}
		/>
	);

	useEffect(() => {
		preWork(setPMap);
	}, []);

	return (
		<div>
			{pMap}
			<Bottom activeKey='/nearby'/>
		</div>
	);
}

export default Nearby;