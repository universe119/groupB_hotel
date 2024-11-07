import { useNavigate, useParams } from "react-router-dom";
import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useZustandStore } from "../../hooks/useZustand";
import Modal from "../common/Modal";

export default function CommunityDetail() {
	const navigate = useNavigate();
	const { slug } = useParams();
	const [Detail, setDetail] = useState(null);
	const [modalAction, setModalAction] = useState(""); // 현재 모달이 열릴 때의 동작을 저장하는 상태

	const isLoggedIn = useZustandStore(state => state.isLoggedIn);
	const setModalOpen = useZustandStore(state => state.setModalOpen);
	const setModalClose = useZustandStore(state => state.setModalClose);
	const isModal = useZustandStore(state => state.isModal);

	if (isModal) {
		document.body.style.overflow = "hidden"; // 모달이 열리면 스크롤을 막음
	} else {
		document.body.style.overflow = "auto"; // 모달이 닫히면 스크롤을 다시 허용
	}

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

	const handleEditClick = () => {
		if (isLoggedIn) {
			navigate(`/community-edit/${slug}`);
		} else {
			setModalAction("edit"); // 모달 동작을 "edit"으로 설정
			setModalOpen(); // 로그인 모달 열기
		}
	};

	const handleDeleteClick = () => {
		if (isLoggedIn) {
			handleDelete();
		} else {
			setModalAction("delete"); // 모달 동작을 "delete"로 설정
			setModalOpen(); // 로그인 모달 열기
		}
	};

	const handleLogin = e => {
		e.preventDefault();
		if (!e.target[0].value.trim() && !e.target[1].value.trim())
			return alert("아이디 또는 비밀번호를 입력해주세요!"), ((e.target[0].value = ""), (e.target[1].value = ""));

		if (e.target[0].value === import.meta.env.VITE_ADMIN_ID && e.target[1].value === import.meta.env.VITE_ADMIN_PW) {
			// 로그인 상태를 업데이트하고 모달을 닫은 후 페이지 이동
			useZustandStore.getState().login();
			setModalClose(); // 모달 닫기

			// 로그인 후 modalAction 상태에 따라 동작
			if (modalAction === "edit") {
				navigate(`/community-edit/${slug}`);
			} else if (modalAction === "delete") {
				handleDelete();
			}
		} else return alert("아이디 또는 비밀번호가 틀렸습니다!"), ((e.target[0].value = ""), (e.target[1].value = ""));
	};

	return (
		<Layout title={"DETAIL COMMUNITY"}>
			<div className="detailCommunity">
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
								{Detail?.created.split("T")[0] +
									" " +
									Detail?.created.split("T")[1].split(".")[0].split(":")[0] +
									"시 " +
									Detail?.created.split("T")[1].split(".")[0].split(":")[1] +
									"분 " +
									Detail?.created.split("T")[1].split(".")[0].split(":")[2] +
									"초 "}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="buttonGroup">
				<button onClick={handleEditClick}>Edit</button>
				<button onClick={handleDeleteClick}>Delete</button>
				<button
					onClick={() => {
						navigate(`/community`);
					}}>
					Back to Page
				</button>
			</div>
			{/* 로그인 모달 */}
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
		</Layout>
	);
}
