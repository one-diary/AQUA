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
					d="M2,2 L14,2 C15.1045695,2 16,2.8954305 16,4 L16,12 C16,13.1045695 15.1045695,14 14,14 L2,14 C0.8954305,14 0,13.1045695 0,12 L0,4 C0,2.8954305 0.8954305,2 2,2 Z M2,4 L2,12 L14,12 L14,4 L2,4 Z M8.00002236,7.98802764 L14,5 L14,6.89442719 L8,10 L2,7 L2,5 L8.00002236,7.98802764 Z"
				/>
			</svg>



		</StyledSVGContainer>
	)
}

export default index
