import hrServices from "../../components/Hr/ServicesData";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Services() {
  return (
    <div className="services-section py-5">
      <Container>
        <h2 className="section-title text-center mb-5">Our Services</h2>
        <Row>
          {hrServices.map((service, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              lg={4}
              className="mb-4 d-flex align-items-stretch"
            >
              <Card className="service-card w-100 h-100 border-0 shadow">
                <div className="service-img-wrapper overflow-hidden position-relative">
                  <Card.Img
                    variant="top"
                    src={service.image}
                    className="service-img"
                  />
                  <div className="overlay d-flex align-items-center justify-content-center">
                    <Card.Text className="service-description p-4">
                      {service.description}
                    </Card.Text>
                  </div>
                </div>
                <Card.Body className="text-center">
                  <Card.Title className="service-title">
                    {service.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
