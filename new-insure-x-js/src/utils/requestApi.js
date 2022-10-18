import axios from "axios";
import toast from "react-hot-toast";
import { allCities } from "./static";

export const _URL = "https://api.insurextest.link/api"; // https://api.insurextest.link/api

export const typeCase = [
  {
    event_type_id: 1,
    property_type_id: 1,
    link: "accident",
    name: "תאונת דרכים",
    icon: "accident",
  },
  {
    event_type_id: 3,
    property_type_id: 1,
    link: "carburglary",
    name: "פריצה",
    icon: "carburglary",
  },
  {
    event_type_id: 5,
    property_type_id: 1,
    link: "theftcar",
    name: "גניבה",
    icon: "theftcar",
  },
  {
    event_type_id: 9,
    property_type_id: 2,
    link: "nature-damage-home",
    name: "נזקי טבע",
    icon: "nature",
  },
  {
    event_type_id: 9,
    property_type_id: 3,
    link: "nature-damage-office",
    name: "נזקי טבע",
    icon: "nature",
  },
  {
    event_type_id: 2,
    property_type_id: 2,
    link: "water-damage-home",
    name: "מים",
    icon: "water",
  },
  {
    event_type_id: 2,
    property_type_id: 3,
    link: "water-damage-office",
    name: "מים",
    icon: "water",
  },
  {
    event_type_id: 4,
    property_type_id: 2,
    link: "fire-damage-home",
    name: "אש",
    icon: "fire",
  },
  {
    event_type_id: 4,
    property_type_id: 3,
    link: "fire-damage-office",
    name: "אש",
    icon: "fire",
  },
  {
    event_type_id: 6,
    property_type_id: 2,
    link: "burglary-home",
    name: "פריצה / גניבה",
    icon: "burglary",
  },
  {
    event_type_id: 6,
    property_type_id: 3,
    link: "burglary-office",
    name: "פריצה / גניבה",
    icon: "burglary",
  },
  {
    event_type_id: 7,
    property_type_id: 2,
    link: "person-3d-home",
    name: "צד שלישי",
    icon: "person-3d",
  },
  {
    event_type_id: 7,
    property_type_id: 3,
    link: "person-3d-office",
    name: "צד שלישי",
    icon: "person-3d",
  },
  {
    event_type_id: 8,
    property_type_id: 2,
    link: "others-home",
    name: "אחר",
    icon: "other",
  },
  {
    event_type_id: 8,
    property_type_id: 3,
    link: "others-office",
    name: "אחר",
    icon: "other",
  },
];

export const getFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};

const accessJWT = () => localStorage.getItem("token");

export const postSignIn = (formData) => {
  const res = fetch(`${_URL}/account`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessJWT()} `,
    },
  }).then((r) => r.json());
  return res;
};

export const postSignInCustomer = (formData) => {
  const res = fetch(`${_URL}/insured-persons`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessJWT()} `,
    },
  }).then((r) => r.json());
  return res;
};

export const postSignInAgent = (formData) => {
  const res = fetch(`${_URL}/agents`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessJWT()} `,
    },
  }).then((r) => r.json());

  return res;
};

export const postSignUp = (url, formData) => {
  const res = fetch(`${_URL}${url}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessJWT()} `,
    },
  }).then((r) => r.json());

  return res;
};

export const postLogin = (formData) => {
  const res = fetch(`${_URL}/account/login`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessJWT()} `,
    },
    body: formData,
  }).then((r) => r.json());

  return res;
};

export const loginAppraiser = (formData) => {
  const res = fetch(`${_URL}/appraisers/login/`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessJWT()} `,
    },
  }).then((r) => r.json());

  return res;
};

export const getRequest = async (url) => {
  const { data } = await axios.get(`${_URL + url}`);

  return data ?? [];
};

export const postRequest = async (url, formData) => {
  const data = await fetch(`${_URL + url}`, {
    method: "POST",
    body: formData,
  })
    .then((r) => r.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("error", err);
    });

  return data ?? [];
};

export const postFile = async (url, formData) => {
  const data = await fetch(`${_URL + url}`, {
    method: "POST",
    body: formData,
  })
    .then((r) => r.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("error", err);
    });

  return data ?? [];
};

export const patchRequest = async (url, formData) => {
  const data = await fetch(`${_URL + url}`, {
    method: "PATCH",
    body: formData,
  })
    .then((r) => r.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("error", err);
    });

  return data ?? [];
};

export const deleteRequest = async (url) => {
  const data = await fetch(`${_URL + url}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("error", err);
    });

  return data ?? [];
};

