import { useNavigate } from 'react-router-dom';
import Bottom from '../../compoment/Bottom/Bottom';

const waitTime = (time: number = 100) => {
	return new Promise((resolve) => {
	  setTimeout(() => {
		resolve(true);
	  }, time);
	});
};

function Home() {
	var obj = {
		activeKey: 'home'
	}
	return (
		<div>
			Home
			<Bottom activeKey='/home' />
		</div>
	);
}

export default Home;
