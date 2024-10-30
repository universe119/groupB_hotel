import axios from "axios";
import Layout from "../common/Layout";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CommunityAdd() {
	const navigate = useNavigate();
	const ref_title = useRef(null);
	const ref_body = useRef(null);
	const ref_category = useRef(null);

	const handleSubmit = e => {
		// 리액트 스럽게 스테이트값을 받아서 할 수 있다고 하심
		e.preventDefault();
		if (!ref_title.current.value || !ref_body.current.value) return alert("제목, 본문은 필수 입력 항목입니다!!");

		const postData = {
			title: ref_title.current.value,
			body: ref_body.current.value,
			category: ref_category.current.value
		};

		console.log(postData);
		axios
			.post(`http://127.0.0.1:8000/posts`, postData)
			.then(res => {
				console.log(res);

				navigate("/community");
			})
			.catch(err => console.log(err));
	};
	return (
		<Layout className="AddCommunity">
			<form onSubmit={handleSubmit}>
				<input ref={ref_title} type="text" name="title" id=" title" placeholder="제목을 입력하세요" />
				<br />
				<textarea ref={ref_body} name="body" id="body" placeholder="본문을 입력하세요" />
				<br />
				<select ref={ref_category} name="category" id="category">
					<option value="PERSONAL">PERSONAL</option>
					<option value="BUSINESS">BUSINESS</option>
					<option value="IMPORTANT">IMPORTANT</option>
				</select>
				<input type="reset" value="취소" />
				<input type="submit" value="전송" />
			</form>
			<br />
			<button
				onClick={() => {
					navigate(-1);
				}}>
				뒤로가기
			</button>
		</Layout>
	);
}
