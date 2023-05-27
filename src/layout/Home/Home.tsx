import Bottom from '../../compoment/Bottom/Bottom';

const waitTime = (time: number = 100) => {
	return new Promise((resolve) => {
	  setTimeout(() => {
		resolve(true);
	  }, time);
	});
};

// h5 position
const positionClick = () => {
	navigator.geolocation.getCurrentPosition(res => {
	  console.log("获取位置成功:", res);
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
	return (
		<div>
			
			
			<button onClick={positionClick}>Home</button>
			<Bottom activeKey='/home' />
		</div>
	);
}

export default Home;
