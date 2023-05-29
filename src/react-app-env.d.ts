/// <reference types="react-scripts" />
declare module '*.less' {
	const resource: {[key: string]: string};
	export = resource;
}

declare module '*.module.less' {
	const classes: {
	  readonly [key: string]: string
	}
	export default classes
	declare module '*.less'
}

declare interface Window {
	webkitIndexedDB: any,
	mozIndexedDB:any,
	AMap:any,
	username:any,
}