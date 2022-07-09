import React from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { resetFilter } from "../../store/reducers/assets_reducer";
// Utils
import { numberWithCommas } from "../../utils/tools";
// Translator
import { useTranslation } from "react-i18next";
// Bootstrap
import { Button } from "react-bootstrap";

// The filter box on the right corner in the main page
const FilterBox = ({ filteredSearch, setModalOpen }) => {
  const user = useSelector((state) => state.users.data);
  const totalAssetsLength = useSelector(
    (state) => state.assets.assetsTotalLength
  );
  const dir = useSelector((state) => state.users.language.dir);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const makeEnglishLocation = (arr) => {
    const newArr = [];
    arr.includes("הצפון הישן") && newArr.push("The old north");
    arr.includes("הצפון החדש") && newArr.push("The new north");
    arr.includes("לב העיר") && newArr.push("center");
    arr.includes("שוק הכרמל") && newArr.push("The carmel market");
    arr.includes("יפו") && newArr.push("Jaffa");
    arr.includes("רוטשילד") && newArr.push("Rotchild");
    arr.includes("כרם התימנים") && newArr.push("The cerem");
    arr.includes("פלורנטין") && newArr.push("Florentin");
    arr.includes("אחר") && newArr.push("Other");
    arr.includes("הכל") && newArr.push("all");
    return newArr.join(",");
  };
  return (
    <div dir={dir}>
      {filteredSearch.dates ? (
        <div className="filtered_div">
          <h4 className="fliter_header"> {t("fliterboxTitle.1")}:</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <h6 className="filter_item">
              {t("location.1")}:
              <span style={{ fontWeight: "400" }}>
                {dir === "rtl"
                  ? filteredSearch.location
                  : makeEnglishLocation(filteredSearch.location)}
              </span>
            </h6>
            <h6 className="filter_item">
              {t("maxPrice.1")}:
              <span style={{ fontWeight: "400" }}>
                {numberWithCommas(filteredSearch.price)},
              </span>
            </h6>
            <h6 className="filter_item">
              {t("maxRooms.1")}:
              <span style={{ fontWeight: "400" }}>
                {dir === "rtl"
                  ? filteredSearch.numberOfRooms
                  : filteredSearch.numberOfRooms.includes("חדר בדירת שותפים")
                  ? `${filteredSearch.numberOfRooms.replace(
                      "חדר בדירת שותפים",
                      "room in shared apartment"
                    )}`
                  : filteredSearch.numberOfRooms === "הכל"
                  ? "all"
                  : filteredSearch.numberOfRooms}
              </span>
            </h6>
            <h6 className="filter_item">
              {t("dates.1")}:
              <span style={{ fontWeight: "400" }}>
                {filteredSearch.dates[0]} -{" "}
                {filteredSearch.dates[filteredSearch.dates.length - 1]}
              </span>
            </h6>
          </div>
          <h6 className="filter_item">
            {totalAssetsLength === 1
              ? `${t("oneAptFound.1")}`
              : dir === "rtl"
              ? `נמצאו ${totalAssetsLength} דירות התואמות לחיפוש שלך`
              : `We found ${totalAssetsLength} apartments that match your search`}
          </h6>

          <Button
            variant="outline-secondary"
            style={{ color: "black" }}
            onClick={() => setModalOpen(true)}
          >
            {t("changeFilter.1")}
          </Button>
          <Button
            variant="outline-secondary"
            style={{ color: "black", margin: "10px 20px" }}
            onClick={() => dispatch(resetFilter())}
          >
            {t("resetFilter.1")}
          </Button>
        </div>
      ) : (
        <div className="not_filtered_div">
          <div>
            {dir === "rtl" ? (
              <h6> שלום {user.firstname}, על מנת לצפות בתוצאות מסוננות</h6>
            ) : (
              <h6>Hello {user.firstname}, to watch filtered results</h6>
            )}
          </div>

          <Button
            size="sm"
            className="filter_btn"
            variant="outline-secondary"
            onClick={() => setModalOpen(true)}
          >
            {dir === "rtl" ? "לחץ כאן" : "click here"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterBox;
