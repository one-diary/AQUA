import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import LoginIcon from "../../svg/LoginIcon";
import UsernameIcon from "../../svg/UsernameIcon";
import UserContext from "../../contexts/User/UserContext";

const Wrapper = styled.section`
	display: flex;
	justify-content: center;
	min-height: 100vh;
	background-color: #ff9d00;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%23ff9d00' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23fd8b19' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23f97927' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23f26832' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23ea583a' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23df4842' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23d33948' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23c42c4d' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23b52051' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23a41654' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23920f55' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%237f0c55' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%236c0b54' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23590b51' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23450b4c' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23310b46' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%231d0a3e' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%230a0236' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
	background-attachment: fixed;
	background-size: cover;
`;

const Container = styled.div`
	font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI",
		Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
		"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
		"Noto Color Emoji";
	background: white;
	min-height: 100vh;
	width: 75%;
	font-weight: 500;
	letter-spacing: -0.5px;
	@media (max-width: 1224px) {
		width: 100%;
	}
`;

const Heading = styled.h1`
	flex: 1;
	font-size: 2.75em !important;
	color: black;
	font-weight: 400;
	@media (max-width: 1224px) {
		text-align: center;
	}
`;

const BrandHeading = styled(Heading)`
	font-size: 1.5em !important;
	font-weight: 700;
	margin-right: auto;
	margin: 0 2rem;
	@media (max-width: 1224px) {
		flex: none;
		margin: 0 auto 0 2rem;
	}
`;

const StyledLink = styled.a`
	cursor: pointer;
	cursor: pointer;
	color: #505256;
	transition: all 0.3s ease-in-out;
	&:hover {
		text-decoration: none;
		color: black;
	}
`;

const StyledBrandLink = styled(StyledLink)`
	color: black;
`;

const LinkContainer = styled.div`
	padding: 0.5rem 1rem;
	border-radius: 8px;
	line-height: 24px;
	margin: 1rem 0.5rem;
	transition: all 0.3s ease-in-out;
	cursor: pointer;
	&:hover {
		background: #f1f2f4;
	}
	&:active,
	&:focus {
		background: #e1e4e8;
		color: black;
	}
`;

const Navbar = styled.nav`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	position: fixed;
	top: 0;
	width: inherit;
	background: white;
`;

const Button = styled.button`
	border-radius: 8px;
	padding: 0.75rem 2rem;
	font-weight: 500;
	transition: all 0.3s ease-in-out;
	margin: 4rem 0 0;
	user-select: none;
`;

const MainContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	height: 100%;
`;

const SectionOne = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	width: 100%;
	height: 90%;
`;

const PrimaryButton = styled(Button)`
	background: #eef7ff;
	border: none;
	color: #0284fe;
	border-radius: 1000rem;
	height: 3rem;
	width: 100%;
	margin: 2rem 0 auto;
	&:hover {
		background: #dceeff;
	}
	@media (max-width: 1224px) {
		margin: 2rem 1rem 1rem;
		width: 50vw;
		padding: 0.75rem 1.25rem;
	}
`;

const Card = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: column;
	min-width: 50%;
	padding: 2rem 2rem;
	border: 1px solid #f7f8f9;
	border-radius: 12px;
	box-shadow: 0 0 1px 0 rgb(8 11 14 / 6%), 0 16px 16px -1px rgb(8 11 14 / 10%);
	margin: 1rem 1rem 0;
`;

const CardsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	min-width: 75%;
	height: 90%;
	margin: 2rem auto;
	@media (max-width: 1224px) {
		flex-direction: column;
	}
`;

const CardHeader = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	font-size: 1.4rem;
	width: 100%;
	white-space: pre;
`;

const Text = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1rem 0 0;
	font-size: 1.5rem;
`;

const CardBody = styled.div`
	flex: 1;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	font-size: 1rem;
	-webkit-font-smoothing: antialiased;
	font-weight: 400;
	letter-spacing: -0.25px;
	color: #505256;
	text-align: left;
	padding: 0 0 2rem;
	width: 100%;
`;

