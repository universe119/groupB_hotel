import Content from "../common/Content";
import Layout from "../common/Layout";
import MailForm from "../common/MailForm";
import FAQ from "../common/FAQ";

export default function Contact() {
	return (
		<Layout title={"CONTACT"}>
			<Content>
				<MailForm />
				<FAQ />
			</Content>
		</Layout>
	);
}
