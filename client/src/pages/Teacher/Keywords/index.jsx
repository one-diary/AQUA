import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import BackButton from "@material-ui/icons/ArrowBackIos";
import PaperIcon from "@material-ui/icons/Description";
import PersonIcon from "@material-ui/icons/AssignmentInd";
import Axios from "axios";
import UserContext from "../../../contexts/User/UserContext";

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
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: column;
	text-transform: capitalize;
	width: 100%;
	height: 100%;
	margin: 2rem 0;
	@media (max-width: 1224px) {
		flex-direction: column;
	}
`;

const InputLabel = styled.h1`
	color: #41454a;
	font-size: 1.5rem !important;
	font-weight: 700;
`;

const TextInput = styled.input`
	padding: 0.75rem 1rem;
	margin: 1rem 2rem 1rem 2rem;
	border-radius: 10px;
	border: 3px solid #249bd4;
	background: #def7ff;
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: #41454a;
`;

const SubmitBtn = styled.button`
	display: flex;
	align-items: center;
	padding: 0.75rem 1rem;
	border-radius: 10px;
	border: 3px solid #f4aa1f;
	background: #fdfaf2;
	text-transform: uppercase;
	font-size: 1rem;
	font-weight: 700;
	color: #f4aa1f;
	outline: none;
`;

const CloseButton = styled.button`
	display: flex;
	align-items: center;
	padding: 0.75rem 1rem;
	border-radius: 10px;
	border: 3px solid #e53935;
	background: #ffcdd2;
	text-transform: uppercase;
	font-size: 1rem;
	font-weight: 700;
	color: #e53935;
	outline: none;
`;

const AddButton = styled.button`
	display: flex;
	align-items: center;
	padding: 0.75rem 1rem;
	border-radius: 10px;
	border: 3px solid #00c853;
	background: #b9f6ca;
	text-transform: uppercase;
	font-size: 1rem;
	font-weight: 700;
	color: #00c853;
	left: 5vw;
	position: relative;
	outline: none;
`;

const StyledFileCopyIcon = styled(FileCopyIcon)`
	margin: 0 0.5rem 0 0;
`;

const BackButtonIcon = styled(BackButton)`
	margin : 2rem 0 0 2rem;
`

const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const InputGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`;

const AssignmentsContainer = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const Heading = styled.h1`
	flex: 1;
	font-size: 1.5rem !important;
	font-weight: 900;
	margin: 2rem 0 0 2rem;
	color: #41454a;
`;

const Card = styled.div`
	flex: 1 1 0;
	font-size: 1rem;
	font-weight: bold;
	min-width: 30vw;
	width: 90%;
	background: white;
	margin: 2rem;
	padding: 2rem;
	border-radius: 10px;
	user-select: none;
	box-shadow: 9px 9px 23px #e3e7ec, -9px -9px 23px #e3e7ec;
	display: flex;
	flex-direction: column;
	@media (max-width: 1224px) {
		max-width: 80vw;
	}
`;
const CardTitleContainer = styled.div`
	display: flex;
	align-items: center;
	border-radius: 10px 10px 0 0;
	color: #249bd4;
	background: #def7ff;
	padding: 0 1rem;
`;

const CardTitle = styled.div`
	margin: 1rem 0rem;
	font-weight: normal;
	padding: 0 1vw;
	transition: all 0.2s ease;
`;

const Keyword = styled.span`
	margin-left:1vw;
`;

const Group = styled.div`
	display: flex;
	margin-left:1vw;
	align-items: center;
	justify-content: center;
`;

const KeywordsContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0.75rem 1rem;
	border-radius: ${(props) =>
		!props.noBorderRadius ? `0 0 10px 10px ` : `none`};
	overflow: hidden;
	${(props) => {
		if (props.theme !== "primary") {
			return `
				color: #fc1703;
				background: #FFF3E8;
			`;
		} else {
			return `
				color: #65D862;
				background: #EEFFED;
			`;
		}
	}}
`;

const Flexbreak = styled.div`
	flex-basis: 100%;
	height: 0;
`;
const Content = styled.div`
	color: lightgray;
`;

const Select = styled.select`
	padding: 0.75rem 1rem;
	margin: 2rem;
	border-radius: 10px;
	border: 3px solid #249bd4;
	background: #def7ff;
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: #41454a;
`;

const Option = styled.option`
	padding: 0.75rem 1rem;
	margin: 2rem;
	background: white;
	outline: none;
	font-size: 1rem;
	font-weight: 700;
	color: #41454a;
	outline: none;
	border: 0px;
