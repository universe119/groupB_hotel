import { useEffect, useState } from "react";
import Layout from "../common/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import Content from "../common/Content";

export default function Community() {
	const [Posts, setPosts] = useState([]);
	//검색어가 담길 state
	const [SearchText, setSearchText] = useState("");

	//카테고리명이 담길 state
	const [Category, setCategory] = useState("");

	//전체 포스트 목록 초기화를 편하게 하도록 함수 분리
	const fetchAllPosts = () => {
		axios
			.get("http://localhost:8000/posts")
			.then(res => {
				setPosts(res.data);
			})
			.catch(err => console.log(err));
	};

	//검색폼에서 submit 이벤트 발생시 input요소의 입력값으로 SearchText상태 변경
	const handleSubmit = e => {
		e.preventDefault();
		if (!e.target[0].value.trim()) return alert("검색어를 입력해주세요!"), (e.target[0].value = "");

		setSearchText(e.target[0].value);
		e.target[0].value = "";
	};

	// Category 상태값에 따라 기존 Posts에서 해당 카테고리명에 매칭되는 데이터만 filtering해서 FilteredPosts라는 이름의 state로 저장
	// 삼항연사자의 구조를 응용해서 마치 if, else if, else 구문처럼 활용 가능
	const FilteredPosts =
		Category === "BUSINESS"
			? Posts.filter(post => post.category == "BUSINESS")
			: Category === "PERSONAL"
			? Posts.filter(post => post.category == "PERSONAL")
			: Category === "IMPORTANT"
			? Posts.filter(post => post.category == "IMPORTANT")
			: Posts;

	useEffect(() => {
		fetchAllPosts();
	}, []);

	// SearchText 상태값 변경시마다 해당 상태값으로 GET요청 처리
	useEffect(() => {
		if (!SearchText) return;
		axios
			.get(`http://localhost:8000/posts-search/?search=${SearchText}`)
			.then(res => {
				console.log(res.data);
				setPosts(res.data);
			})
			.catch(err => console.log(err.message));
	}, [SearchText]);

	return (
		<Layout title={"community"}>
			<Content>
				<form className="searchBox" onSubmit={handleSubmit}>
					<input type="text" placeholder="검색어를 입력해주세요." />
					<button>Search</button>
				</form>
				<div className="options">
					<select onChange={e => setCategory(e.target.value)}>
						<option value="">All Notes</option>
						<option value="BUSINESS">Business</option>
						<option value="PERSONAL">Personal</option>
						<option value="IMPORTANT">Important</option>
					</select>
					<Link to={`/community-add`} className="writeButton">
						Write Post
					</Link>
				</div>
				{Posts?.length === 0 && <p>해당 검색어의 검색 결과가 없습니다.</p>}
				<table className="postsTable">
					<thead>
						<tr>
							<th>Q&A</th>
						</tr>
					</thead>
					<tbody>
						{FilteredPosts?.map(post => (
							<tr key={post.id}>
								<td>
									<Link to={`/community/${post.slug}`}>{post.title}</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Content>
		</Layout>
	);
}
