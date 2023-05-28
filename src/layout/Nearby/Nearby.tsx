import Bottom from '../../compoment/Bottom/Bottom';
import PMap from "../../compoment/PMap/PMap";

function Nearby() {
	return (
		<div>
			<PMap markers={[
				{
					position:{
						longitude: 121.49959364149402, 
						latitude:31.291439344619
					}
				},
				{
					position:{
						longitude: 121.5, 
						latitude:31.291439344619
					}
				},
				{
					position:{
						longitude: 121.4999,
						latitude:31.291539354639
					}
				},
				{
					position:{
						longitude: 121.49513275340739,
						latitude:31.293415136366892
					}
				},
				{
					position:{
						longitude: 121.499632,
						latitude:31.29144
					}
				}
			]}>
			</PMap>
			<Bottom activeKey='/nearby'/>
		</div>
	);
}

export default Nearby;