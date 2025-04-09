import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Badge,
  Button,
  Container,
  Dropdown,
  Pagination,
} from "react-bootstrap";
import { FaLinkedin, FaGithub, FaSort, FaFilter } from "react-icons/fa";

interface Candidate {
  fullName: string;
  jobPosition: string;
  email: string;
  linkedInURL: string;
  githubURL: string;
  experienceLevel: string;
  techStacks: string[];
}

export default function DisplayBoard() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");
  const [filterRole, setFilterRole] = useState<string>("");
  const [filterExperience, setFilterExperience] = useState<string>("");
  const [filterTechStack, setFilterTechStack] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const candidatesPerPage = 10;

  useEffect(() => {
    const savedData = localStorage.getItem("candidateFormData");
    if (savedData) {
      setCandidates(JSON.parse(savedData));
    }
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [filterRole, filterExperience, filterTechStack]);

  const processedCandidates = useMemo(() => {
    const filtered = candidates.filter((candidate) => {
      const isRoleMatch = filterRole
        ? candidate.jobPosition.includes(filterRole)
        : true;
      const isExperienceMatch = filterExperience
        ? candidate.experienceLevel === filterExperience
        : true;
      const isTechStackMatch = filterTechStack
        ? candidate.techStacks.some((stack) => stack.includes(filterTechStack))
        : true;

      return isRoleMatch && isExperienceMatch && isTechStackMatch;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.fullName.localeCompare(b.fullName);
      } else {
        const experienceLevels = ["Junior", "Mid", "Senior"];
        return (
          experienceLevels.indexOf(a.experienceLevel) -
          experienceLevels.indexOf(b.experienceLevel)
        );
      }
    });
  }, [candidates, sortBy, filterRole, filterExperience, filterTechStack]);

  const totalPages = Math.ceil(processedCandidates.length / candidatesPerPage);
  const paginatedCandidates = useMemo(() => {
    const startIndex = (currentPage - 1) * candidatesPerPage;
    return processedCandidates.slice(
      startIndex,
      startIndex + candidatesPerPage
    );
  }, [processedCandidates, currentPage]);
  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    items.push(
      <Pagination.Item
        key="first"
        active={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        1
      </Pagination.Item>
    );

    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);
    if (currentPage <= Math.floor(maxVisiblePages / 2) + 1) {
      endPage = Math.min(totalPages - 1, maxVisiblePages - 1);
    }

    if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 2);
    }
    if (startPage > 2) {
      items.push(<Pagination.Ellipsis key="ellipsis1" disabled />);
    }
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    if (endPage < totalPages - 1) {
      items.push(<Pagination.Ellipsis key="ellipsis2" disabled />);
    }
    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key="last"
          active={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  const roleOptions = useMemo(() => {
    const roles = candidates.map((candidate) => candidate.jobPosition);
    return [...new Set(roles)];
  }, [candidates]);

  const techStackOptions = useMemo(() => {
    const allTechStacks = candidates.flatMap(
      (candidate) => candidate.techStacks
    );
    return [...new Set(allTechStacks)];
  }, [candidates]);

  const resetFilters = () => {
    setFilterRole("");
    setFilterExperience("");
    setFilterTechStack("");
    setCurrentPage(1);
  };

  if (candidates.length === 0) {
    return (
      <p className="text-center mt-5">No candidates found in localStorage.</p>
    );
  }

  const getActiveFilters = () => {
    const filters = [];
    if (filterRole) filters.push(`Role: ${filterRole}`);
    if (filterExperience) filters.push(`Experience: ${filterExperience}`);
    if (filterTechStack) filters.push(`Tech: ${filterTechStack}`);

    return filters;
  };

  const activeFilters = getActiveFilters();

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col xs={12} sm={6} className="mb-2 mb-sm-0">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" className="w-100">
              <FaSort className="me-2" /> Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => setSortBy("name")}
                active={sortBy === "name"}
              >
                Name
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setSortBy("experience")}
                active={sortBy === "experience"}
              >
                Experience Level
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col xs={12} sm={6}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" className="w-100">
              <FaFilter className="me-2" /> Filter Options
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Header>Role</Dropdown.Header>
              <Dropdown.Item
                onClick={() => setFilterRole("")}
                active={filterRole === ""}
                className="bg-secondary"
              >
                All Roles
              </Dropdown.Item>
              {roleOptions.map((role, index) => (
                <Dropdown.Item
                  key={`role-${index}`}
                  onClick={() => setFilterRole(role)}
                  active={filterRole === role}
                >
                  {role}
                </Dropdown.Item>
              ))}

              <Dropdown.Divider />
              <Dropdown.Header>Experience Level</Dropdown.Header>
              <Dropdown.Item
                onClick={() => setFilterExperience("")}
                active={filterExperience === ""}
                className="bg-secondary"
              >
                All Levels
              </Dropdown.Item>
              {["Junior", "Mid", "Senior"].map((level) => (
                <Dropdown.Item
                  key={level}
                  onClick={() => setFilterExperience(level)}
                  active={filterExperience === level}
                >
                  {level}
                </Dropdown.Item>
              ))}

              <Dropdown.Divider />
              <Dropdown.Header>Tech Stack</Dropdown.Header>
              <Dropdown.Item
                onClick={() => setFilterTechStack("")}
                active={filterTechStack === ""}
                className="bg-secondary"
              >
                All Tech Stacks
              </Dropdown.Item>
              {techStackOptions.map((stack, index) => (
                <Dropdown.Item
                  key={`tech-${index}`}
                  onClick={() => setFilterTechStack(stack)}
                  active={filterTechStack === stack}
                >
                  {stack}
                </Dropdown.Item>
              ))}

              {activeFilters.length > 0 && (
                <>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={resetFilters} className="text-danger">
                    Reset All Filters
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {activeFilters.length > 0 && (
        <Row className="mb-3">
          <Col>
            {activeFilters.map((filter, index) => (
              <Badge bg="info" className="me-2 mb-2" key={index}>
                {filter}
              </Badge>
            ))}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={resetFilters}
              className="mb-2"
            >
              Clear All
            </Button>
          </Col>
        </Row>
      )}
      <Row>
        {paginatedCandidates.map((candidate: Candidate, index: number) => (
          <Col key={index} xs={12} sm={6} md={4}>
            <Card className="mb-4 shadow-sm h-100">
              <Card.Body>
                <Card.Title>{candidate.fullName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {candidate.jobPosition}
                </Card.Subtitle>

                <div className="d-flex mb-3">
                  <Button
                    variant="link"
                    href={candidate.linkedInURL}
                    target="_blank"
                    className="text-secondary me-2 p-1"
                  >
                    <FaLinkedin />
                  </Button>
                  <Button
                    variant="link"
                    href={candidate.githubURL}
                    target="_blank"
                    className="text-dark p-1"
                  >
                    <FaGithub />
                  </Button>
                </div>

                <Badge bg="secondary" className="mb-3">
                  {candidate.experienceLevel}
                </Badge>

                <div className="mb-3">
                  {candidate.techStacks.map((stack, stackIndex) => (
                    <Badge
                      key={stackIndex}
                      bg="secondary"
                      className="me-2 mb-2"
                    >
                      {stack}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <Row className="mt-4 mb-5">
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              />

              {getPaginationItems()}

              <Pagination.Next
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      )}
      <Row className="mb-5">
        <Col className="text-center text-muted">
          {processedCandidates.length > 0 ? (
            <>
              Showing {(currentPage - 1) * candidatesPerPage + 1} to{" "}
              {Math.min(
                currentPage * candidatesPerPage,
                processedCandidates.length
              )}{" "}
              of {processedCandidates.length} candidates
            </>
          ) : (
            <>No candidates match your filter criteria</>
          )}
        </Col>
      </Row>
    </Container>
  );
}
