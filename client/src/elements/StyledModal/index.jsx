import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";


const StyledModal = (props) => {
	return (
		<>
			<Modal show={props.show} onHide={props.handleClose} scrollable>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={props.handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default StyledModal