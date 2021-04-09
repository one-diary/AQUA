import React, { useContext, useState } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import PublishIcon from "@material-ui/icons/Publish";
import Axios from "axios";
import UserContext from "../../../contexts/User/UserContext";

const Heading = styled.h1`
	font-size: 1.5rem !important;
	font-weight: 900;
	margin: 2rem 0 1rem 0;
	color: #41454a;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	overflow: auto;
	&::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: inherit;
	}

	&::-webkit-scrollbar {
		width: 6px;
		background-color: inherit;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		// background-color: #9295a0;
		background-color: #c3c3c3;
	}

	@media (max-width: 1224px) {
		padding: 0 1.5rem;
	}

	.dropzone {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px dashed #65d862;
		padding: 2rem;
		margin: 2rem;
		width: 90%;
		height: 40%;
		border-radius: 20px;
		background: #f3faf3;
		outline: none;
		cursor: pointer;
		box-shadow: 9px 9px 23px #e3e7ec, -9px -9px 23px #e3e7ec;
		@media (max-width: 1224px) {
			height: 20%;
		}
	}
`;

const DropzoneText = styled.p`
	margin-bottom: 0;
	padding: 0 2rem;
	color: gray;
	font-size: 1.25rem;
	font-weight: 700;
`;

const SelectedText = styled.p`
	margin-bottom: 0;
	font-size: 1rem;
	font-weight: 700;
	color: silver;
`;

const UploadButton = styled.button`
	display: flex;
	align-items: center;
	margin: 0 0 2rem 0;
	padding: 1rem 1.75rem;
	border-radius: 20px;
	border: 3px solid #f4aa1f;
	background: #fdfaf2;
	text-transform: uppercase;
	font-size: 1rem;
	font-weight: 700;
	color: #f4aa1f;
`;
const DropzoneLabel = styled.span`
	font-size: 1.25rem;
	font-weight: 700;
`;

const StyledPublishIcon = styled(PublishIcon)`
	margin: 0 0.5rem 0 0;
`;

const TextInput = styled.input`
	padding: 0.75rem 1rem;
	border-radius: 10px;
	border: 3px solid #249bd4;
	background: #def7ff;
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: #41454a;
	width: 60%;
	&:focus {
		outline: none !important;
	}
`;

const TextInputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 40%;
	margin: 0.5rem;
	@media (max-width: 1224px) {
		width: 100%;
	}
`;

const TextLabel = styled.label`
	padding: 0 1rem 0 0;
	font-size: 1.25rem;
	font-weight: 700;
	color: #41454a;
	margin-bottom: 0;
`;

const TextWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	margin: 1rem 0 0 0;
`;

const Upload = () => {
	const apiUrl = process.env.REACT_APP_API_URL;
	const nodeApiUrl = process.env.REACT_APP_NODE_API_URL;
	const { token } = useContext(UserContext);

	const [files, setFiles] = useState(null);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [deadline, setDeadline] = useState("");
	const [loading,setLoading] = useState(false);

	const getResults = () => {
		if (files) {
			const fData = new FormData();
			fData.append("subject", title);
			fData.append("doc", files[0]);
			console.log(files[0], "file");

			setLoading(true);

			var config = {
				method: "post",
				url: `${apiUrl}/assignment/upload/question`,
				data: fData,
			};

			Axios(config)
				.then((res) => {
					// console.log(res.data.url, "ok");
					Axios.post(
						`${nodeApiUrl}/teacher/uploadAssignment`,
						{
							title,
							description: desc,
							assignmentGiven: res.data.url,
							deadline,
						},
						{
							headers: {
								Authorization: "Bearer " + token,
							},
						}
					)
						.then((res) => {
							// console.log(res.data);
							setLoading(false);
							window.alert(res.data.message);
						})
						.catch((err) => {
							setLoading(false);
							window.alert("Network error, please try again");
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			// console.log("No formdata");
			window.alert("Please choose a file");
		}
	};

	return (
		<Container>
			<Heading>Upload your assignments here</Heading>
			<TextWrapper>
				<TextInputContainer>
					<TextLabel>Title</TextLabel>
					<TextInput
						type="text"
						value={title}
						onChange={(e) => {
							e.preventDefault();
							setTitle(e.target.value);
						}}
					/>
				</TextInputContainer>
				<TextInputContainer>
					<TextLabel>Description</TextLabel>
					<TextInput
						type="text"
						value={desc}
						onChange={(e) => {
							e.preventDefault();
							setDesc(e.target.value);
						}}
					/>
				</TextInputContainer>
				<TextInputContainer>
					<TextLabel>Deadline</TextLabel>
					<TextInput
						type="date"
						value={deadline}
						onChange={(e) => {
							e.preventDefault();
							setDeadline(e.target.value);
						}}
					/>
				</TextInputContainer>
			</TextWrapper>
			<Dropzone
				onDrop={(files) => {
					setFiles(files);
				}}
				maxSize={30720000}>
				{({
					getRootProps,
					getInputProps,
					isDragActive,
					isDragAccept,
					isDragReject,
				}) => {
					const additionalClass = isDragAccept
						? "accept"
						: isDragReject
						? "reject"
						: "";

					return (
						<div
							{...getRootProps({
								className: `dropzone ${additionalClass}`,
							})}>
							<input {...getInputProps()} />
							<DropzoneLabel>
								{isDragActive ? "📂" : "📁"}
							</DropzoneLabel>
							<DropzoneText>
								{isDragActive
									? `Drop your files here`
									: `Drag & drop or click to select files`}
							</DropzoneText>
						</div>
					);
				}}
			</Dropzone>
			{files && (
				<SelectedText>
					Selected File : {files[files.length - 1].name}
				</SelectedText>
			)}
			<UploadButton onClick={() => getResults()}>
				<StyledPublishIcon />
				{loading ? "Uploading assignment" : "Upload"}
			</UploadButton>
		</Container>
	);
};

export default Upload;
