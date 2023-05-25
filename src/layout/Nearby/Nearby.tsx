import Bottom from '../../compoment/Bottom/Bottom';

const waitTime = (time: number = 100) => {
	return new Promise((resolve) => {
	  setTimeout(() => {
		resolve(true);
	  }, time);
	});
};

function Nearby() {
	return (
		<div>
			NearBy 
			<Bottom activeKey='/nearby'/>
		</div>
	);
}

export default Nearby;