import React from "react";
// Redux
import { useSelector } from "react-redux";
// Component
import Review from "./Review";
// Packages
import ChatBot from "react-simple-chatbot";
// Style
import { ThemeProvider } from "styled-components";
import "./style.css";
// Translator
import { useTranslation } from "react-i18next";

const ChatBotComp = ({ handleChatbot }) => {
  const user = useSelector((state) => state.users.data);
  const dir = useSelector((state) => state.users.language.dir);

  const theme = {
    background: "#f5f8fb",
    headerBgColor: "#EF6C00",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#EF6C00",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#EF6C00",
    position: "fixed",
  };
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        handleEnd={handleChatbot}
        headerTitle="EasyBot"
        floating={true}
        inputStyle={{ display: "none" }}
        hideSubmitButton={true}
        steps={
          !user.isVerified
            ? [
                {
                  id: "1",
                  message:
                    dir === "rtl"
                      ? `שלום ${user.firstname}, כאן שלומי ואני העוזר הדיגטלי של EasyRent 😎  כאן תוכל לסמן את ההעדפות שלך לדירה ונדאג לשלוח לך מייל כשאר יעלו דירות רלוונטיות, אך לפני כן עליך לאמת את המשתמש דרך המייל שאיתו נרשמת`
                      : `Hello ${user.firstname}, my name is Shlomi and I am EasyRent's digital assistant😎,here you can mark your preferences for the apartment and we will make sure to send you an email when the rest of the relevant apartments will go up,but before you have to verify your acoount, email has sent to your address`,
                },
              ]
            : [
                // Welcome message
                {
                  id: "1",
                  message:
                    dir === "rtl"
                      ? `שלום ${user.firstname}, כאן שלומי ואני העוזר הדיגטלי של EasyRent 😎 אני מזמין אותך לסמן את ההעדפות שלך לדירה ונדאג לשלוח לך מייל כשאר יעלו דירות רלוונטיות`
                      : `Hello ${user.firstname}, here's Shlomi and I's EasyRent's digital assistant😎,I invite you to mark your preferences for the apartment and we will make sure to send you an email when the rest of the relevant apartments will go up`,
                  trigger: "2",
                },
                // Ask if the user wants to continue
                {
                  id: "2",
                  options: [
                    {
                      label: dir === "rtl" ? "מעוניין להמשיך" : "continue",
                      trigger: "numberOfRoomsMessage",
                      value: "yes",
                    },
                    {
                      label: dir === "rtl" ? "אוותר בינתיים" : "No,thanks",
                      trigger: "end-message-not",
                      value: "not",
                    },
                  ],
                },
                // Number of rooms message
                {
                  id: "numberOfRoomsMessage",
                  message: dir === "rtl" ? "מספר החדרים:" : "Number of rooms:",
                  trigger: "numberOfRooms",
                },

                // Number of rooms value
                {
                  id: "numberOfRooms",
                  options: [
                    { value: "1", label: "1", trigger: "priceMessage" },
                    { value: "2-3", label: "2-3", trigger: "priceMessage" },
                    { value: "3-4", label: "3-4", trigger: "priceMessage" },
                    { value: "4-5", label: "4-5", trigger: "priceMessage" },
                  ],
                },
                // Price message
                {
                  id: "priceMessage",
                  message: dir === "rtl" ? "טווח המחירים:" : "Price range:",
                  trigger: "price",
                },

                // Price value
                {
                  id: "price",
                  options: [
                    {
                      value: "6000",
                      label:
                        dir === "rtl" ? "עד ששת אלפים שח" : "maximum 6,000 ILS",
                      trigger: "areaMessage",
                    },
                    {
                      value: "8000",
                      label:
                        dir === "rtl"
                          ? "עד שמונת אלפים שח"
                          : "maximum 8,000 ILS",
                      trigger: "areaMessage",
                    },
                    {
                      value: "10000",
                      label:
                        dir === "rtl"
                          ? "עד עשרת אלפים שח"
                          : "maximun 10,000 ILS",
                      trigger: "areaMessage",
                    },
                    {
                      value: "20000",
                      label:
                        dir === "rtl"
                          ? "עד עשרים אלפים שח"
                          : "maximun 20,000 ILS",
                      trigger: "areaMessage",
                    },
                  ],
                },
                // Area message
                {
                  id: "areaMessage",
                  message: dir === "rtl" ? "איזור מבוקש:" : "Wanted area:",
                  trigger: "area",
                },

                // Area value
                {
                  id: "area",
                  options: [
                    {
                      value: "הצפון הישן",
                      label: dir === "rtl" ? "הצפון הישן" : "The old north",
                      trigger: "pre-review",
                    },
                    {
                      value: "הצפון החדש",
                      label: dir === "rtl" ? "הצפון החדש" : "The new north",
                      trigger: "pre-review",
                    },
                    {
                      value: "לב העיר",
                      label: dir === "rtl" ? "לב העיר" : "Center",
                      trigger: "pre-review",
                    },
                    {
                      value: "פלורנטין",
                      label: dir === "rtl" ? "פלורנטין" : "Florentin",
                      trigger: "pre-review",
                    },
                    {
                      value: "שוק הכרמל",
                      label: dir === "rtl" ? "שוק הכרמל" : "Carmel market",
                      trigger: "pre-review",
                    },
                    {
                      value: "רוטשילד",
                      label: dir === "rtl" ? "רוטשילד" : "Rotchild",
                      trigger: "pre-review",
                    },
                    {
                      value: "כרם התימנים",
                      label: dir === "rtl" ? "כרם התימנים" : "The cerem",
                      trigger: "pre-review",
                    },
                    {
                      value: "יפו",
                      label: dir === "rtl" ? "יפו" : "Jaffa",
                      trigger: "pre-review",
                    },
                  ],
                },
                // Summary of the details
                {
                  id: "pre-review",
                  message:
                    dir === "rtl"
                      ? "נהדר! הנה סיכום של הפרטים שמלאת:"
                      : "Great! here is summary of the details",
                  trigger: "review",
                },
                {
                  id: "review",
                  component: <Review />,
                  asMessage: true,
                  trigger: "update",
                },
                {
                  id: "update",
                  message:
                    dir === "rtl"
                      ? "האם ברצונך לעדכן שדה כלשהו?"
                      : "Are you want to update one of the fields?",
                  trigger: "update-question",
                },
                // Update if nesscessry
                {
                  id: "update-question",
                  options: [
                    {
                      value: "yes",
                      label: dir === "rtl" ? "כן" : "yes",
                      trigger: "update-yes",
                    },
                    {
                      value: "no",
                      label: dir === "rtl" ? "לא" : "no",
                      trigger: "end-message",
                    },
                  ],
                },
                {
                  id: "update-yes",
                  message:
                    dir === "rtl"
                      ? "איזה שדה ברצונך לעדכן?"
                      : "What field do you want to update ?",
                  trigger: "update-fields",
                },
                {
                  id: "update-fields",
                  options: [
                    {
                      value: "numberOfRooms",
                      label: dir === "rtl" ? "מספר החדרים" : "Number of rooms",
                      trigger: "update-rooms",
                    },
                    {
                      value: "area",
                      label: dir === "rtl" ? "איזור" : "Area",
                      trigger: "update-area",
                    },
                    {
                      value: "price",
                      label: dir === "rtl" ? "מחיר" : "Price",
                      trigger: "update-price",
                    },
                  ],
                },
                {
                  id: "update-rooms",
                  update: "numberOfRooms",
                  trigger: "pre-review",
                },
                {
                  id: "update-area",
                  update: "area",
                  trigger: "pre-review",
                },
                {
                  id: "update-price",
                  update: "price",
                  trigger: "pre-review",
                },
                {
                  id: "end-message",
                  message:
                    dir === "rtl"
                      ? "תודה! הפרטים נקלטו בהצלחה. אנו נדאג לעדכן אותך כשיעלו דירות רלוונטיות לאתר. מאחלים לך הרבה הצלחה במציאת הדירה הבאה שלך🥰"
                      : "Thanks! The details were sent successfully. We will make sure to update you when relevant apartments are uploaded to the site. We wish you a lot of success in finding your next apartment🥰",
                  end: true,
                },
                {
                  id: "end-message-not",
                  message:
                    dir === "rtl"
                      ? "תודה, צוות EasyRent מאחל לך בהצלחה במציאת הדירה הבאה שלך!"
                      : "Thank you, the EasyRent team wishes you success in finding your next apartment!",
                  end: true,
                },
              ]
        }
      />
    </ThemeProvider>
  );
};

export default ChatBotComp;
