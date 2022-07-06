import React, { useState } from "react";
// Translator
import { useTranslation } from "react-i18next";
// Redux
import { useSelector, useDispatch } from "react-redux";
import "./style.css";

export default function ControlledAccordions() {
  const [accordionOpen, setAccordionOpen] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const dir = useSelector((state) => state.users.language.dir);
  const { t, i18n } = useTranslation();

  const accordionItems = [
    {
      title: `${t("whoDesc.2")}`,
      description: [`${t("whoDesc.1")}`],
    },
    {
      title: `${t("advantageDesc.3")}`,
      description: [`${t("advantageDesc.1")}`, `${t("advantageDesc.2")}`],
    },
    {
      title: `${t("howToUpload.2")}`,
      description: [`${t("howToUpload.1")}`],
    },
    {
      title: `${t("howToContact.3")}`,
      description: [`${t("howToContact.1")}`, `${t("howToContact.2")}`],
    },
  ];

  const openAccordion = (value) => {
    if (!accordionOpen[value]) {
      Object.keys(accordionOpen).forEach((v) => (accordionOpen[v] = false));
      setAccordionOpen({ ...accordionOpen, [value]: true });
    } else {
      Object.keys(accordionOpen).forEach((v) => (accordionOpen[v] = false));
      setAccordionOpen({ ...accordionOpen });
    }
  };

  return (
    <div className="q_a_root" dir={dir}>
      <section class={`accordion ${dir === "rtl" ? "" : "accordion_english"}`}>
        <div class="accordion-text-wrapper">
          {dir === "rtl" ? <h1>שאלות ותשובות</h1> : <h1>Q&A</h1>}

          <ul class="accordion-list">
            {accordionItems.map((item, i) => (
              <li class="accordion__item" key={i}>
                <p
                  class={`accordion-title  ${
                    accordionOpen[i] === true ? "accordion-title-active" : ""
                  }`}
                  onClick={() => openAccordion(i)}
                >
                  {item.title}
                </p>
                {item.description.map((desc) => (
                  <p
                    class={`accordion-text ${
                      accordionOpen[i] === true ? "accordion-text-show" : ""
                    }`}
                  >
                    • {desc}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