const Subtext = styled(Text)`
	display: flex;
	font-size: 1.2rem;
	-webkit-font-smoothing: antialiased;
	font-weight: 400;
	letter-spacing: -0.25px;
	color: #505256;
	text-align: left;
	padding: 0 0 0.5rem;
	color: #a7aab0;
	margin: 0;
`;

const Input = styled.input`
	border-radius: 1000rem;
	padding: 1px 2rem 1px 1rem;
	margin: 0.5rem 0;
	line-height: 1.5rem;
	width: 100%;
	height: 2.5rem;
	border: 1px solid #e1e4e8;
	transition: all 0.3s ease-in-out;
	color: #a7aab0;
	&::placeholder {
		font-weight: 600;
		color: #a7aab0;
	}
	&:focus,
	&:active,
	&:hover {
		outline: none;
	}
	&:focus {
		border: 1px solid #3799f6;
	}
`;

const InputContainer = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const DataContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const NameText = styled(Text)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 2.5rem;
	font-weight: 800;
`;

const DetailsContainer = styled.div`
	width: 40%;
`;

const Homepage = () => {
	const { token, user } = useContext(UserContext);
	const { name, email, _id } = user;
	const history = useHistory();

	const [data, setData] = useState({
		localid: "",
		localemail: "",
		localname: "",
	});

	return (
		<Wrapper>
			<Container>
				<Navbar>
					<BrandHeading>
						<StyledBrandLink onClick={() => history.push("/")}>
							aqua
						</StyledBrandLink>
					</BrandHeading>
					{token ? (
						<>
							<LinkContainer>
								<StyledLink
									to={`/${
										user.type === "teacher"
											? `teacher`
											: `student`
									}`}>
									Dashboard
								</StyledLink>
							</LinkContainer>
							<LinkContainer>
								<StyledLink to="/profile">Profile</StyledLink>
							</LinkContainer>
						</>
					) : (
						<>
							<LinkContainer>
								<StyledLink to="/login">Login</StyledLink>
							</LinkContainer>
							<LinkContainer>
								<StyledLink
									onClick={() => history.push("/signup")}>
									Signup
								</StyledLink>
							</LinkContainer>
						</>
					)}
				</Navbar>
				<MainContent>
					<SectionOne>
						<CardsContainer>
							<Card>
								<CardHeader>
									<NameText>
										<LoginIcon style={{ zoom: "200%" }} />
										{name}
									</NameText>
									<Subtext>{email}</Subtext>
									<DataContainer>
										<Text>
											<b>Registration Id: </b>
											{_id}
										</Text>
										{/* <Text>
											<b>Blood Group: </b>{data.bloodGroup}
										</Text>
										<Text>
											<b>Address: </b>{data.address}
										</Text>
										<Text>
											<b>Contact: </b>{data.phoneNumber}
										</Text> */}
									</DataContainer>
								</CardHeader>
								<CardBody>
									<div></div>
								</CardBody>
							</Card>
							<DetailsContainer>
								<InputContainer>
									<UsernameIcon />
									<Input
										type="text"
										placeholder="Email"
										onChange={(e) => {
											setData({
												...data,
												localemail: e.target.value,
											});
										}}
									/>
								</InputContainer>
								<InputContainer>
									<UsernameIcon />
									<Input
										type="text"
										placeholder="Full Name"
										onChange={(e) => {
											setData({
												...data,
												localname: e.target.value,
											});
										}}
									/>
								</InputContainer>
								<InputContainer>
									<UsernameIcon />
									<Input
										type="text"
										placeholder="Phone Number"
										onChange={(e) => {
											setData({
												...data,
												localid: e.target.value,
											});
										}}
									/>
								</InputContainer>

								<PrimaryButton>Save</PrimaryButton>
							</DetailsContainer>
						</CardsContainer>
					</SectionOne>
				</MainContent>
			</Container>
		</Wrapper>
	);
};

export default Homepage;
