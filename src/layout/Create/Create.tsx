import Bottom from '../../compoment/Bottom/Bottom';

const waitTime = (time: number = 100) => {
	return new Promise((resolve) => {
	  setTimeout(() => {
		resolve(true);
	  }, time);
	});
};

function Create() {
	return (
		<div>
			Create 
			<Bottom activeKey='/create'/>
		</div>
	);
}

export default Create;