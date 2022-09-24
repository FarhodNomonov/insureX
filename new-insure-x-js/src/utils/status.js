import { CaseTypeExtract } from "./requestApi";

export const StatusType = (isType) => {
  return ["accident", "carburglary", "theftcar"]?.includes(isType)
    ? [
        {
          id: 1,
          title: "פתיחת אירוע",
        },
        {
          id: 2,
          title: `ממתינים למספר תביעה השלמת את מילוי טופס התביעה`,
        },
        {
          id: 3,
          title: `התקבל מספר תביעה`,
        },
        {
          id: 4,
          title: `הרכב נקלט במוסך`,
        },
        {
          id: 5,
          title: `בוצעה בדיקת שמאי`,
        },
        {
          id: 6,
          title: `דו"ח שמאי נשלח לחברת הביטוח`,
        },
        {
          id: 7,
          title: `תיקון הרכב הושלם`,
        },
      ]
    : [
        {
          id: 1,
          title: `פתיחת אירוע`,
        },
        {
          id: 2,
          title: `ממתינים למספר תביעה השלמת את מילוי טופס התביעה`,
        },
        {
          id: 3,
          title: `התקבל מספר תביעה`,
        },
        {
          id: 4,
          title: `הקריאה התקבלה`,
        },
        {
          id: 5,
          title: `בוצעה בדיקת שמאי`,
        },
        {
          id: 6,
          title: `דו"ח שמאי נשלח לחברת הביטוח`,
        },
      ];
};

export const isCar = (_res) =>
  ["accident", "carburglary", "theftcar"].includes(CaseTypeExtract(_res).link);