`;

const Keywords = () => {
	const [result, setResult] = useState([]);
	const [options, setOptions] = useState(null);
	const [selectedValue, setSelectedValue] = useState("");
	const [fields, setFields] = useState([{ value: null }]);
	const [loading, setLoading] = useState(false);
	const [fetching,setFetching] = useState(false);

	const handleChange = (i, event) => {
		const values = [...fields];
		values[i].value = event.target.value;
		setFields(values);
	};

	const handleAdd = () => {
		const values = [...fields];
		values.push({ value: null });
		setFields(values);
	};

	const handleRemove = (i) => {
		const values = [...fields];
		values.splice(i, 1);
		setFields(values);
	};

	const getResults = (e) => {
		const apiUrl = process.env.REACT_APP_FLASK_API_URL;

		setLoading(true);
		const kwords = fields.map((item) => item.value);
		const splittedSelectedValue = selectedValue.split(" ");
		Axios.post(`${apiUrl}/keywords`, {
			subject: splittedSelectedValue[0],
			topic: splittedSelectedValue[1],
			kwords,
		})
			.then((res) => {
				setLoading(false);
				console.log(res.data, "keyword data");
				setResult(res.data);
			})
			.catch((err) => {
				window.alert("Network error");
				setLoading(false);
				console.log(err);
			});
	};

	const nodeApiUrl = process.env.REACT_APP_NODE_API_URL;
	const { token } = useContext(UserContext);

	useEffect(() => {
		//Getting assignments for particular teacher
		setFetching(true);
		Axios.get(`${nodeApiUrl}teacher/getTeacher`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => {
				setFetching(false);
				setOptions(res.data.response.assignments);
			})
			.catch((err) => {
				window.alert("Error fetching assignments");
				setFetching(false);
				console.log(err, "Err");
			});
	}, [nodeApiUrl, token]);

	return (
		<Container>
			{result.length > 0 ? (
				<AssignmentsContainer>
					<Group>
						<BackButtonIcon onClick={() => setResult([])} />
						<Heading>
							Keywords Checker
						</Heading>
					</Group>
					<Flexbreak />
					{result.map((item, index) => (
						<Card key={index}>
							<CardTitleContainer>
								<PersonIcon />
								<CardTitle>{item.name}</CardTitle>
							</CardTitleContainer>
							<Content>
								<KeywordsContainer
									noBorderRadius
									theme="primary">
									<PaperIcon />
									<Group>
										Present : 
										{Object.values(item).map(
											(value, i) =>
												value === "true" && (
													<Keyword>
														{Object.keys(item)[i]}{" "}
													</Keyword>
												)
										)}
									</Group>
								</KeywordsContainer>
								<KeywordsContainer theme="warning">
									<PaperIcon />
									<Group>
										Absent : 
										{Object.values(item).map(
											(value, i) =>
												value === "false" && (
													<Keyword>
														{Object.keys(item)[i]}
													</Keyword>
												)
										)}
									</Group>
								</KeywordsContainer>
							</Content>
						</Card>
					))}
				</AssignmentsContainer>
			) : (
				<InputContainer>
					<InputWrapper>
						<InputGroup>
							<InputLabel>Enter Keywords</InputLabel>
							<AddButton onClick={() => handleAdd()}>+</AddButton>
						</InputGroup>
						{fields.map((field, idx) => {
							return (
								<InputGroup key={`${field}-${idx}`}>
									<TextInput
										type="text"
										value={field.value}
										onChange={(e) => handleChange(idx, e)}
									/>
									<CloseButton
										onClick={() => handleRemove(idx)}>
										X
									</CloseButton>
								</InputGroup>
							);
						})}
					</InputWrapper>

					<InputWrapper>
						<InputLabel>{fetching ? "Fetching Assignments" : "Select Assignment"}</InputLabel>
						<Select
							onChange={(e) => {
								setSelectedValue(e.target.value);
							}}
							value={selectedValue}>
							{options
								? options.map((item) => (
										<Option
											key={JSON.stringify(item)}
											value={`${item.title} ${
												item.assignmentGiven
													.split("/")
													.pop()
													.split(".")[0]
											}`}>
											{`${item.title} ${
												item.assignmentGiven
													.split("/")
													.pop()
													.split(".")[0]
											}`}
										</Option>
								  ))
								: ""}
						</Select>
					</InputWrapper>
					<SubmitBtn
						onClick={(e) => {
							getResults(e);
						}}>
						<StyledFileCopyIcon />
						{loading ? "Retrieving" : "Check"}
					</SubmitBtn>
				</InputContainer>
			)}
		</Container>
	);
};

export default Keywords;
