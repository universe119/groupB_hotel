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
		e.preventDefault();

		if (!ref_title.current.value.trim() || !ref_body.current.value.trim())
			return alert("제목, 본문은 필수 입력 항목입니다!!");

		const postData = {
			title: ref_title.current.value,
			body: ref_body.current.value,
			category: ref_category.current.value
		};

		console.log(postData);
		axios
			.post(`https://psyh-hotelcommunitydb.onrender.com/posts`, postData)
			.then(res => {
				console.log(res);

				navigate("/community");
			})
			.catch(err => console.log(err));
	};

	return (
		<Layout title={"ADD COMMUNITY"}>
			<div className="addCommunity">
				<form onSubmit={handleSubmit}>
					<table>
						<tbody>
							<tr>
								<td>
									<label htmlFor="title">Title :</label>
								</td>
								<td>
									<input ref={ref_title} type="text" id="title" placeholder="제목을 입력하세요" />
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="body">Text :</label>
								</td>
								<td>
									<textarea ref={ref_body} id="body" placeholder="본문을 입력하세요" />
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="category">Category :</label>
								</td>
								<td>
									<select ref={ref_category} id="category">
										<option value="PERSONAL">PERSONAL</option>
										<option value="BUSINESS">BUSINESS</option>
										<option value="IMPORTANT">IMPORTANT</option>
									</select>
								</td>
							</tr>
						</tbody>
					</table>
					<div className="button-group">
						<input type="reset" value="Cancel" />
						<input type="submit" value="Submit" />
					</div>
				</form>
			</div>
			<br />
			<button
				className="backButton"
				onClick={() => {
					navigate(-1);
				}}>
				Back to Page
			</button>
		</Layout>
	);
}
