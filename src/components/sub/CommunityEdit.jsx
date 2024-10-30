import { useEffect, useRef, useState } from "react";
import Layout from "../common/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function CommunityEdit() {
	const { slug } = useParams();
	const [Data, setData] = useState(null);
	const navigate = useNavigate();

	// 수정폼요소가 담길 참조 객체
	const ref_title = useRef(null);
	const ref_body = useRef(null);
	const ref_category = useRef(null);

	// 수정 버튼 클릭시 호출될 수정 함수
	const handleSubmit = e => {
		// 리액트 스럽게 스테이트값을 받아서 할 수 있다고 하심
		e.preventDefault();
		if (!ref_title.current.value || !ref_body.current.value) return alert("제목, 본문은 필수 입력 항목입니다!!");

		const editData = {
			title: ref_title.current.value,
			body: ref_body.current.value,
			category: ref_category.current.value
		};

		console.log(editData);

		axios
			.put(`http://127.0.0.1:8000/posts/${slug}/`, editData)
			.then(res => {
				console.log(res);

				navigate("/community");
			})
			.catch(err => console.log(err));
	};

	// 컴포넌트 마운트시 슬러그값을 이용해 get방식으로 수정할 데이터 가져옴
	useEffect(() => {
		axios
			.get(`http://127.0.0.1:8000/posts/${slug}`)
			.then(res => {
				setData(res.data);
			})
			.catch(err => console.log(err));
	}, []);

	// 현재 넘어온 상세페이지 전용 모델의 정보에 따라 select의 option활성화
	useEffect(() => {
		ref_category.current.value = Data?.category;
	}, [Data]);

	return (
		// 처음 마운트시 수정할 데이터를 폼요소 안쪽에 넣어줌
		// 이때 value속성이 아닌 defaultValue 속성을 지정한 이유
		// value속성을 연결시에는 무조건 onChange이벤트가 같이 전달되야 하기 때문
		<Layout className="EditCommunity">
			<form onSubmit={handleSubmit}>
				<select name="category" id="category" ref={ref_category} defaultValue={Data?.category}>
					<option value="PERSONAL">Personal</option>
					<option value="BUSINESS">Business</option>
					<option value="IMPORTANT">Important</option>
				</select>
				<br />
				<input
					ref={ref_title}
					type="text"
					name="title"
					id=" title"
					placeholder="제목을 입력하세요"
					defaultValue={Data?.title}
				/>
				<br />
				<textarea ref={ref_body} name="body" id="body" placeholder="본문을 입력하세요" defaultValue={Data?.body} />

				{/* 수정취소 버튼 클릭시 폼요소를 비우는게 아닌 이전 화면으로 되돌아감 */}
				<input type="reset" value="수정취소" onClick={() => navigate(-1)} />
				<input type="submit" value="수정" />
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