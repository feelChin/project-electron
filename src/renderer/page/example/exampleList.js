import { lazy } from "react";

export default {
	drag: lazy(() => import("./drag")),
	timeCountDown: lazy(() => import("./timeCountDown")),
	verificationCode: lazy(() => import("./verificationCode")),
	intersectionObserverScrollList: lazy(() =>
		import("./intersectionObserverScrollList")
	),
	websocket: lazy(() => import("./websocket")),
	message: lazy(() => import("./message")),
	plateKeyboard: lazy(() => import("./plateKeyboard")),
	theQuest: lazy(() => import("./theQuest")),
	tableAddAndRemove: lazy(() => import("./tableAddAndRemove")),
	shoppingCart: lazy(() => import("./shoppingCart")),
	tree: lazy(() => import("./tree")),
	myModal: lazy(() => import("./myModal")),
	accordion: lazy(() => import("./accordion")),
	entrust: lazy(() => import("./entrust")),
	splitText: lazy(() => import("./splitText")),
	fixedElement: lazy(() => import("./fixedElement")),
	followArrow: lazy(() => import("./followArrow")),
	loadingImg: lazy(() => import("./loadingImg")),
	mouseDocumengtMove: lazy(() => import("./mouseDocumengtMove")),
	scrollPageFollowAnimation: lazy(() => import("./scrollPageFollowAnimation")),
	scrollPageTransfrom: lazy(() => import("./scrollPageTransfrom")),
	scrollPageTransfromHorizontally: lazy(() =>
		import("./scrollPageTransfromHorizontally")
	),
	shell: lazy(() => import("./shell")),
	tilt: lazy(() => import("./tilt")),
	mask: lazy(() => import("./mask")),
	scrollpageActive: lazy(() => import("./scrollpageActive")),
	imgToVideo: lazy(() => import("./imgToVideo")),
	mouseFollow: lazy(() => import("./mouseFollow")),
	music: lazy(() => import("./music")),
	custonScrollTheme: lazy(() => import("./custonScrollTheme")),
	virtualList: lazy(() => import("./virtualList")),
	virtualLoop: lazy(() => import("./virtualLoop")),
	noticeLoopScroll: lazy(() => import("./noticeLoopScroll")),
	customRoute: lazy(() => import("./customRoute")),
	promiseLimit: lazy(() => import("./promiseLimit")),
	numberAni: lazy(() => import("./numberAni")),
};
