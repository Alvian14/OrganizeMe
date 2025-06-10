import { useEffect, useState } from "react";
import {
  Table,
  Card,
  Button,
  Modal,
  Form,
  Badge,
  Image,
} from "react-bootstrap";
import { deleteUser, getUser, updateUserRole } from "../../_services/auth";

export default function UsersPageAdmin() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUser();
        setUsers(usersData);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus data?");
    if (confirmDelete) {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await updateUserRole(selectedUser.id, { role: newRole });
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
      setShowModal(false);
    } catch (error) {
      console.error("Gagal mengupdate role:", error);
    }
  };

  return (
    <div className="p-4">
      <Card className="shadow border-0 rounded-4">
        <Card.Body>
          <h4 className="fw-bold border-bottom pb-3 mb-4 d-flex align-items-center gap-2">
            👥 User List
          </h4>

          <div className="table-responsive rounded-3 overflow-hidden">
            <Table hover bordered className="mb-0 align-middle">
              <thead className="bg-primary text-white text-center">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={user.image || "/default-avatar.png"}
                        alt="User"
                        width={40}
                        height={40}
                        roundedCircle
                      />
                    </td>
                    <td className="text-capitalize">{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <Badge bg={user.role === "admin" ? "danger" : "secondary"}>
                        {user.role}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="me-2 rounded-pill"
                        onClick={() => handleEdit(user)}
                      >
                        Edit Role
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="rounded-pill"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Modal Edit Role */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select New Role</Form.Label>
            <Form.Select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
