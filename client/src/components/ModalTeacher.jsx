import React,{useEffect, useState} from "react"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"
import AssignmentCard from "./AssignmentCard";
import ModalBodyStudent from "./ModalBodyStudent";

const ModalTeacher = ({openModal,toggleModal,students,info,assignmentsSubmitted}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        toggleModal();
        setShow(false);
    }
    
    useEffect(() => {
        if(openModal) {
            setShow(true);
        }
    },[openModal])
    
    return (

        <Modal show={show} onHide={handleClose} scrollable>
            {
                !students ?  (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title md="auto">Assignments by students</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AssignmentCard assignments={assignmentsSubmitted} submissions={true} students={true} modal={true}/>
                            </Modal.Body>
                        </>
                ) : (
						<>
							<Modal.Header closeButton>
								<Modal.Title md="auto">Upload Assignment</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<ModalBodyStudent {...info}/>
							</Modal.Body>
						</>
                )
            }
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
        </Modal>
    )
}

export default ModalTeacher;