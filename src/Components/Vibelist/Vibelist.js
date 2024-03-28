import { Box, CssBaseline, Grid } from "@mui/material";
import SideBar from "../Sidebar/SideBar";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Button from "@mui/material/Button";
import bc from "../../Img/bp6.png";
import twitterIcon from "../../Img/twitter_icon.png";
import discordIcon from "../../Img/discord.png";
import vibeIcon from "../../Img/vibe.png";
import "./Vibelist.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

const drawerWidth = 240;

const CATEGORIES = {
  all: 'All',
  premint: 'Pre-mint',
  minted: 'Minted',
  sei: 'SEI influencers'
}

function getMonday(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function VibeProjectDisplay({ project, index }) {
  return (
    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
      <div className="tco-inner">
        <div className="tco-inner-1">{index + 1}.</div>
        <div className="tco-inner-2" style={{cursor: 'pointer'}} onClick={() => {
          window.open(
            "https://twitter.com/" +
              project.twitter +
              "?utm_source=astroguys-vibelist&utm_medium=vibelist-cta&utm_campaign=vibelist",
            "_blank"
          );
        }}>
          <img
            src={project.logo}
            style={{ height: "45px", borderRadius: "10px" }}
          />
        </div>
        <div className="tco-inner-3 vibe-detail-name">
          <label>{project.name}</label>
          <span>{CATEGORIES[project.category]}</span>
        </div>
        <div className="tco-inner-4 tco-vibe-project">
          <div>
            <img alt="twitter icon" src={twitterIcon} width="50" />
            <span>
              {project.stats.length > 0
                ? project.stats[0].twitterFollower.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  })
                : "0"}
            </span>
          </div>

          {project.discord && (
            <div>
              <img alt="discord icon" src={discordIcon} width="50" />
              <span>
                {project.stats.length > 0
                  ? project.stats[0].discordUsers.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })
                  : "0"}
              </span>
            </div>
          )}
        </div>
      </div>
    </Grid>
  );
}

