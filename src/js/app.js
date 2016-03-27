debug = boldTemplate.debug;

//obsluga przycisku 1
document.getElementById("butonik").addEventListener("click", showMyPopup);

window.boldDebug.show();

function showMyPopup() {
	boldTemplate.loadTemplate({ id: "basicTemplate", data : {mainText: "test tekstu", buttonId: "testButton", buttonIdDwa: "drugiKlikacz"}});

}