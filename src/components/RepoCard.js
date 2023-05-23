import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import TotalChanges from "./TotalChanges";

function RepoCard({ userData }) {

  //states
  const {
    full_name,
    name,
    description,
    stargazers_count,
    owner,
    open_issues,
    pushed_at,
  } = userData;

  const [expanded, setExpanded] = useState(false);


  //helper functions
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleString('en-US', options);
  };


  //handlefunctions
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  
//schema
  const card = (str) => {
    return (
      <>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {str}
          </Typography>
        </CardContent>
      </>
    );
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className="custom-accordion"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className="summary"
        >
          <Avatar
            alt="noimg"
            src={owner.avatar_url}
            variant="square"
            sx={{ width: 160, height: 200 }}
            className="avatar"
          />
          <div className="di-fl-co">
            <Typography sx={{ width: "100%", flexShrink: 0 }} variant="h4">
              {name}
            </Typography>
            <Typography sx={{ width: "70%", flexShrink: 0 }}>
              {description}
            </Typography>
            <div className="di-fl-ro">
              <div className="di-fl-ro-mar">
                <Typography className="box">
                  {card(`Star gazers : ${stargazers_count}`)}
                </Typography>
                <Typography className="box">
                  {card(`Issues : ${open_issues}`)}
                </Typography>
              </div>
              <Typography>
                Last pushed @ {formatDateString(pushed_at)} by {owner.login}
              </Typography>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <TotalChanges repoName={full_name} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default RepoCard;
