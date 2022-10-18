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
import { ethers } from "ethers";
import myHomesAbi from "../../myHomesABI.json";
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

const ballotStates = [
  { name: "Created", color: "info", option: "Start Voting" },
  { name: "Voting", color: "success", option: "End Voting" },
  { name: "Ended", color: "dange", option: "Voting ended" },
];

let ps = null;

// SKI, BEACH, FOREST
const smartContracts = [
  "0x603bac55d56e7bEBD5fcd97618B766162b973413",
  "0x5965853DA2Bf7dcb8BDd8477C61A10c025781D7C",
  "0x3E0b2aF1fB618fB28F0a603CCEDfA81bADa634Ec",
  // "0x88C9891DC3DAb365B137303f2Fcd5cdD343944D7",
];

export default function ProfilePage() {
  const [tabs, setTabs] = React.useState(1);
  const [user, setUser] = React.useState("");
  const [userBalance, setUserWeiBalance] = React.useState(0);
  const [ashares, setAShares] = React.useState(0);
  const [packageToBuy, setPackageToBuy] = React.useState("");
  const [amountToBuy, setAmountToBuy] = React.useState(0);
  const [packageToVote, setPackageToVote] = React.useState("");
  const [proposal, setProposal] = React.useState("");
  const [discussionTabs, setDiscussionTabs] = React.useState(2);
  const [housingPackages, setHousingPackages] = React.useState([]);

  const loadData = async () => {
    let loadedUser;
    if (window.ethereum) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          loadedUser = result;
        });
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const r = await Promise.all(
      smartContracts.map(async (contract) => {
        const mhpackage = new ethers.Contract(
          contract,
          myHomesAbi,
          provider.getSigner()
        );

        const housingPackage = await mhpackage.hp();
        const balance = await mhpackage.balances(
          ethers.utils.getAddress(loadedUser[0])
        );

        const userWeiBalance = await mhpackage.etherBalance(
          ethers.utils.getAddress(loadedUser[0])
        );
        setUserWeiBalance(parseInt(userWeiBalance));

        const owner = await mhpackage.owner();
        const ownerBalance = await mhpackage.balances(
          ethers.utils.getAddress(owner)
        );

        let houses;
        let totalHouses = await mhpackage.totalHouses();
        totalHouses = parseInt(totalHouses);
        if (totalHouses !== 0) {
          const houseIdxArray = [...Array(totalHouses).keys()];
          houses = await Promise.all(
            houseIdxArray.map(async (idx) => await mhpackage.houseRegister(idx))
          );
        }

        let ballots;
        let totalBallots = await mhpackage.totalBallots();
        totalBallots = parseInt(totalBallots);
        if (totalBallots !== 0) {
          const ballotIdxArray = [...Array(totalBallots).keys()];
          ballots = await Promise.all(
            ballotIdxArray
              .map(async (idx) => await mhpackage.ballotHistory(idx))
              .filter(
                (ballot) =>
                  ballot &&
                  ballot["ballotOwner"] &&
                  ethers.utils.getAddress(ballot["ballotOwner"]) !==
                    ethers.utils.getAddress(
                      "0x0000000000000000000000000000000000000000"
                    )
              )
          );
        }

        const currentBallot = await mhpackage.currentBallot();
        if (
          currentBallot &&
          currentBallot["state"] !== 3 &&
          ethers.utils.getAddress(currentBallot["ballotOwner"]) !==
            ethers.utils.getAddress(
              "0x0000000000000000000000000000000000000000"
            )
        ) {
          ballots = [currentBallot].concat(ballots);
        }

        const decimalTotalValue = parseInt(
          housingPackage["totalValue"]["_hex"]
        );

        const totalValue = decimalTotalValue.toLocaleString("dk-DK", {
          style: "currency",
          currencyDisplay: "code",
          currency: "EUR",
        });

        const decimalBalance = parseInt(balance["_hex"]);
        const value = (
          (decimalBalance * decimalTotalValue) /
          100
        ).toLocaleString("dk-DK", {
          style: "currency",
          currencyDisplay: "code",
          currency: "EUR",
        });

        return {
          name: housingPackage["name"],
          package: housingPackage["package"],
          balance: parseInt(balance),
          totalValue: totalValue,
          totalValueDec: decimalTotalValue,
          availableShares: parseInt(ownerBalance),
          houses: houses,
          value: value,
          ballots: ballots,
          mhpackage: mhpackage,
        };
      })
    );

    setUser(loadedUser[0]);
    setAShares(r[0]["availableShares"]);
    setHousingPackages(r);
    setPackageToVote(r[0]["name"]);
    setPackageToBuy(r[0]["name"]);
  };

  React.useEffect(() => {
    loadData();
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

  const packageTable = housingPackages.map((hp) => {
    return (
      <tr key={hp["name"]}>
        <td>{hp["name"]}</td>
        <td>{hp["balance"]}</td>
        <td>{hp["value"]}</td>
        <td>{hp["totalValue"]}</td>
      </tr>
    );
  });

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
                          Sell
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
                              <th className="header">Total Value</th>
                            </tr>
                          </thead>
                          <tbody>{packageTable}</tbody>
                        </Table>
                      </TabPane>
                      <TabPane tabId="tab2">
                        <Row>
                          <Label sm="3">Your balance:</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                type="text"
                                disabled
                                style={{ color: "white" }}
                                value={userBalance}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Package</Label>
                          <Col sm="9">
                            <FormGroup>
                              <FormGroup>
                                <Input
                                  type="select"
                                  name="select"
                                  id="select"
                                  value={packageToBuy}
                                  onChange={(e) => {
                                    const res = housingPackages.filter((hp) => {
                                      return hp["name"] === e.target.value;
                                    });

                                    setPackageToBuy(res[0]["name"]);
                                    setAShares(res[0]["availableShares"]);
                                  }}
                                >
                                  {housingPackages.map((hp) => {
                                    return (
                                      <option key={hp["name"]}>
                                        {hp["name"]}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </FormGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Available shares:</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                type="text"
                                style={{ color: "white" }}
                                disabled
                                value={ashares}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                value={amountToBuy}
                                onChange={(e) => {
                                  e.preventDefault();
                                  setAmountToBuy(e.target.value);
                                }}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault();
                            const hpackage = housingPackages.filter(
                              (hp) => hp["name"] === packageToBuy
                            )[0];
                            let requiredEther =
                              (hpackage["totalValueDec"] / 100) *
                                amountToBuy *
                                Math.pow(10, -18) +
                              Math.pow(10, -13);
                            console.log(requiredEther.toString());
                            requiredEther = requiredEther.toFixed(
                              requiredEther.toString().split("-")[1]
                            );
                            console.log(requiredEther.toString());
                            hpackage["mhpackage"].buy(amountToBuy, {
                              value: ethers.utils.parseEther(
                                requiredEther.toString()
                              ),
                            });
                          }}
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
                      </TabPane>
                      <TabPane tabId="tab3">
                        <Row>
                          <Label sm="3">Package</Label>
                          <Col sm="9">
                            <FormGroup>
                              <FormGroup>
                                <Input
                                  type="select"
                                  name="select"
                                  id="select"
                                  value={packageToBuy}
                                  onChange={(e) => {
                                    const res = housingPackages.filter((hp) => {
                                      return hp["name"] === e.target.value;
                                    });

                                    setPackageToBuy(res[0]["name"]);
                                    setAShares(res[0]["availableShares"]);
                                  }}
                                >
                                  {housingPackages.map((hp) => {
                                    return (
                                      <option key={hp["name"]}>
                                        {hp["name"]}
                                      </option>
                                    );
                                  })}
                                </Input>
                              </FormGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Your balance:</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                style={{ color: "white" }}
                                type="text"
                                disabled
                                value={
                                  housingPackages.filter((hp) => {
                                    return hp["name"] === packageToBuy;
                                  })[0]
                                    ? housingPackages.filter((hp) => {
                                        return hp["name"] === packageToBuy;
                                      })[0]["balance"]
                                    : 0
                                }
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Label sm="3">Amount</Label>
                          <Col sm="9">
                            <FormGroup>
                              <Input
                                value={amountToBuy}
                                onChange={(e) => {
                                  e.preventDefault();
                                  setAmountToBuy(e.target.value);
                                }}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-simple btn-icon btn-round float-right"
                          color="primary"
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault();
                            const hpackage = housingPackages.filter(
                              (hp) => hp["name"] === packageToBuy
                            )[0];
                            hpackage["mhpackage"].sellToOwner(amountToBuy);
                          }}
                        >
                          <i className="tim-icons icon-send" />
                        </Button>
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
                    <Input
                      type="select"
                      name="select"
                      id="select"
                      value={packageToVote}
                      onChange={(e) => {
                        const res = housingPackages.filter((hp) => {
                          return hp["name"] === e.target.value;
                        });

                        setPackageToVote(res[0]["name"]);
                      }}
                    >
                      {housingPackages.map((hp) => {
                        return <option key={hp["name"]}>{hp["name"]}</option>;
                      })}
                    </Input>
                  </CardHeader>
                  <CardBody>
                    <Nav
                      className="nav-tabs-primary justify-content-center"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: discussionTabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setDiscussionTabs(2);
                          }}
                          href="#pablo"
                        >
                          Discussion
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: discussionTabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setDiscussionTabs(1);
                          }}
                          href="#pablo"
                        >
                          New proposal
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" lg="10" md="6">
                <Card className="card-coin card-plain">
                  <TabContent
                    className="tab-subcategories"
                    activeTab={"dtab" + discussionTabs}
                  >
                    <TabPane tabId="dtab1">
                      <CardHeader>
                        <h4 className="title">New proposal</h4>
                      </CardHeader>
                      <CardBody>
                        <Col lg="12" sm="6">
                          <Form>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                  <label>Proposal</label>
                                  <Input
                                    placeholder="Enter your proposal."
                                    value={proposal}
                                    type="text"
                                    onChange={(e) => {
                                      setProposal(e.target.value);
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Button
                              className="btn-round float-right"
                              color="primary"
                              data-placement="right"
                              // id="tooltip341148792"
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                const hp = housingPackages.filter(
                                  (p) => p["name"] === packageToVote
                                )[0];
                                hp["mhpackage"].createBallot(proposal);
                              }}
                            >
                              Submit
                            </Button>
                          </Form>
                        </Col>
                      </CardBody>
                    </TabPane>
                    <TabPane tabId="dtab2">
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
                          {housingPackages
                            .filter((hp) => hp["name"] === packageToVote)
                            .map((hp) => {
                              if (!hp["ballots"]) {
                                return "No ballots yet!";
                              } else
                                return hp["ballots"].map((b) => {
                                  if (b === undefined) return b;
                                  return (
                                    <Card
                                      className="card-coin card-plain"
                                      key={hp["name"]}
                                    >
                                      <CardBody key={b["proposal"]}>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <span>
                                            <u>User: {b["ballotOwner"]}</u>
                                          </span>
                                          <div>
                                            <span>
                                              ({parseInt(b["totalVotes"])}{" "}
                                              shareholders voted)
                                            </span>
                                            <Button
                                              className="btn-simple btn-round"
                                              color={
                                                ballotStates[b["state"]][
                                                  "color"
                                                ]
                                              }
                                              type="button"
                                              disabled={true}
                                              style={{ marginLeft: "10px" }}
                                            >
                                              {ballotStates[b["state"]]["name"]}
                                            </Button>
                                          </div>
                                        </div>
                                        <hr />
                                        <h3>[VOTE]: {b["proposal"]}</h3>
                                        <hr />
                                        {b["state"] !== 2 ? (
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              color: "white",
                                              width: "55%",
                                            }}
                                          >
                                            <Button
                                              color="success"
                                              disabled={hp["balance"] === 0}
                                              onClick={(e) => {
                                                e.preventDefault();
                                                hp["mhpackage"].doVote(true);
                                              }}
                                            >
                                              For
                                            </Button>
                                            <Button
                                              disabled={hp["balance"] === 0}
                                              color="danger"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                hp["mhpackage"].doVote(false);
                                              }}
                                            >
                                              Against
                                            </Button>
                                            {ethers.utils.getAddress(
                                              b["ballotOwner"]
                                            ) ===
                                            ethers.utils.getAddress(user) ? (
                                              <Button
                                                color="info"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  if (b["state"] === 0) {
                                                    hp["mhpackage"].startVote();
                                                  } else {
                                                    hp["mhpackage"].endVote();
                                                  }
                                                }}
                                              >
                                                {
                                                  ballotStates[b["state"]][
                                                    "option"
                                                  ]
                                                }
                                              </Button>
                                            ) : undefined}
                                          </div>
                                        ) : (
                                          <>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                // color: "white",
                                                width: "50%",
                                              }}
                                            >
                                              <span>For</span>
                                              <span>
                                                {parseInt(b["totalVotes"]) > 0
                                                  ? (parseInt(
                                                      b["finalResult"]
                                                    ) *
                                                      100) /
                                                    parseInt(b["totalVotes"])
                                                  : "0"}
                                                %
                                              </span>
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
                                              <span>
                                                {parseInt(b["totalVotes"]) > 0
                                                  ? 100 -
                                                    (parseInt(
                                                      b["finalResult"]
                                                    ) *
                                                      100) /
                                                      parseInt(b["totalVotes"])
                                                  : "0"}{" "}
                                                %
                                              </span>
                                            </div>
                                          </>
                                        )}
                                      </CardBody>
                                    </Card>
                                  );
                                });
                            })}
                        </CardBody>
                      </div>
                    </TabPane>
                  </TabContent>
                  <div style={{ display: "none" }}></div>

                  <div style={{ display: "block" }}></div>
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
              {housingPackages.map((hp) => {
                const houses =
                  hp["houses"] &&
                  hp["houses"].map((h) => {
                    return (
                      <ListGroupItem key={h["physicalAddress"]}>
                        <i className="tim-icons icon-double-right" />{" "}
                        {h["physicalAddress"]}
                      </ListGroupItem>
                    );
                  });

                return (
                  <Col md="4" key={hp["name"]}>
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
                            <h4 className="text-uppercase">{hp["name"]}</h4>
                            <span>Package value: {hp["totalValue"]}</span>
                            <hr className="line-primary" />
                          </Col>
                        </Row>
                        <Row>
                          <ListGroup>{houses}</ListGroup>
                        </Row>
                      </CardBody>
                      <CardFooter className="text-center">
                        <Button
                          className="btn-simple"
                          color="primary"
                          disabled={hp["balance"] > 0}
                          onClick={(e) => {
                            e.preventDefault();
                            setTabs(2);
                            window.scrollTo(0, 0);
                          }}
                        >
                          {hp["balance"] > 0 ? "Purchased" : "Buy"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </Col>
                );
              })}
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
