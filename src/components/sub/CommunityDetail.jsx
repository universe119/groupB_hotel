import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CommunityDetail() {
	const navigate = useNavigate();
	const { slug } = useParams();
	const [Detail, setDetail] = useState(null);

	// 상세페이지 마운트시 자동으로 상세데이터 가져옴
	useEffect(() => {
		axios.get(`http://127.0.0.1:8000/posts/${slug}`).then(res => {
			setDetail(res.data);
		});
	}, [slug]);

	// 삭제버튼 클릭시 실행할 함수
	const handleDelete = () => {
		if (!window.confirm("게시글 삭제하겠습니까?")) return;
		axios
			.delete(`http://127.0.0.1:8000/posts/${slug}/`)
			.then(res => {
				console.log(res);

				// 글 삭제 완료시 포스트목록 컴포넌트로 강제 이동
				navigate("/community");
			})
			.catch(err => console.log(err));
	};

	return (
		<Layout title="DetailCommunity">
			<section>
				<div className="category">category: {Detail?.category}</div>
				<h3>{Detail?.title}</h3>
				<p>{Detail?.body}</p>
				<span>Created : {Detail?.created.split("T")[0]}</span>
			</section>
			<button>
				<Link to={`/community-edit/${slug}`}>Edit</Link>
			</button>
			<br />
			<button onClick={handleDelete}>Delete</button>
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