function VibeList() {
  const [vibelist, setVibelist] = useState([]);
  const [lastVibeListed, setLastVibeListed] = useState({});
  const [category, setCategory] = useState("all");
  const [tableIndex, setTableIndex] = useState(10);

  useEffect(() => {
    const leapaddress = localStorage.getItem("leapaddress");
    const address = localStorage.getItem("address");

    var addr = leapaddress || address;

    fetch("https://twittermentionsapi.poneyhost.eu/projects")
      .then((response) => response.json())
      .then((json) => {
        const maxVibe = Math.max(...json.map((s) => s.indicator.vibe));

        const projects = json.map((p) => {
          var vibe = p.indicator.vibe;
          var height = vibe / maxVibe;
          return {
            ...p,
            vibe,
            height,
            canVote: p.votes.includes(addr) ? false : true,
          };
        });

        setVibelist(projects);
        setLastVibeListed(projects.sort((a, b) => b.id - a.id)[0]);
      });
  }, []);

  const doVote = (id) => {
    const leapaddress = localStorage.getItem("leapaddress");
    const address = localStorage.getItem("address");

    var addr = leapaddress || address;

    if (!leapaddress && !address) {
      alert("Please connect your wallet to vote");
      return;
    }

    fetch(
      `https://twittermentionsapi.poneyhost.eu/vote?project=${id}&address=${addr}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leapaddress,
          address,
        }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          setVibelist((prevVibelist) => {
            const updatedVibelist = [...prevVibelist];
            const projectIndex = updatedVibelist.findIndex(
              (project) => project.id === id
            );
            if (projectIndex !== -1) {
              updatedVibelist[projectIndex].canVote = false;
            }
            return updatedVibelist;
          });
        } else if (response.status === 400) {
          console.log("You have already voted today");
          alert("You have already voted today");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="Stacking market-main-page">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SideBar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)`, marginTop: "50px" },
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", padding: "10px" }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
              <div className="st-c1">
                <div className="display">
                  <div className="sei-liquid">
                    Track the most promising NFT{" "}
                    <div>projects on SEI Network</div>
                  </div>

                  <div className="content-sct-1">
                    Discover the most hyped NFT projects on SEI network
                  </div>

                  <div className="read" onClick={() => {
          window.open(
            "https://docs.astrohub.io/",
            "_blank"
          );
        }}>
                    Read documentation
                    <ArrowRightAltIcon />
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
              <div className="vibelist-stats-card">
                <div className="vibelist-stats">
                  <div>
                    <div style={{ color: "#8CEAFF" }}>Pre-mint project</div>
                    <strong style={{ color: "#FFFFFF", fontSize: "1.5em" }}>
                      {
                        vibelist.filter(
                          (project) =>
                            project.category.toLowerCase() === "premint"
                        ).length
                      }
                    </strong>
                  </div>
                  <div>
                    <div style={{ color: "#8CEAFF" }}>Released Project</div>
                    <strong style={{ color: "#FFFFFF", fontSize: "1.5em" }}>
                      {
                        vibelist.filter(
                          (project) =>
                            project.category.toLowerCase() === "minted"
                        ).length
                      }
                    </strong>
                  </div>
                  <div>
                    <div style={{ color: "#8CEAFF" }}>SEI Influencers</div>
                    <strong style={{ color: "#FFFFFF", fontSize: "1.5em" }}>
                      {
                        vibelist.filter(
                          (project) => project.category.toLowerCase() === "sei"
                        ).length
                      }
                    </strong>
                  </div>
                </div>
                <div className="collection-card-main vibe-card">
                  <div style={{ color: "#A0AEC0" }}>
                    New project added this week
                  </div>
                  <div>
                    <strong style={{ color: "white", marginRight: "2px" }}>
                      +
                      {
                        vibelist.filter(
                          (project) =>
                            new Date(project.createdAt) > getMonday(new Date())
                        ).length
                      }
                    </strong>
                    <small style={{ color: "green", fontSize: "0.7em" }}>
                      +100%
                    </small>
                  </div>
                </div>
                {lastVibeListed && (
                  <div className="collection-card-main vibe-card">
                    <div style={{ color: "#A0AEC0" }}>
                      Lasted Vibelisted project
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        window.open(
                          "https://twitter.com/" +
                            lastVibeListed.twitter +
                            "?utm_source=astroguys-vibelist&utm_medium=vibelist-cta&utm_campaign=vibelist",
                          "_blank"
                        );
                      }}
                    >
                      <img
                        src={lastVibeListed.logo}
                        style={{
                          height: "35px",
                          marginRight: "10px",
                          borderRadius: "10px",
                        }}
                      />
                      <span style={{ color: "white" }}>
                        {lastVibeListed.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
              <div
                className="collection-card-main"
                style={{ height: "213px", margin: 0 }}
              >
                <div className="buy-pallet-main-div" style={{ height: "100%" }}>
                  <div
                    className="became-astro"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      position: "relative",
                      width: "100%",
                      padding: "10px",
                    }}
                  >
                    <div className="vibelisted-title">
                      Get Vibelisted{" "}
                      <img src={vibeIcon} height="16px" alt="vibe icon" />
                    </div>
                    <div className="content-sct-1">
                      You can list your SEI NFT project from free by filling in
                      the form
                    </div>
                    <a
                      className="read read-vibelisted"
                      href="https://docs.google.com/forms/d/e/1FAIpQLSddRi_2G0Ssg2Qo_Y1JFenjLXac5J_l1zHN1A_VeQE_PCQS2Q/viewform"
                      target="_blank"
                    >
                      Get Vibelisted
                      <ArrowRightAltIcon />
                    </a>
                    <img
                      src={bc}
                      style={{
                        position: "absolute",
                        bottom: "-20px",
                        right: 0,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className="stack-pool">
              SEI less,<span>Vibe more</span>
            </div>
            <div className="generate-stable">
              Follow the Astro Hub vibelist for real-time hype indice in
              upcoming NFT collections. Finding gems has never been easier.
            </div>
          </Grid>

          <Grid container spacing={2} className="section-3-cls">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <h3 className="heading-market">
                Who's Vibing over <span>last 72</span> hours
              </h3>
            </Grid>
            <Grid container spacing={2} className="tco-inner-outer">
              {/*/ map the first 9 projects sorted by vibe attribute DESC */}
              {vibelist
                .sort((a, b) => b.vibe - a.vibe)
                .slice(0, 9)
                .map((project, index) => (
                  <VibeProjectDisplay
                    key={index}
                    project={project}
                    index={index}
                  />
                ))}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            className="section-4-cls"
            style={{ marginTop: "2rem" }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div>
                <div className="vibelist-table-title">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3
                      className="heading-market Trade-WL-and-OG-spots"
                      style={{ margin: "0" }}
                    >
                      VibeList
                    </h3>
                    {/* multiple buttons in order to switch category : 4 buttons : All, pre-mint, released, sei influencers */}
                    <div className="btn-group">
                      <Button
                        className={category === "all" ? "active" : ""}
                        onClick={() => setCategory("all")}
                      >
                        All
                      </Button>
                      <Button
                        className={category === "premint" ? "active" : ""}
                        onClick={() => setCategory("premint")}
                      >
                        Pre-mint
                      </Button>
                      <Button
                        className={category === "minted" ? "active" : ""}
                        onClick={() => setCategory("minted")}
                      >
                        Released
                      </Button>
                      <Button
                        className={category === "sei" ? "active" : ""}
                        onClick={() => setCategory("sei")}
                      >
                        SEI influencers
                      </Button>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div>
                      <div className="docs" onClick={() => {
          window.open(
            "https://docs.astrohub.io/",
            "_blank"
          );
        }}>
                        <Button>How vibe indicator works?</Button>
                      </div>
                    </div>
                    <div>
                      <div className="get-vibelisted">
                        <Button
                          href="https://docs.google.com/forms/d/e/1FAIpQLSddRi_2G0Ssg2Qo_Y1JFenjLXac5J_l1zHN1A_VeQE_PCQS2Q/viewform"
                          target="_blank"
                        >
                          <div className="btn-plus-icon">
                            <span>+</span>
                          </div>{" "}
                          Get Vibelisted{" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <table
                className="your-sei your-sei-wl-og"
                style={{ width: "100%" }}
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th className="vibe-col-0"></th>
                    <th className="vibe-col-1">Project</th>
                    <th className="vibe-col-2">Community</th>
                    <th className="vibe-col-3">Supply</th>
                    <th className="vibe-col-4">Price</th>
                    <th className="vibe-col-5">Date</th>
                    <th className="vibe-col-6">Vote (1/day)</th>
                    <th className="vibe-col-7">Vibe Indicator</th>
                  </tr>
                </thead>
              </table>
              <table style={{ width: "100%" }} cellspacing="0">
                <tbody>
                  {vibelist.length > 0 &&
                    vibelist
                      .sort((a, b) => b.vibe - a.vibe)
                      .filter((project, index) => {
                        return (
                          (category === "all" ||
                            project.category.toLowerCase() ===
                              category.toLowerCase()) &&
                          index < tableIndex
                        );
                      })
                      .map((project, index) => (
                        <tr className="vibe-row" key={index}>
                          <td className="vibe-col-0">{index + 1}.</td>
                          <td className="vibe-col-1">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                window.open(
                                  "https://twitter.com/" +
                                    project.twitter +
                                    "?utm_source=astroguys-vibelist&utm_medium=vibelist-cta&utm_campaign=vibelist",
                                  "_blank"
                                );
                              }}
                            >
                              <img
                                src={project.logo}
                                style={{ height: "45px", borderRadius: "10px" }}
                              />
                              <span style={{ marginLeft: "10px" }}>
                                {project.name}
                              </span>
                            </div>{" "}
                          </td>
                          <td className="vibe-col-2">
                            <div>
                              <div>
                                <img src={twitterIcon} width="15px" />
                                <span style={{ marginLeft: "5px" }}>
                                  {project.stats.length > 0
                                    ? project.stats[0].twitterFollower.toLocaleString(
                                        undefined,
                                        {
                                          minimumFractionDigits: 0,
                                        }
                                      )
                                    : "0"}
                                </span>
                              </div>
                              {project.discord && (
                                <div style={{ marginTop: "10px" }}>
                                  <img src={discordIcon} width="15px" />
                                  <span style={{ marginLeft: "5px" }}>
                                    {project.stats.length > 0
                                      ? project.stats[0].discordUsers.toLocaleString(
                                          undefined,
                                          {
                                            minimumFractionDigits: 0,
                                          }
                                        )
                                      : "0"}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="vibe-col-3">
                            {project.supply || "N/A"}
                          </td>
                          <td className="vibe-col-4">
                            {project.price || "N/A"}
                          </td>
                          <td className="vibe-col-5">
                            {project.date || "N/A"}
                          </td>
                          <td className="vibe-col-6">
                            {project.canVote ? (
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  doVote(project.id);
                                }}
                              >
                                <img
                                  src="https://www.figma.com/file/Q1wS4WGjczutIg3mHA4W1Z/image/853d5ea56dcb1d1a055161cc5b9f7135a0a0eefc"
                                  alt="vote icon"
                                  width="30px"
                                />
                              </a>
                            ) : (
                              "Voted today"
                            )}
                          </td>

                          <td className="vibe-col-7">
                            <img
                              alt="vibe indicator"
                              src="https://www.figma.com/file/Q1wS4WGjczutIg3mHA4W1Z/image/bce5b4b46357ffea4dbad253914147ecf11fac18"
                              style={{
                                width: `calc(80px * ${project.height})`,
                                marginTop: `${
                                  (100 * (1 - project.height)) / 2
                                }px`,
                                right: `calc(4% + ${
                                  (80 * (1 - project.height)) / 2
                                }px)`,
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              {vibelist.length > tableIndex && (
                <div style={{ textAlign: "center" }}>
                  <a
                    href="#"
                    style={{ color: "white" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setTableIndex(tableIndex + 10);
                    }}
                  >
                    See more
                  </a>
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default VibeList;
