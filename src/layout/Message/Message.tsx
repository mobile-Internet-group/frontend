import { useNavigate } from 'react-router-dom';
import Bottom from '../../compoment/Bottom/Bottom';

const waitTime = (time: number = 100) => {
	return new Promise((resolve) => {
	  setTimeout(() => {
		resolve(true);
	  }, time);
	});
};

function Message() {
	return (
		<div>
			Message 
			<Bottom activeKey='/message'/>
		</div>
	);
}

export default Message;