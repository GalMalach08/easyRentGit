const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const Mailgen = require("mailgen");
require("dotenv").config();

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: "malachtest123@gmail.com ",
      pass: "gxzrbiomlybsvner",
    },
  })
);

// Send email to reset the password
const sendResetPasswordEmail = async (
  userEmail,
  firstname,
  lastname,
  preferredLang
) => {
  try {
    const isEnglish = preferredLang === "en" ? true : false;

    const password = Math.random().toString(36).slice(2);

    let mailGenerator = new Mailgen({
      theme: "salted",
      textDirection: isEnglish ? "ltr" : "rtl",
      product: {
        name: "EasyRent",
        link: `https://easyrent2023.herokuapp.com`,
        logo: "https://media-exp1.licdn.com/dms/image/C4D0BAQFZSpiPmia0_g/company-logo_200_200/0/1602490826294?e=2159024400&v=beta&t=YXwKoDpJDGFfGr6IPdPQnrQNebphuur9EL9L4uS-Ybk",
        logoHeight: "100px",
      },
    });
    const email = {
      body: {
        title: isEnglish
          ? `<h2>Password update for ${firstname} ${lastname}</h2>`
          : `<h2>עדכון סיסמה עבור ${firstname} ${lastname}</h2>`,
        action: {
          instructions: isEnglish
            ? `<h3> Your new password for EasyRent website is ${password}</h3>`
            : `<h3>סיסמתך החדשה לאתר EasyRent היא ${password}</h3>`,
          button: {
            color: "#22BC66",
            text: isEnglish
              ? "Click here to sign up"
              : "לחץ על מנת להתחבר לאתר",
            link: `https://easyrent2023.herokuapp.com/signin`,
          },
        },
        outro: isEnglish
          ? "Need any help ? just replay to this email and we will be happy to help"
          : "צריך עזרה? הגב לאימייל זה ונשמח לעזור",
      },
    };
    let emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "EasyRent",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return {
      success: true,
      password,
    };
  } catch (error) {
    throw error;
  }
};

