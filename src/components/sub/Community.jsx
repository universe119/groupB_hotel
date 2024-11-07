import { useEffect, useState } from "react";
import Layout from "../common/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Content from "../common/Content";
import Modal from "../common/Modal";
import { useZustandStore } from "../../hooks/useZustand";
import { AnimatePresence } from "framer-motion";

export default function Community() {
	const navigate = useNavigate();

	const [Posts, setPosts] = useState([]);
	const [Category, setCategory] = useState("");
	const [SearchText, setSearchText] = useState("");

	const isModal = useZustandStore(state => state.isModal);
	const isLoggedIn = useZustandStore(state => state.isLoggedIn);
	const setModalOpen = useZustandStore(state => state.setModalOpen);
	const setModalClose = useZustandStore(state => state.setModalClose);

	// Category 상태값에 따라 기존 Posts에서 해당 카테고리명에 매칭되는 데이터만 filtering해서 FilteredPosts라는 이름의 state로 저장
	// 삼항연산자의 구조를 응용해서 마치 if, else if, else 구문처럼 활용 가능
	const FilteredPosts =
		Category === "BUSINESS"
			? Posts.filter(post => post.category == "BUSINESS")
			: Category === "PERSONAL"
			? Posts.filter(post => post.category == "PERSONAL")
			: Category === "IMPORTANT"
			? Posts.filter(post => post.category == "IMPORTANT")
			: Posts;

	//전체 포스트 목록 초기화를 편하게 하도록 함수 분리
	const fetchAllPosts = () => {
		axios
			.get("https://psyh-hotelcommunitydb.onrender.com/posts")
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

	const handleWritePostClick = () => {
		if (isLoggedIn) {
			navigate("/community-add");
		} else {
			setModalOpen();
		}
	};

	const handleLogin = e => {
		e.preventDefault();

		if (!e.target[0].value.trim() || !e.target[1].value.trim())
			return alert("아이디 또는 비밀번호를 입력해주세요!"), ((e.target[0].value = ""), (e.target[1].value = ""));
		else if (e.target[0].value == import.meta.env.VITE_ADMIN_ID && e.target[1].value == import.meta.env.VITE_ADMIN_PW) {
			// 로그인 상태를 업데이트하고 모달을 닫은 후 페이지 이동
			useZustandStore.getState().login();

			navigate("/community-add");
			setModalClose();
		} else return alert("아이디 또는 비밀번호가 틀렸습니다!"), ((e.target[0].value = ""), (e.target[1].value = ""));
	};

	useEffect(() => {
		document.body.style.overflow = isModal ? "hidden" : "auto";
	}, [isModal]);

	useEffect(() => {
		fetchAllPosts();
	}, []);

	// SearchText 상태값 변경시마다 해당 상태값으로 GET요청 처리
	useEffect(() => {
		if (!SearchText) return;
		axios
			.get(`https://psyh-hotelcommunitydb.onrender.com/posts-search/?search=${SearchText}`)
			.then(res => {
				console.log(res.data);
				setPosts(res.data);
			})
			.catch(err => console.log(err.message));
	}, [SearchText]);

	return (
		<Layout title={"COMMUNITY"}>
			<Content>
				<div className="community">
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
						<button className="writeButton" onClick={handleWritePostClick}>
							Write Post
						</button>
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
				</div>
			</Content>
			{/* 로그인 모달 */}
			<AnimatePresence>
				{isModal && (
					<Modal>
						<h2 className="dLT">Admin Login</h2>
						<form className="dLB" onSubmit={handleLogin}>
							<input type="text" placeholder="아이디를 입력해주세요." />
							<input type="password" placeholder="비밀번호를 입력해주세요." />
							<button className="dLBT">로그인</button>
						</form>
					</Modal>
				)}
			</AnimatePresence>
		</Layout>
	);
}
