import Bottom from '../../compoment/Bottom/Bottom';

const waitTime = (time: number = 100) => {
	return new Promise((resolve) => {
	  setTimeout(() => {
		resolve(true);
	  }, time);
	});
};

function Me() {
	return (
		<div>
			Me 
			<Bottom activeKey='/me'/>
		</div>
	);
}

export default Me;