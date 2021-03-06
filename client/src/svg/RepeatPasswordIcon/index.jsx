import SVGContainer from "../SVGContainer";
import styled from "styled-components";

const StyledSVGContainer = styled(SVGContainer)`
	position:absolute;
	width:100$;
`
const index = () => {
	return (
		<StyledSVGContainer>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 16 16"
			>
				<path
					fill="#A7AAB0"
					fill-rule="evenodd"
					d="M6,6 L10,6 L10,4 C10,2.8954305 9.1045695,2 8,2 C6.8954305,2 6,2.8954305 6,4 L6,6 Z M12,6 C13.0683513,6 14,6.77637389 14,7.83333333 L14,14.1666667 C14,15.2236261 13.0683513,16 12,16 L4,16 C2.93164867,16 2,15.2236261 2,14.1666667 L2,7.83333333 C2,6.77637389 2.93164867,6 4,6 L4,4 C4,1.790861 5.790861,0 8,0 C10.209139,0 12,1.790861 12,4 L12,6 Z M4,8 L4,14 L12,14 L12,8 L4,8 Z M8,12 C7.44771525,12 7,11.5522847 7,11 C7,10.4477153 7.44771525,10 8,10 C8.55228475,10 9,10.4477153 9,11 C9,11.5522847 8.55228475,12 8,12 Z"
				/>
			</svg>
		</StyledSVGContainer>
	)
}

export default index
