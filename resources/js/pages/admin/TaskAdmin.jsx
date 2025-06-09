import React from "react";
import { Table, Card, Badge } from "react-bootstrap";
import {
    BsClipboardCheck,
    BsExclamationCircle,
    BsCheckCircle,
    BsClock,
} from "react-icons/bs";

export default function TaskAdmin() {
    return (
        <div className="p-4">
            <Card className="shadow border-0 rounded-4">
                <Card.Body>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <h4 className="fw-bold d-flex align-items-center gap-2">
                                <BsClipboardCheck className="text-primary" /> My
                                Task
                            </h4>
                            <p className="text-muted mb-0">
                                View and manage all your task progress
                            </p>
                        </div>
                    </div>

                    <div className="table-responsive rounded-3 overflow-hidden">
                        <Table bordered hover className="mb-0 align-middle">
                            <thead className="bg-secondary text-white text-center">
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center"></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    {/* <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick= ""
                                        >
                                            Edit Role
                                        </Button>
                                    </td> */}
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
