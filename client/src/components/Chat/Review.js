import React, { useEffect, useState } from "react";
// Translator
import { useTranslation } from "react-i18next";
const Review = ({ steps }) => {
  const [preferences, setPreferences] = useState({
    price: "",
    area: "",
    numberOfRooms: "",
  });
  const { t } = useTranslation();

  useEffect(() => {
    const { price, area, numberOfRooms } = steps;
    setPreferences({ price, area, numberOfRooms });
  }, [steps]);

  return (
    <div style={{ width: "100%" }}>
      <h3>{t("summary.1")}</h3>

      <table className="table " style={{ color: "white" }}>
        <thead>
          <tr>
            <th scope="col">{t("price.1")}</th>
            <th scope="col">{t("area.1")}</th>
            <th scope="col"> {t("rooms.1")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {preferences.price.message} </td>
            <td>{preferences.area.message}</td>
            <td>{preferences.numberOfRooms.message}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Review;
