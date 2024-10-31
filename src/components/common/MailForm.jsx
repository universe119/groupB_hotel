import emailjs from "@emailjs/browser";
import { useRef } from "react";
import Pic from "./Pic";

export default function MailForm() {
	const ref_form = useRef(null);
	const ref_name = useRef(null);
	const ref_email = useRef(null);
	const ref_msg = useRef(null);
	const ref_phone = useRef(null);

	// 전송 이벤트 발생시 폼요소의 값을 비우기 위한 초기화 함수
	const resetForm = () => {
		[ref_name, ref_email, ref_phone, ref_msg].forEach(dom => (dom.current.value = ""));
	};

	//전송 버튼 클릭시 실행될 함수
	const sendForm = e => {
		e.preventDefault();
		if (
			!ref_name.current.value.trim() ||
			!ref_email.current.value.trim() ||
			!ref_phone.current.value.trim() ||
			!ref_msg.current.value.trim()
		)
			return alert("제목, 이메일, 스마트폰번호, 내용은 필수 입력 항목입니다!!");
		//email JS API가 제공하는 메일서버에 폼값 전달하는 함수 emailjs.sendForm(serviceID, templateID, templateParams, options);
		emailjs
			.sendForm(import.meta.env.VITE_SERVICE_KEY, import.meta.env.VITE_TEMPLATE_KEY, ref_form.current, {
				publicKey: import.meta.env.VITE_PUBLIC_KEY
			})
			.then(res => {
				alert("문의내용이 관리자에 전달되었습니다.");
				console.log(res);
				resetForm();
			});
	};

	return (
		<div className="mailForm">
			<div className="titImg">
				<Pic
					className={"pic"}
					src={"/로비전화2.jpg"}
					style={{ width: "100%", height: "100%", position: "relative" }}
					shadow
				/>
			</div>

			{/* <div className="formBox"> */}
			<form onSubmit={sendForm} ref={ref_form} className="formBox">
				{/* 문의자이름, 메일주소 입력받는 상단 영역 */}
				<div className="mailMark">
					<h2>GET IN TOUCH</h2>
					<Pic className={"getImg"} src={"/전화이메일2.png"} />
				</div>

				<div className="upper">
					<span>
						<label htmlFor="uName">Name</label>
						<input ref={ref_name} name="user_name" type="text" id="uName" placeholder="Leave your name" />
					</span>
					<span>
						<label htmlFor="uMail">E-Mail</label>
						<input ref={ref_email} name="user_email" type="text" id="uMail" placeholder="Leave your email" />
					</span>
					<span>
						<label htmlFor="uPhone">Phone</label>
						<input ref={ref_phone} name="user_phone" type="tel" id="uPhone" placeholder="Leave your phone number" />
					</span>
				</div>

				{/* 문의내용 입력받는 textarea하단 영역 */}
				<div className="lower">
					<label htmlFor="msg">Message</label>
					<textarea ref={ref_msg} name="message" id="msg" placeholder="Leave your message"></textarea>
				</div>

				{/* 전송, 취소 버튼 그룹 */}
				<nav className="btnSet">
					<input type="reset" value="Cancel" />
					<input type="submit" value="Send" />
				</nav>
			</form>

			{/* </div> */}
		</div>
	);
}
