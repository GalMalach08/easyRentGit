import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ListItemText from "@material-ui/core/ListItemText";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./style.css";
const useStyles = makeStyles((theme) => ({
  root: {},
  accordion: {
    backgroundColor: "rgb(34,38,42)",
    color: "white",
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [accordionOpen, setAccordionOpen] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [expanded, setExpanded] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionItems = [
    {
      title: "מי אני ?",
      description: [
        "קוראים לי גל מלאך ואני מייסד EasyRent. האתר הוקם בשנת 2022 עקב המצוקה של אנשים רבים למצוא מגורים ראויים בתל אביב.",
      ],
    },
    {
      title: "מה היתרונות בלפתוח משתמש באתר ?",
      description: [
        "אפשרות להעלות נכסים לאתר בעצמכם",
        "אפשרות לשיחה עם העוזר הדיגיטלי שלנו, בעזרתו תוכלו לסמן את ההעדפות שלכם למציאת דירה ואנו נדאג לעדכן אותכם ראשונים כאשר עולה דירה רלוונטית.",
      ],
    },
    {
      title: "איך מעלים נכס חדש לאתר ?",
      description: [
        "כאשר תפתחו משתמש תתווסף לכם לשונית בתפריט הניווט שנקראת העלאת נכס. לאחר מכן תצטרכו למלא טופס קצר המציג את הדירה שלכם והיא תשלח לאישור מערכת. במידה והדירה תואשר היא תעלה לאתר ותקבלו על כך הודעה במייל איתו נרשמתם.משם הדרך להשכרת הנכס קצרה מתמיד!",
      ],
    },
    {
      title: "איך יוצרים איתכם קשר ?",
      description: [
        "דרך האיימיל שלנו: galmalach2@gmail.com",
        "דרך הווצאפ: 050-592-0062",
      ],
    },
  ];

  const openAccordion = (value) => {
    console.log(accordionOpen[value]);
    if (!accordionOpen[value]) {
      Object.keys(accordionOpen).forEach((v) => (accordionOpen[v] = false));
      setAccordionOpen({ ...accordionOpen, [value]: true });
    } else {
      Object.keys(accordionOpen).forEach((v) => (accordionOpen[v] = false));
      setAccordionOpen({ ...accordionOpen });
    }
  };

  return (
    <div className="q_a_root">
      <section class="accordion">
        <div class="accordion-text-wrapper">
          <h1>שאלות ותשובות</h1>

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