// Send to all users that their preferences are equal to asset that uploaded
const sendRelevantAssetEmail = async (
  userEmail,
  asset,
  name,
  preferredLang
) => {
  try {
    const isEnglish = preferredLang === "en" ? true : false;
    let mailGenerator = new Mailgen({
      theme: "salted",
      textDirection: isEnglish ? "ltr" : "rtl",
      product: {
        name: "EasyRent",
        link: `https://easyrent2023.herokuapp.com`,
        logo: "https://media-exp1.licdn.com/dms/image/C4D0BAQFZSpiPmia0_g/company-logo_200_200/0/1602490826294?e=2159024400&v=beta&t=YXwKoDpJDGFfGr6IPdPQnrQNebphuur9EL9L4uS-Ybk",
        logoHeight: "100px",
      },
    });
    const email = {
      body: {
        title: isEnglish
          ? `<h2>Hello ${name} we found relvant property that uploaded to the website</h2>`
          : `<h2>שלום ${name} מצאנו עבורך נכס רלוונטי שעלה לאתר</h2>`,
        action: {
          instructions: isEnglish
            ? `<h3>The property is in ${asset.englishAddress}, includes ${asset.roomsNumber} rooms and the price is ${asset.pricePerMonth} per month</h3>`
            : `<h3>הנכס נמצא בכתובת ${asset.address}, כולל ${asset.roomsNumber} חדרים ובמחיר של ${asset.pricePerMonth} לחודש</h3>`,
          button: {
            color: "#22BC66",
            text: isEnglish
              ? "Click here to see more details"
              : "כנס לקישור על מנת לקבל פרטים נוספים",
            link: `https://easyrent2023.herokuapp.com/asset/${asset._id}`,
          },
        },
        outro: isEnglish
          ? "Need any help ? just replay to this email and we will be happy to help"
          : "צריך עזרה? הגב לאימייל זה ונשמח לעזור",
      },
    };
    let emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "EasyRent",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

// Send when the asset is approved
const sendAssetApprovedEmail = async (
  userEmail,
  asset,
  name,
  preferredLang
) => {
  try {
    const isEnglish = preferredLang === "en" ? true : false;

    let mailGenerator = new Mailgen({
      theme: "salted",
      textDirection: isEnglish ? "ltr" : "rtl",
      product: {
        name: "EasyRent",
        link: `https://easyrent2023.herokuapp.com`,
        logo: "https://media-exp1.licdn.com/dms/image/C4D0BAQFZSpiPmia0_g/company-logo_200_200/0/1602490826294?e=2159024400&v=beta&t=YXwKoDpJDGFfGr6IPdPQnrQNebphuur9EL9L4uS-Ybk",
        logoHeight: "100px",
      },
    });
    const email = {
      body: {
        title: isEnglish
          ? `<h2>Hello ${name} your propery uploaded successfully to EasyRent websitw </h2>`
          : `<h2>שלום ${name} הנכס שלך הועלה בהצלחה לאתר EasyRent </h2> `,
        action: {
          instructions: isEnglish
            ? `<h3>The property in ${asset.englishAddress} street has uploaded successfully</h3>
          <h3>Now all our users will be exposed to it and we are sure you will be able to rent it out soon</h3>
          <h5>Regards, EasyRent Team</h5>`
            : `<h3>הנכס ברחוב ${asset.address} שעלה לאתר שלנו נבדק ואושר</h3>
          <h3>כעת כל גולשינו יהיה חשופים אליו ואנחנו בטוחים שתצליח להשכיר אותו במהרה</h3>
          <h5>בברכה, צוות EasyRent</h5>`,
          button: {
            color: "#22BC66",
            text: isEnglish
              ? "Click here to see the property"
              : "כנס לקישור על מנת לצפות בנכס",
            link: `https://easyrent2023.herokuapp.com/myassets/${asset.userId}`,
          },
        },
        outro: isEnglish
          ? "Need any help ? just replay to this email and we will be happy to help"
          : "צריך עזרה? הגב לאימייל זה ונשמח לעזור",
      },
    };
    let emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "EasyRent",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

// Send when the asset is approved
const sendVerificationMail = async (userEmail, name, token, preferredLang) => {
  try {
    const isEnglish = preferredLang === "en" ? true : false;
    let mailGenerator = new Mailgen({
      theme: "salted",
      textDirection: isEnglish ? "ltr" : "rtl",
      product: {
        name: "EasyRent",
        link: `https://easyrent2023.herokuapp.com`,
        logo: "https://media-exp1.licdn.com/dms/image/C4D0BAQFZSpiPmia0_g/company-logo_200_200/0/1602490826294?e=2159024400&v=beta&t=YXwKoDpJDGFfGr6IPdPQnrQNebphuur9EL9L4uS-Ybk",
        logoHeight: "100px",
      },
    });
    const email = {
      body: {
        title: isEnglish
          ? `<h2>Hello ${name} and welcome to EasyRent </h2> `
          : `<h2>שלום ${name} וברוכה הבאה לEasyRent </h2> `,
        action: {
          instructions: isEnglish
            ? `<h3> Click here to verify your account </h3>
               <h3> Regards,Easyrent team </h3>`
            : `<h3> לחץ כאן על מנת לאמת את החשבון שלך </h3>
               <h5>בברכה, צוות EasyRent</h5>`,
          button: {
            color: "#22BC66",
            text: isEnglish ? "Verify your account" : "אמת את חשבונך",
            link: `https://easyrent2023.herokuapp.com/user/verification?t=${token}`,
          },
        },
        outro: isEnglish
          ? "Need any help ? just replay to this email and we will be happy to help"
          : "צריך עזרה? הגב לאימייל זה ונשמח לעזור",
      },
    };
    let emailBody = mailGenerator.generate(email);

    let message = {
      from: "malachtest123@gmail.com ",
      to: userEmail,
      subject: "EasyRent",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendResetPasswordEmail,
  sendRelevantAssetEmail,
  sendAssetApprovedEmail,
  sendVerificationMail,
};
