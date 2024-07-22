import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
  } from "reactstrap";

export default function CustomModal({ showModal, setShowModal, activeTask, setActiveTask, setTasks, onSave }) {

    function handleChange(e) {
      let {name, value} = e.target;
      if (e.target.type === "checkbox") {
        value = e.target.checked;
      }
  
      activeTask = {...activeTask, [name]: value};
      setActiveTask(activeTask);
    }
  
    return (
      <Modal isOpen={true} toggle={showModal}>
          <ModalHeader toggle={showModal}>Todo Item</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="todo-title">Title</Label>
                <Input
                  type="text"
                  id="todo-title"
                  name="title"
                  value={activeTask.title}
                  onChange={handleChange}
                  placeholder="Enter Todo Title"
                />
              </FormGroup>
              <FormGroup>
                <Label for="todo-description">Description</Label>
                <Input
                  type="text"
                  id="todo-description"
                  name="description"
                  value={activeTask.description}
                  onChange={handleChange}
                  placeholder="Enter Todo description"
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="completed"
                    checked={activeTask.completed}
                    onChange={handleChange}
                  />
                  Completed
                </Label>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter class="justify-content-between">
            <Button type="button" 
                    class="btn btn-secondary d-flex" 
                    onClick={()=>setShowModal(!showModal)}
            >
              Close
            </Button>
  
            <Button
              color="success"
              onClick={() => onSave(activeTask)}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
    );
  }