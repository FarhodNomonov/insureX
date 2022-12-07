import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Ui/Button/Button";
import { AccordArrowIcon, Phone, Search } from "../../components/icon";
import { SearchWrapper } from "../../pages/customer/messages/style";
import { WrapperInput } from "../../pages/customer/RegisterPage/style";
import { SelectComponent } from "../../components/Ui/FormElements/FormElements";
import {
  CityCache,
  RegionCache,
  patchRequest,
  getFormData,
  postRequest,
} from "../../utils/requestApi";
import { Message } from "../../utils/messages";

export default function FormBeforeSubmit({
  currentPage,
  setCurrentPage,
  setIsLoading,
  firstPage,
  secondPage,
  storageName,
  storagePage,
  isReset = false,
  btnOpen = false,
  pageName = "",
  suppliyerType,
}) {
  if (currentPage === firstPage && isReset) {
    localStorage.removeItem(storagePage);
    localStorage.removeItem(storageName);
    window.location.reload();
  }

  const { hash } = useLocation();
  const navigate = useNavigate();
  const GlobalState = useSelector((state) => state);
  const [insidentCompany, setInsidentCompany] = React.useState(false);
  const [sdpData, setSdpData] = React.useState([]);
  const [cityId, setCityId] = React.useState(null);
  const [regionId, setRegionId] = React.useState(null);
  const [inputText, setInputText] = React.useState("");
  const [isSdpPhone, setIsSdpPhone] = React.useState(false);
  const CaseID = JSON.parse(localStorage.getItem(storageName) ?? "{}")?.report
    ?.insurance_case?.id;
  const reportStorage = JSON.parse(localStorage.getItem(storageName) ?? "{}");

  const Person = JSON.parse(localStorage.getItem("insured_person"));

  React.useInsertionEffect(() => {
    if (cityId) {
      if (regionId) {
        setSdpData(
          GlobalState?.sdp
            ?.filter((fs) => fs.supplier_type_ids?.includes(suppliyerType))
            ?.filter(
              (resp) => resp.city_id === cityId && resp.region_id === regionId
            )
        );
      } else {
        setSdpData(
          GlobalState?.sdp
            ?.filter((fs) => fs.supplier_type_ids?.includes(suppliyerType))
            ?.filter((resp) => resp.city_id === cityId)
        );
      }
    }
    if (regionId) {
      if (cityId) {
        setSdpData(
          GlobalState?.sdp?.filter(
            (resp) => resp.city_id === cityId && resp.region_id === regionId
          )
        );
      } else {
        setSdpData(
          GlobalState?.sdp?.filter((resp) => resp.region_id === regionId)
        );
      }
    } else if (!cityId && !regionId)
      setSdpData(
        GlobalState?.sdp?.filter((fs) =>
          fs.supplier_type_ids?.includes(suppliyerType)
        )
      );
  }, [cityId, regionId, GlobalState?.sdp]);

  React.useInsertionEffect(() => {
    document.getElementById("root").scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const filteredData = sdpData?.filter((el) => {
    //if no input the return the original
    if (inputText === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return (
        el.first_name?.toLowerCase().includes(inputText) ||
        el.second_name?.toLowerCase().includes(inputText)
      );
    }
  });

  const inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const SdpPatch = (id) => {
    if (CaseID && id) {
      setIsLoading(true);
      patchRequest(`/insurance-case/sdp/${CaseID}/${id}`)
        .then((__respons) => {
          if (!__respons.error) {
            setIsLoading(false);
            postRequest(
              "/insurance-case/messages/create",
              getFormData({
                type: "web-client",
                spec_id: id,
                ms_text: Message.msCustomer31(
                  GlobalState?.sdp?.find((res) => Number(res.id) === Number(id))
                    ?.first_name,
                  reportStorage?.report?.insurance_case?.id ??
                    hash.split("#")[1],
                  pageName,
                  Person?.first_name
                ),
                ms_agent_text: Message.msAgent30(
                  GlobalState?.sdp?.find((res) => Number(res.id) === Number(id))
                    ?.first_name,
                  CaseID,
                  pageName,
                  GlobalState?.agents?.find(
                    (res) =>
                      res.id === reportStorage?.report?.insurance_case?.agent_id
                  )?.first_name
                ),
                agent_id: reportStorage?.report?.insurance_case?.agent_id,
                case_type: "other",
                id: Math.floor(Math.random() * 100),
                customer_id: JSON.parse(
                  localStorage.getItem("insured_person") ?? "{}"
                )?.id,
                is_case_id:
                  reportStorage?.report?.insurance_case?.id ??
                  hash.split("#")[1],
                date_time: new Date(),
              })
            );
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      {currentPage === firstPage && (
        <div className="form_before">
          <SearchWrapper>
            <input type="text" onChange={inputHandler} placeholder="חיפוש" />
            <Search />
          </SearchWrapper>
          <WrapperInput style={{ margin: "10px 0" }}>
            <SelectComponent
              name={`city_id`}
              placeholder="אזור"
              value={CityCache() ?? []}
              setRselect={setCityId}
              defaultValue={CityCache().filter((item) => item.value === cityId)}
              setValue={CityCache().filter((item) => item.value === cityId)}
            />
          </WrapperInput>
          <WrapperInput style={{ margin: "10px 0" }}>
            <SelectComponent
              name={`region_id`}
              placeholder="אזור"
              value={RegionCache() ?? []}
              setRselect={setRegionId}
              defaultValue={RegionCache().filter(
                (item) => item.value === regionId
              )}
              setValue={RegionCache().filter((item) => item.value === regionId)}
            />
          </WrapperInput>
          {(cityId || regionId) && (
            <Button
              style={{
                marginBottom: 10,
              }}
              onClick={() => {
                setRegionId(null);
                setCityId(null);
              }}
            >
              כל המומחים
            </Button>
          )}
          <div className="list_search_result">
            {sdpData?.length === 0 && <p>לא נמצאו תוצאות</p>}

            {(inputText.length > 0 ? filteredData : sdpData).map((item) => {
              return (
                <div
                  onClick={() => setInsidentCompany(item?.id)}
                  key={item?.id}
                  className={`list_search_result__item ${
                    insidentCompany === item?.id ? "active" : ""
                  }`}
                >
                  <p>{`${item?.first_name} ${item?.second_name}`}</p>
                  <AccordArrowIcon />
                </div>
              );
            })}
          </div>
          {insidentCompany && (
            <div className="list_btn_bottom">
              <Button
                onClick={() => {
                  SdpPatch(insidentCompany);
                  setInsidentCompany(false);
                  setCurrentPage(currentPage + 1);
                }}
                className="list_btn"
              >
                {btnOpen ? "הזמנת" : "בחר בעל מקצוע"}
              </Button>
              {btnOpen && (
                <Button
                  onClick={() => {
                    SdpPatch(insidentCompany);
                    localStorage.removeItem(storageName);
                    localStorage.removeItem(storagePage);
                    navigate("/" + localStorage.getItem("role") ?? "customer");
                  }}
                  className="list_btn"
                >
                  הגעה עצמית למוסך
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      {secondPage === 8 && (
        <div className="form_before">
          <h1>הזמנת גרר</h1>
          <div className="form_before__content">
            {isSdpPhone && (
              <a href={`tel:${isSdpPhone}`}>
                <div className="phone_title">
                  <h1>{isSdpPhone}</h1>
                  <p style={{ lineHeight: "16px" }}>התקשר לגרר משה ובניו</p>
                </div>
                <div className="phone_svg">
                  <Phone />
                </div>
              </a>
            )}
            <SearchWrapper>
              <input type="text" onChange={inputHandler} placeholder="חיפוש" />
              <Search />
            </SearchWrapper>
            <WrapperInput style={{ margin: "10px 0" }}>
              <SelectComponent
                name={`city_id`}
                placeholder="אזור"
                value={CityCache() ?? []}
                setRselect={setCityId}
                defaultValue={CityCache().filter(
                  (item) => item.value === cityId
                )}
              />
            </WrapperInput>
            <WrapperInput style={{ margin: "10px 0" }}>
              <SelectComponent
                name={`city_id`}
                placeholder="אזור"
                value={RegionCache() ?? []}
                setRselect={setRegionId}
                defaultValue={RegionCache().filter(
                  (item) => item.value === regionId
                )}
              />
            </WrapperInput>
            <div className="list_search_result list_space_bettween">
              {(inputText.length > 0 ? filteredData : sdpData).map((item) => {
                return (
                  <div
                    onClick={() => {
                      setInsidentCompany(item?.id);
                      setIsSdpPhone(item?.phone);
                    }}
                    key={item?.id}
                    className={`list_search_result__item ${
                      insidentCompany === item?.id ? "active" : ""
                    }`}
                  >
                    <div className="list_search_svg">
                      <Phone />
                    </div>
                    <div className="list_search_result__item_in">
                      <p>{`${item?.first_name} ${item?.second_name}`}</p>
                      <AccordArrowIcon />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "25px" }} className="list_btn_bottom">
              <Button
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  localStorage.removeItem(storageName);
                  localStorage.removeItem(storagePage);
                  navigate("/" + localStorage.getItem("role") ?? "customer");
                }}
              >
                דלג למסך הבא
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
