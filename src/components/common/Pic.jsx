//src:이미지 url전달받음, className: Pic컴포넌트에 적용한 클래스명을 내부 div 프레임에 적용, shadow: 그림자 출력여부 결정
// 만약 Pic 컴포넌트를 일반적인 형태로 호출하는 것이 아닌 훅이나 기능함수에 호출시 컴포넌트 자체적으로 스타일 변경 가능토록 style props추가
export default function Pic({ className, style, src, shadow = false }) {
	//이미지 그림자 스타일
	const shadowStyle = {
		width: "100%",
		height: "100%",
		objectFit: "cover",
		position: "absolute",
		top: 10,
		left: 10,
		filter: "blur(20px)",
		opacity: 0.5
	};
	//기본 이미지 스타일
	const picStyle = { width: "100%", height: "100%", objectFit: "cover", position: "relative", top: 0, left: 0 };

	return (
		//className외에 외부에서 전달된 style옵션객체값으로도 해당 스타일 변경가능
		<div className={className} style={{ position: "relative", ...style }}>
			{/* shadow props값에 따라서 그림자 출력 여부 결정 */}
			{shadow && <img style={shadowStyle} src={src} alt={src} />}
			<img style={picStyle} src={src} alt={src} />
		</div>
	);
}
