import React from "react";
import { useSelector } from "react-redux";
// material ui style
import Box from "@mui/material/Box";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { red, grey } from "@mui/material/colors";

const LegendBox = ({ notApprovedLength, approvedLength }) => {
  const dir = useSelector((state) => state.users.language.dir);

  return (
    <Box
      sx={{
        maxWidth: 600,
        height: 50,
        border: "1px solid grey",
        display: "flex",
        padding: "10px",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <h5 style={{ marginTop: "5px" }}>
        {" "}
        {dir === "rtl" ? "מקרא:" : "Legend:"}
      </h5>

      <div className="legend_box">
        <FiberManualRecordIcon fontSize="small" sx={{ color: red[500] }} />
        <span className="legend_span">
          {dir !== "rtl" ? "Not approved properties" : "נכסים לא מאושרים"}(
          {notApprovedLength})
        </span>
      </div>
      <div className="legend_box">
        <FiberManualRecordIcon fontSize="small" sx={{ color: grey[500] }} />
        <span className="legend_span">
          {" "}
          {dir !== "rtl" ? "Approved properties" : "נכסים מאושרים"}(
          {approvedLength})
        </span>
      </div>
    </Box>
  );
};

export default LegendBox;
