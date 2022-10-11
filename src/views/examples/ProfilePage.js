/*!

=========================================================
* BLK Design System React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel,
  CardFooter,
  ListGroupItem,
  ListGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States",
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States",
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States",
  },
];

let ps = null;

export default function ProfilePage() {
  const [tabs, setTabs] = React.useState(1);
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.toggle("profile-page");
    };
  }, []);
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="dots"
            src={require("assets/img/dots.png")}
          />
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png")}
          />
          <Container className="align-items-center">
            <Row>
              <Col lg="6" md="6">
                <h1 className="profile-title text-left">Anya Taylor-Joy</h1>
                <h5 className="text-on-back">Profile</h5>
                <p className="profile-description">
                  "Home is where the heart is" - Elvis Presley
                </p>
              </Col>
              <Col className="ml-auto mr-auto" lg="6" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/mike.jpg")}
                    />
                    <h4 className="title">Your assets</h4>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(1);
                          }}
                          href="#pablo"
                        >
                          Packages
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                          }}
                          href="#pablo"
                        >
                          Buy
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: tabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(3);
                          }}
                          href="#pablo"
                        >
                          Recent News
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent
                      className="tab-subcategories"
                      activeTab={"tab" + tabs}
                    >
                      <TabPane tabId="tab1">
                        <Table className="tablesorter" responsive>
                          <thead className="text-primary">
                            <tr>
                              <th className="header">Package</th>
                              <th className="header">Shares</th>
                              <th className="header">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>SKI</td>
                              <td>7.342</td>
                              <td>48,870.75 USD</td>
                            </tr>
                            <tr>
                              <td>BEACH</td>
                              <td>30.737</td>
                              <td>64,53.30 USD</td>
                            </tr>
                            <tr>
                              <td>FOREST</td>
                              <td>19.242</td>
                              <td>18,354.96 USD</td>
                            </tr>
                          </tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Pay to</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                placeholder="e.g. 1Nasd92348hU984353hfid"
                                type="text"
                              />
                              <FormText color="default" tag="span">
                                Please enter a valid address.
                              </FormText>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input placeholder="1.587" type="text" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <div
                          style={{
                            maxHeight: "250px",
                            overflowY: "auto",
                          }}
                        >
                          <Table
                            className="tablesorter"
                            responsive
                            bordered
                            height="250"
                          >
                            <thead className="text-primary">
                              <tr>
                                <th className="header">Package</th>
                                <th className="header">House</th>
                                <th className="header">Announcement</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>SKI</td>
                                <td>Venice str. 1, Italy</td>
                                <td>VOTE: Should we replace the main door?</td>
                              </tr>
                              <tr>
                                <td>BEACH</td>
                                <td>Cool str. 2, Miami</td>
                                <td>Someone forgot their sunglasses.</td>
                              </tr>
                              <tr>
                                <td>SKI</td>
                                <td>Innsbruck str. 3, Austria</td>
                                <td>How to turn the heater on?</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <section className="section">
          <Container className="align-items-center">
            <Row>
              <Col lg="2" md="6">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid rounded-circle"
                      src={require("assets/img/etherum.png")}
                    />
                    <UncontrolledDropdown nav style={{ listStyle: "none" }}>
                      <DropdownToggle
                        caret
                        color="default"
                        data-toggle="dropdown"
                        href="#pablo"
                        nav
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-cogs d-lg-none d-xl-none" />
                        Package: SKI
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-with-icons">
                        <DropdownItem href="https://demos.creative-tim.com/blk-design-system-react/#/documentation/overview">
                          <i className="tim-icons icon-paper" />
                          BEACH
                        </DropdownItem>
                        <DropdownItem>
                          <i className="tim-icons icon-single-02" />
                          FOREST
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </CardHeader>
                  <CardBody>
                    <Col>
                      <Row style={{ justifyContent: "center" }}>
                        <h4>
                          <a className="active" href="#">
                            <u>Discussion</u>
                          </a>
                        </h4>
                      </Row>
                      <Row style={{ justifyContent: "center" }}>
                        <a href="#">New proposal</a>
                      </Row>
                    </Col>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" lg="10" md="6">
                <Card className="card-coin card-plain">
                  <div style={{ display: "none" }}>
                    <CardHeader>
                      <h4 className="title">New proposal</h4>
                    </CardHeader>
                    <CardBody>
                      <Col lg="12" sm="6">
                        <Form>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label>Title</label>
                                <Input
                                  placeholder="Enter the title for your proposal/question."
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label>Message</label>
                                <Input
                                  placeholder="Enter your message here."
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup check>
                                <Label check>
                                  <Input type="checkbox" />
                                  <span className="form-check-sign" />
                                  Vote?
                                </Label>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Button
                            className="btn-round float-right"
                            color="primary"
                            data-placement="right"
                            id="tooltip341148792"
                            type="button"
                          >
                            Submit
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            placement="right"
                            target="tooltip341148792"
                          >
                            Can't wait for your message
                          </UncontrolledTooltip>
                        </Form>
                        <FormGroup check></FormGroup>
                      </Col>
                    </CardBody>
                  </div>

                  <div style={{ display: "block" }}>
                    <CardHeader>
                      <h4 className="title">Discussion</h4>
                    </CardHeader>
                    <div
                      style={{
                        maxHeight: "450px",
                        overflowY: "auto",
                      }}
                    >
                      <CardBody>
                        <Card className="card-coin card-plain">
                          <CardBody>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>
                                <u>User: 0x0904...9859</u>
                              </span>
                              <div>
                                <span>(8 shareholders voted)</span>
                                <Button
                                  className="btn-simple btn-round"
                                  color="success"
                                  type="button"
                                  disabled={true}
                                  style={{ marginLeft: "10px" }}
                                >
                                  Open
                                </Button>
                              </div>
                            </div>
                            <hr />
                            <h3>[VOTE]: Should we change security system?</h3>
                            <p>
                              As you may know, our security cameras are getting
                              old, perhaps we should consider an upgrade?
                            </p>
                            <hr />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "white",
                                width: "50%",
                              }}
                            >
                              <Button color="success">For</Button>
                              <Button color="danger">Against</Button>
                            </div>
                          </CardBody>
                        </Card>
                        <Card className="card-coin card-plain">
                          <CardBody>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>
                                <u>User: 0x0904...9859</u>
                              </span>
                              <div>
                                <span>(8 shareholders voted)</span>
                                <Button
                                  className="btn-simple btn-round"
                                  color="primary"
                                  type="button"
                                  disabled={true}
                                  style={{ marginLeft: "10px" }}
                                >
                                  Closed
                                </Button>
                              </div>
                            </div>
                            <hr />
                            <h3>[VOTE]: Should we replace the main door?</h3>
                            <p>
                              As you may know, there was a big accident last
                              week and big bear destroyed our front door. We
                              need to decide..
                            </p>
                            <hr />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "white",
                                width: "50%",
                              }}
                            >
                              <span>
                                <i className="tim-icons icon-check-2" />
                                <u style={{ marginLeft: "20px" }}>For</u>
                              </span>
                              <span>91%</span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                // color: "white",
                                width: "50%",
                              }}
                            >
                              <span>Against</span>
                              <span>9%</span>
                            </div>
                          </CardBody>
                        </Card>
                        <Card className="card-coin card-plain">
                          <CardBody>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>
                                <u>User: 0x0904...9859</u>
                              </span>
                              <div>
                                <span>(8 shareholders voted)</span>
                                <Button
                                  className="btn-simple btn-round"
                                  color="info"
                                  type="button"
                                  disabled={true}
                                  style={{ marginLeft: "10px" }}
                                >
                                  Answered
                                </Button>
                              </div>
                            </div>
                            <hr />
                            <h3>How to turn the heater on?</h3>
                            <hr />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                color: "white",
                                width: "40%",
                              }}
                            >
                              <span>
                                <i className="tim-icons icon-check-2" />
                                <u style={{ marginLeft: "20px" }}>
                                  0x0904...9859:
                                </u>
                              </span>
                              <span>Just press the red button!</span>
                            </div>
                          </CardBody>
                        </Card>
                      </CardBody>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section">
          <Container>
            <Row>
              <Col md="4">
                <hr className="line-info" />
                <h1>
                  Choose the package{" "}
                  <span className="text-info">that fits your needs</span>
                </h1>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Row>
              <Col md="4">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/bitcoin.png")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Beach</h4>
                        <span>Package: €6,571,000</span>
                        <hr className="line-primary" />
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup>
                        <ListGroupItem>
                          House in Miami, USA: €2,625,000
                        </ListGroupItem>
                        <ListGroupItem>
                          House in Spain: €1,323,000
                        </ListGroupItem>
                        <ListGroupItem>
                          House in France: €2,623,000
                        </ListGroupItem>
                      </ListGroup>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-simple"
                      color="primary"
                      disabled={true}
                    >
                      Purchased
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/etherum.png")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">SKI</h4>
                        <span>Package: €6,271,000</span>
                        <hr className="line-success" />
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup>
                        <ListGroupItem>
                          House in Bergamo, Italy: €2,025,000
                        </ListGroupItem>
                        <ListGroupItem>
                          House in Inssbruk, Austria: €623,000
                        </ListGroupItem>
                        <ListGroupItem>
                          House in Zürich, Switzerland: €3,623,000
                        </ListGroupItem>
                      </ListGroup>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-simple"
                      color="success"
                      disabled={true}
                    >
                      Purchased
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/ripp.png")}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">FOREST</h4>
                        <span>Package: €1,571,000</span>
                        <hr className="line-info" />
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup>
                        <ListGroupItem>
                          House in Finland: €625,000
                        </ListGroupItem>
                        <ListGroupItem>
                          House in Bosnia and Herzegovina: €323,000
                        </ListGroupItem>
                        <ListGroupItem>
                          House in Hungary: €623,000
                        </ListGroupItem>
                      </ListGroup>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="info" disabled={true}>
                      Purchased
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <div className="section">
          <Container>
            <Row className="justify-content-between">
              <Col md="6">
                <Row className="justify-content-between align-items-center">
                  <UncontrolledCarousel items={carouselItems} />
                </Row>
              </Col>
              <Col md="5">
                <h1 className="profile-title text-left">
                  Your past experiences
                </h1>
                <h5 className="text-on-back">Frame</h5>
                <p className="profile-description text-left">
                  Do not forget to take pictures! Enjoy your life and capture
                  the moment to remember. Here are some of your best moments
                  from previous stay.
                </p>
                <div className="btn-wrapper pt-3">
                  <Button
                    className="btn-simple"
                    color="primary"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="tim-icons icon-book-bookmark" /> Bookmark
                  </Button>
                  <Button
                    className="btn-simple"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="tim-icons icon-bulb-63" /> Check it!
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <section className="section">
          <Container>
            <Row>
              <Col md="6">
                <Card className="card-plain">
                  <CardHeader>
                    <h1 className="profile-title text-left">Contact</h1>
                    <h5 className="text-on-back">Issue?</h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Your Name</label>
                            <Input defaultValue="Mike" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Email address</label>
                            <Input placeholder="mike@email.com" type="email" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Phone</label>
                            <Input defaultValue="001-12321345" type="text" />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Company</label>
                            <Input defaultValue="CreativeTim" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Message</label>
                            <Input placeholder="Hello there!" type="text" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
                      >
                        Send text
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="right"
                        target="tooltip341148792"
                      >
                        Can't wait for your message
                      </UncontrolledTooltip>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto" md="4">
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-square-pin" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Find us at the office</h4>
                    <p>
                      Bld Mihail Kogalniceanu, nr. 8, <br />
                      7652 Bucharest, <br />
                      Romania
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-mobile" />
                  </div>
                  <div className="description">
                    <h4 className="info-title">Give us a ring</h4>
                    <p>
                      Michael Jordan <br />
                      +40 762 321 762 <br />
                      Mon - Fri, 8:00-22:00
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Footer />
      </div>
    </>
  );
}
