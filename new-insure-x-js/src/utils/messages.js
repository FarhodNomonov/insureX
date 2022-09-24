import { patchRequest, getFormData, postRequest } from "./requestApi";

export const Message = {
  msCustomer10: (csname) => ` פתיחת אירוע מבוטח ${csname}`,
  msCustomer11: (csname) => ` פתיחת אירוע מבוטח ${csname}`,
  msCustomer20: (csname, id) => {
    patchRequest(
      `/insurance-case/${id}`,
      getFormData({
        status_id: 2,
      })
    );
    return `תביעה שהושלמה ${csname}`;
  },
  msCustomer21: (csname, id) => {
    patchRequest(
      `/insurance-case/${id}`,
      getFormData({
        status_id: 2,
      })
    );
    return `תביעה שהושלמה ${csname}`;
  },
  msCustomer30: (nameGarage, numberEvent, nameEvent, nameCustomer) =>
    `שלום ${nameCustomer}, נפתח אירוע ${nameEvent} מס' ${numberEvent}. הרכב בדרכו למוסך ${nameGarage}`,
  msAgent30: (nameGarage, numberEvent, nameEvent, nameAgent) =>
    `שלום ${nameGarage}, נפתח אירוע ${nameEvent} מס' ${numberEvent}. הרכב בדרכו למוסך ${nameAgent}`,
  msGarage30: (nameCustomer, numberEvent, nameEvent, nameGarage) =>
    `שלום ${nameCustomer}, נפתח אירוע ${numberEvent} מס' ${nameEvent} ע"י ${nameGarage} הרכב בדרך למוסך.`,
  msCustomer31: (nameSdp, numberEvent, nameEvent, nameCustomer) =>
    `שלום ${nameCustomer}, נפתח אירוע  ${nameEvent} מס' ${numberEvent} . נבחר  ${nameSdp}`,
  msAgent31: (nameSdp, numberEvent, nameEvent, nameAgent) =>
    `שלום ${nameSdp}, נפתח אירוע  ${nameEvent} מס' ${numberEvent} . נבחר  ${nameAgent}`,
  msSdp31: (nameCustomer, numberEvent, nameEvent, nameSdp) =>
    `שלום ${nameSdp}, נפתח אירוע  ${nameEvent} מס' ${numberEvent} ע"י ${nameCustomer}`,
  msCustomer40: (nameAppraiserCmp, nameCustomer) =>
    ` שלום ${nameCustomer}, מונה שמאי מחברת השמאים ${nameAppraiserCmp} שניבחרה ע"י המערכת`,
  msAgent40: (nameAppraiserCmp, nameAgent) =>
    ` שלום ${nameAgent}, מונה שמאי מחברת השמאים ${nameAppraiserCmp} שניבחרה ע"י המערכת`,
  msCustomer41: (nameAppraiserCmp, nameCustomer) =>
    ` שלום ${nameCustomer}, מונה שמאי מחברת השמאים ${nameAppraiserCmp} שניבחרה ע"י המערכת`,
  msAgent41: (nameAppraiserCmp, nameAgent) =>
    ` שלום ${nameAgent}, מונה שמאי מחברת השמאים ${nameAppraiserCmp} שניבחרה ע"י המערכת`,
  msAppraiser50: (
    nameGarage,
    nameCustomer,
    numberEvent,
    nameEvent,
    nameAppraiser
  ) =>
    `שלום ${nameAppraiser}, נפתח אירוע ${nameEvent} מס' ${numberEvent} ע"י ${nameCustomer}, קבע שיחת וידאו עם מוסך ${nameGarage}`,
  msAppraiser51: (
    nameSdp,
    nameCustomer,
    numberEvent,
    nameEvent,
    nameAppraiser
  ) =>
    `שלום ${nameAppraiser}, נפתח אירוע ${nameEvent} מס' ${numberEvent} ע"י ${nameCustomer}, קבע שיחת וידאו עם  ${nameSdp} `,
  msCustomer60: (nameCustomer) => ` שלום ${nameCustomer}, הרכב נקלט במוסך.`,
  msAgent60: (numberEvent, nameEvent, nameAgent) =>
    `שלום ${nameAgent} , הרכב של אירוע ${nameEvent} מס' ${numberEvent} נקלט במוסך.`,
  msCustomer61: (nameSdp, numberEvent, nameEvent, nameCustomer) =>
    `${nameSdp} התקבל ע"י ${numberEvent} מס' ${nameEvent} אירוע  ${nameCustomer} שלום `,
  msAgent61: (nameSdp, numberEvent, nameEvent, nameCustomer) =>
    `שלום ${nameCustomer},אירוע ${nameEvent} מס' ${numberEvent} התקבל ע"י ${nameSdp} `,
  msGarage110: (numberEvent, nameEvent, nameAppraiser, nameGarage) =>
    `שלום ${nameGarage} , נקבע שיחת וידאו ע"י ${nameAppraiser} עבור אירוע ${nameEvent} מס' ${numberEvent}.`,
  msSdp111: (numberEvent, nameEvent, nameAppraiser, nameGarage) =>
    `שלום ${nameGarage} , נקבע שיחת וידאו ע"י ${nameAppraiser} עבור אירוע ${nameEvent} מס' ${numberEvent}.`,
  msAppraiser120: (numberEvent, nameEvent, nameGarage, nameAppraiser) =>
    ` שלום ${nameAppraiser}, שיחת הוידאו עם ${nameGarage} לאירוע ${nameEvent} מס' ${numberEvent} אושרה.`,
  msAppraiser121: (numberEvent, nameEvent, nameGarage, nameAppraiser) =>
    ` שלום ${nameAppraiser}, שיחת הוידאו עם ${nameGarage} לאירוע ${nameEvent} מס' ${numberEvent} אושרה.`,
  msAppraiser130: (numberEvent, nameEvent, nameGarage, nameAppraiser) =>
    `שלום ${nameAppraiser}, שיחת הוידאו עם ${nameGarage} לאירוע ${nameEvent} מס' ${numberEvent} נדחה.`,
  msAppraiser131: (numberEvent, nameEvent, nameSdp, nameAppraiser) =>
    `שלום ${nameAppraiser}, שיחת הוידאו עם ${nameSdp} לאירוע ${nameEvent} מס' ${numberEvent} נדחה.`,
  msCustomer70: (nameAppraiser, numberEvent, nameEvent, nameCustomer) =>
    `שלום ${nameCustomer}, בוצעה בדיקת שמאי לאירוע ${nameEvent} מס' ${numberEvent} ע"י שמאי ${nameAppraiser}`,
  msAgent70: (nameAppraiser, numberEvent, nameEvent, nameAgent) =>
    `שלום ${nameAgent}, בוצעה בדיקת שמאי לאירוע ${nameEvent} מס' ${numberEvent} ע"י שמאי ${nameAppraiser}`,
  msCustomer71: (nameAppraiser, numberEvent, nameEvent, nameCustomer) =>
    `שלום ${nameCustomer}, בוצעה בדיקת שמאי לאירוע  ${nameEvent} מס' ${numberEvent} ע"י שמאי ${nameAppraiser}`,
  msAgent71: (nameAppraiser, numberEvent, nameEvent, nameAgent) =>
    `שלום ${nameAgent}, בוצעה בדיקת שמאי לאירוע  ${nameEvent} מס' ${numberEvent} ע"י שמאי ${nameAppraiser}`,
  msCustomer80: (numberEvent, nameEvent, nameCustomer) =>
    ` שלום ${nameCustomer}, דו"ח שמאי עבור אירוע ${nameEvent} מס' ${numberEvent} נשלח לחברת הביטוח.`,
  msAgent80: (numberEvent, nameEvent, nameCustomer) =>
    ` שלום ${nameCustomer}, דו"ח שמאי עבור אירוע ${nameEvent} מס' ${numberEvent} נשלח לחברת הביטוח.`,
  msCustomer81: (numberEvent, nameEvent, nameCustomer) =>
    `שלום ${nameCustomer}, דו"ח שמאי עבור אירוע ${nameEvent} מס' ${numberEvent} נשלח לחברת הביטוח. `,
  msAgent81: (numberEvent, nameEvent, nameAgent) =>
    `שלום ${nameAgent}, דו"ח שמאי עבור אירוע ${nameEvent} מס' ${numberEvent} נשלח לחברת הביטוח. `,
  msAppraiser90: (numberEvent, nameEvent, nameAppraiser) =>
    ` שלום ${nameAppraiser}, תיקון הרכב עבור אירוע ${nameEvent}  מס' ${numberEvent} הושלם והועבר לארכיון `,
  msCustomer90: (numberEvent, nameEvent, nameCustomer) =>
    ` שלום ${nameCustomer}, תיקון הרכב עבור אירוע ${nameEvent}  מס' ${numberEvent} הושלם והועבר לארכיון `,
  msAgent90: (numberEvent, nameEvent, nameAgent) =>
    ` שלום ${nameAgent}, תיקון הרכב עבור אירוע ${nameEvent}  מס' ${numberEvent} הושלם והועבר לארכיון `,
  msAppraiser91: (numberEvent, nameEvent, nameAppraiser) =>
    `שלום ${nameAppraiser}, תיקון נזק עבור אירוע  ${nameEvent}  מס' ${numberEvent} הושלם והועבר לארכיון `,
  msCustomer91: (numberEvent, nameEvent, nameCustomer) =>
    `שלום ${nameCustomer}, תיקון נזק עבור אירוע  ${nameEvent}  מס' ${numberEvent} הושלם והועבר לארכיון `,
  msAgent91: (numberEvent, nameEvent, nameAgent) =>
    `שלום ${nameAgent}, תיקון נזק עבור אירוע  ${nameEvent}  מס' ${numberEvent} הושלם והועבר לארכיון `,
};

export const messageOther = (id, case_type) => {
  if (!id || !case_type) return;
  postRequest(
    "/insurance-case/messages/create",
    getFormData({
      type: "web-client",
      ms_text: Message.msCustomer11("Message 11  created : " + id),
      case_type,
      customer_id: JSON.parse(localStorage.getItem("insured_person") ?? "{}")
        ?.id,
      is_case_id: id,
      id: Math.floor(Math.random() * 100),
      date_time: ` ${new Date()}`,
    })
  );
};

export const messageCar = (id, case_type) => {
  if (!id || !case_type) return;
  postRequest(
    "/insurance-case/messages/create",
    getFormData({
      type: "web-client",
      ms_text: Message.msCustomer10("Message 10  created : " + id),
      case_type,
      customer_id: JSON.parse(localStorage.getItem("insured_person") ?? "{}")
        ?.id,
      is_case_id: id,
      id: Math.floor(Math.random() * 100),
      date_time: new Date(),
      is_create_case: true,
    })
  );
};
