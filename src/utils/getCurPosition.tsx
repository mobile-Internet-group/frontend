// Get current position
function curPos() {
	navigator.geolocation.getCurrentPosition(res => {
	  	console.log("获取位置成功:", res);
		let [longitude, latitude] = [res.coords.longitude, res.coords.latitude];
 		window.AMap.convertFrom([longitude, latitude], "gps", function (status:any, result:any) {
			console.log([result.locations[0].getLng(), result.locations[0].getLat()]);
			return {
				position: {
					longitude: result.locations[0].getLng(),
					latitude: result.locations[0].getLat()
				}
			};
		});
	}, err => {
	  	console.log("获取位置失败:", err);
		return "error";
	}, {
	  	enableHighAccuracy: true,
	  	timeout: 5000,
	  	maximumAge: 0
	});
}

export default curPos;