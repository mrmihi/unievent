import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ApprovalRequestMain = () => {
  const { id: requestId } = useParams();
  const [approvalRequest, setApprovalRequest] = useState([]);
  //const [isRendered, setIsRendered] = useState(false)
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const [fetchMessage, setFetchMessage] = useState("");

  const fetchData = useCallback(
    async (isRendered) => {
      const data = await fetch(
        `http://localhost:3000/api/approval/request/${requestId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await data.json();

      setApprovalRequest(json.data);
      setIsFetchSuccessful(json.success);
      setFetchMessage(json.message);
    },
    [requestId]
  );

  useEffect(() => {
    fetchData().catch((err) => console.log(err));
  }, [fetchData]);

  const [data, setData] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleDataInputChange = (e) => {
    setData(e.target.value);
  };

  const handleLoadData = () => {
    setIsDataLoaded(true);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Data Viewer</h1>
        <input
          type="text"
          className="w-full border rounded-md p-3 mb-4"
          placeholder="Enter Data"
          value={data}
          onChange={handleDataInputChange}
        />
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md mb-4 hover:bg-blue-600"
          onClick={handleLoadData}
        >
          Load Data
        </button>
        {isDataLoaded && <p className="text-center">{`Data: ${data}`}</p>}
      </div>
    </div>
  );
};

export default ApprovalRequestMain;
