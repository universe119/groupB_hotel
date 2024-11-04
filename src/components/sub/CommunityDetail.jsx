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
		axios.get(`https://psyh-hotelcommunitydb.onrender.com/posts/${slug}`).then(res => {
			setDetail(res.data);
		});
	}, [slug]);

	// 삭제버튼 클릭시 실행할 함수
	const handleDelete = () => {
		if (!window.confirm("게시글 삭제하겠습니까?")) return;
		axios
			.delete(`https://psyh-hotelcommunitydb.onrender.com/posts/${slug}/`)
			.then(res => {
				console.log(res);

				// 글 삭제 완료시 포스트목록 컴포넌트로 강제 이동
				navigate("/community");
			})
			.catch(err => console.log(err));
	};

	return (
		<Layout title={"DETAIL COMMUNITY"}>
			<table className="detailTable">
				<tbody>
					<tr>
						<th>Category</th>
						<td>{Detail?.category}</td>
					</tr>
					<tr>
						<th>Title</th>
						<td>{Detail?.title}</td>
					</tr>
					<tr>
						<th>Content</th>
						<td>{Detail?.body}</td>
					</tr>
					<tr>
						<th>Created</th>
						<td>
							{Detail?.created.split("T")[0] + " " + Detail?.created.split("T")[1].split(".")[0].split(":")[0] + "시"}
						</td>
					</tr>
				</tbody>
			</table>
			<div className="buttonGroup">
				<button>
					<Link to={`/community-edit/${slug}`}>Edit</Link>
				</button>
				<button onClick={handleDelete}>Delete</button>
				<button
					onClick={() => {
						navigate(`/community`);
					}}>
					Back to Page
				</button>
			</div>
		</Layout>
	);
}
