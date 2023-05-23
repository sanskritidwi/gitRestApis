import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import ContributorActivity from "./ContributorActivity";

function TotalChanges({ repoName }) {
  const [data, setData] = useState([]);
  const [contributorData, setContributorData] = useState();
  const accessToken = "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";

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${repoName}/stats/commit_activity`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${repoName}/stats/contributors`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setContributorData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

console.log(contributorData)

  return (
    <div>
        <Chart data={data} />
        <ContributorActivity data={contributorData}/>
    </div>
  );
}

export default TotalChanges;
