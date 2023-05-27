import { Component } from 'react';
import { Map } from "react-amap";

class PMap extends Component {
	geolocEvent;

	constructor(props:any) {
		super(props);
		this.geolocEvent = {
			
			created: (mapInstance:any) => {
				var geolocation;
				function onComplete (data:any) {
					// data是具体的定位信息
					console.log(data);
				}
				function onError(err:any) {
					// err是具体的错误信息
					console.log(err);
				}
				window.AMap.service(
					'AMap.Geolocation', 
					function() {
						geolocation = new window.AMap.Geolocation({
							enableHighAccuracy: true, //是否使用高精度定位，默认:true
							timeout: 10000, //超过10秒后停止定位，默认：无穷大
							zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
							buttonPosition: 'LB', //显示定位按钮的位置 ，右下角 
							convert: true,	// 是否转换位高德地图坐标，方便展示
						}); 
						geolocation.getCurrentPosition();
						window.AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
						window.AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
					}
				)
				mapInstance.addControl(geolocation);
			}
		};

	};

	render() {
		return (
			<div style={{ width: '100%', height: '92%', position: 'absolute' }}>
				<Map
					amapkey='beccac67beb8de7befaf981b6b958614'
					zoom={14}
					events={this.geolocEvent}
				/>
			</div>
		)
	}
}

export default PMap;

