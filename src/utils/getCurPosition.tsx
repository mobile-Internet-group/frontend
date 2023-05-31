// Get current position
function curPos(thenDo:any, setV:any, setP:any) {
	let lng:any, lat:any;
	navigator.geolocation.getCurrentPosition(res => {
	  	console.log("获取位置成功:", res);
		let [longitude, latitude] = [res.coords.longitude, res.coords.latitude];
 		window.AMap.convertFrom([longitude, latitude], "gps", function (status:any, result:any) {
			console.log([result.locations[0].getLng(), result.locations[0].getLat()]);
			[lng, lat] = [result.locations[0].getLng(), result.locations[0].getLat()];
			thenDo(lng, lat, setV, setP);
		});

	}, err => {
	  	console.log("获取位置失败:", err);
	}, {
	  	enableHighAccuracy: true,
	  	timeout: 5000,
	  	maximumAge: 0
	});
}

export default curPos;