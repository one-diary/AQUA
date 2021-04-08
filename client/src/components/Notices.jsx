import React from "react"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styled from "styled-components";

const Notice = styled.div`
flex:1 1 30%;
font-size: 1rem;
font-weight:bold;
width:90%;
background: white;
margin:  2rem;
padding: 2rem;
border-radius: 10px;
box-shadow:  9px 9px 23px #e3e7ec,
			-9px -9px 23px #e3e7ec;
display: flex;
flex-direction: column;
justify-content: space-between;
cursor:pointer;
user-select:none;
transition: all 0.2s ease;
&:active{
	box-shadow:  9px 9px 23px #ebeef2,
				-9px -9px 23px #ebeef2;
}
`

const NoticeTitle = styled.div`
font-size: 2rem;
overflow:hidden;
`

const NoticeContent = styled.div`
display: inline-block;
font-weight:normal;
margin: 1rem 0;
`

const NoticeAuthor = styled.div`
display:flex;
align-items:center;
color: gray;
`

const NoticeAuthorText = styled.div`
padding: 0.5rem;
`

const Notices = ({notices,students}) => {

const truncate = (text) => {
	if(text.length>140){
		return `${text.substring(0, 140)}...`
	}
	else{
		return text;
	}
}
    return (
        <>
            {notices.map((item,index) => (
				<Notice key={index}>
					<NoticeTitle>
						{item.title}
					</NoticeTitle>
					<NoticeContent onClick={e => {
						(e.target.innerText.length === 143)
							? (e.target.innerText = item.description)
							: (e.target.innerText = truncate(e.target.innerText))
					}}>
						{truncate(item.description)}
					</NoticeContent>
					{students ? (
						<NoticeAuthor>
							<AccountCircleIcon />
							<NoticeAuthorText>{item.givenBy.name}</NoticeAuthorText>
						</NoticeAuthor>	
					) : null}
					
				</Notice>
			))
			}
        </>
    )
}

export default Notices;