export const onSavePhoto = (e, setIsLoading, isCaseId, folder) => {
  if (!folder) {
    toast.error("אנא בחר תיקיה");
    return;
  }
  if (e?.target?.files[0]?.size > 52428800) {
    alert("נא נסה שוב הקובץ גדול מ- 50 מגה-בתים,");
    return;
  }

  if (isCaseId) {
    let file = Object.assign({}, e.target.files[0], {
      name: `${isCaseId}.${new Date().toLocaleString("lt", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })}.${e.target.files[0].type?.split("/")[1]}`,
    });
    let formData = new FormData();
    delete e.target.files[0].name;
    formData.append("file", e.target.files[0], file.name);
    console.log(formData.get("file"), "22323232");

    setIsLoading(true);

    const data = patchRequest(
      `/insurance-case/${isCaseId}/upload-files?folder=${folder}`,
      formData
    ).then((data) => {
      setIsLoading(false);
      return data;
    });
    return data;
  }
};

export const CaseTypeExtract = (data) => {
  return typeCase?.find(
    (item) =>
      item.event_type_id === data?.event_type_id &&
      item.property_type_id === data?.property_type_id
  );
};

export const CityCache = () => {
  let customData = allCities?.map((item) => {
    return {
      value: item.id,
      label: item.city_name,
    };
  });
  return customData ?? [];
};

export const RegionCache = () => {
  let data = localStorage.getItem("region")
    ? JSON.parse(localStorage.getItem("region"))
    : [];

  let customData = data?.map((item) => {
    return {
      value: item.id,
      label: item.region_name,
    };
  });
  return customData ?? [];
};

export const StatusName = (item) => {
  const StatusData = ["accident", "carburglary", "theftcar"]?.includes(
    CaseTypeExtract(item)?.link
  )
    ? [
        {
          id: 1,
          title: "פתיחת אירוע תאונת דרכים",
        },
        {
          id: 2,
          title: `השלמת את מילוי טופס התביעה \n,ממתינים למספר תביעה`,
        },
        {
          id: 3,
          title: "התקבל מספר תביעה",
        },
        {
          id: 4,
          title: "הרכב נקלט במוסך",
        },
        {
          id: 5,
          title: "בוצעה בדיקת שמאי",
        },
        {
          id: 6,
          title: `דו"ח שמאי נשלח לחברת הביטוח`,
        },
        {
          id: 7,
          title: "ממתינים לאישור חברת הביטוח",
        },
        {
          id: 8,
          title: "הרכב בתיקון במוסך",
        },
        {
          id: 9,
          title: "תיקון הרכב הושלם",
        },
      ]
    : [
        {
          id: 1,
          title: "פתיחת אירוע תאונת דרכים",
        },
        {
          id: 2,
          title: `השלמת את מילוי טופס התביעה \n,ממתינים למספר תביעה`,
        },
        {
          id: 3,
          title: "התקבל מספר תביעה",
        },
        {
          id: 4,
          title: "בוצעה בדיקת שמאי",
        },
        {
          id: 5,
          title: `דו"ח שמאי נשלח לחברת הביטוח`,
        },
        {
          id: 6,
          title: "ממתינים לאישור חברת הביטוח",
        },
      ];
  return StatusData.find((_item) => Number(_item.id) === Number(item.status_id))
    ?.title;
};

export const successMessage = (message) => toast.success(message);

export const errorMessage = (message) => toast.error(message);

export const makeid = (length) => {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const UrlToFileData = (url, setIsLoading, id) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function (e) {
    if (this.status === 200) {
      const blob = this.response;
      e.target.files = [
        new File(
          [blob],
          `insured_event${new Date().toLocaleDateString()}.png`,
          { type: "image/png" }
        ),
      ];
      OnsavePDF(e, id);
      setIsLoading(false);
    }
  };
  xhr.send();
};

export const OnsavePDF = (e, isCaseId) => {
  let formdata = new FormData();
  formdata.append("file", e.target.files[0], e.target.files[0].name);
  formdata.append("folder_type", "images");

  fetch(
    `https://api.insurextest.link/api/insurance-case/${isCaseId}/upload-files`,
    {
      method: "PATCH",
      body: formdata,
      redirect: "follow",
    }
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export async function downloadImageData(data) {
  const canvas = document.createElement("canvas");
  canvas.width = data.width;
  canvas.height = data.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.putImageData(data, 0, 0);
  const dataURL = canvas.toDataURL();
  const link = document.createElement("a");
  link.download = "capture.png";
  link.href = dataURL;

  document.body.appendChild(link);
  link.click();

  link.remove();
  canvas.remove();
}

export const PostPDF = (data) => {
  const respons = axios
    .post(`${_URL}/insurance-case/upload/pdf`, data)
    .then((response) => response);

  return respons;
};
