import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

interface FormData {
  fullName: string;
  jobPosition: string;
  email: string;
  linkedInURL: string;
  githubURL: string;
  experienceLevel: string;
  techStacks: string[];
}

export default function CandidateForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    jobPosition: "",
    email: "",
    linkedInURL: "",
    githubURL: "",
    experienceLevel: "",
    techStacks: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prevData) => {
      const selectedTechStacks = [...prevData.techStacks];
      const index = selectedTechStacks.indexOf(value);
      if (index === -1) {
        selectedTechStacks.push(value);
      } else {
        selectedTechStacks.splice(index, 1);
      }
      return { ...prevData, [name]: selectedTechStacks };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const savedData = localStorage.getItem("candidateFormData");
    const candidates: FormData[] = savedData ? JSON.parse(savedData) : [];

    const isDuplicate = candidates.some(
      (candidate) =>
        candidate.fullName === formData.fullName &&
        candidate.email === formData.email
    );

    if (isDuplicate) {
      alert("This candidate's details have already been submitted.");
      return;
    }

    candidates.push(formData);
    localStorage.setItem("candidateFormData", JSON.stringify(candidates));

    alert("Form submitted successfully!");
    console.log("Form submitted:", formData);

    setFormData({
      fullName: "",
      jobPosition: "",
      email: "",
      linkedInURL: "",
      githubURL: "",
      experienceLevel: "",
      techStacks: [],
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Candidate Information Form</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formJobPosition">
              <Form.Label>Job Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job position"
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formLinkedInURL">
              <Form.Label>LinkedIn URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter LinkedIn URL"
                name="linkedInURL"
                value={formData.linkedInURL}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formGithubURL">
              <Form.Label>GitHub URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter GitHub URL"
                name="githubURL"
                value={formData.githubURL}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formExperienceLevel">
              <Form.Label>Experience Level</Form.Label>
              <DropdownButton
                variant="secondary"
                title={formData.experienceLevel || "Select Experience Level"}
                onSelect={(value: string | null) =>
                  value && handleDropdownChange("experienceLevel", value)
                }
              >
                <Dropdown.Item eventKey="Entry Level">
                  Entry Level
                </Dropdown.Item>
                <Dropdown.Item eventKey="Mid Level">Mid Level</Dropdown.Item>
                <Dropdown.Item eventKey="Senior Level">
                  Senior Level
                </Dropdown.Item>
              </DropdownButton>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formTechStacks">
              <Form.Label>Tech Stacks</Form.Label>
              <DropdownButton
                variant="secondary"
                title={
                  formData.techStacks.length > 0
                    ? formData.techStacks.join(", ")
                    : "Select Tech Stacks"
                }
                onSelect={(value: string | null) =>
                  value && handleDropdownChange("techStacks", value)
                }
              >
                <Dropdown.Item eventKey="JavaScript">JavaScript</Dropdown.Item>
                <Dropdown.Item eventKey="Python">Python</Dropdown.Item>
                <Dropdown.Item eventKey="Java">Java</Dropdown.Item>
                <Dropdown.Item eventKey="React">React</Dropdown.Item>
                <Dropdown.Item eventKey="Node.js">Node.js</Dropdown.Item>
                <Dropdown.Item eventKey="CSS">CSS</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="secondary"
          type="submit"
          className="w-100 w-md-50 mt-5"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
