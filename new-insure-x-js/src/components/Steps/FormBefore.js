import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Ui/Button/Button";
import { AccordArrowIcon, Phone, Search } from "../../components/icon";
import { SearchWrapper } from "../../pages/customer/messages/style";
import { WrapperInput } from "../../pages/customer/RegisterPage/style";
import { SelectComponent } from "../../components/Ui/FormElements/FormElements";
import {
  RegionCache,
  patchRequest,
  getFormData,
  postRequest,
} from "../../utils/requestApi";
import { Message } from "../../utils/messages";

export default function FormBeforeSubmit({
  currentPage,
  setCurrentPage,
  setIsLoading = () => {},
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
  const GlobalState = useSelector((s) => s);
  const [insidentCompany, setInsidentCompany] = React.useState(false);
  const [sdpData, setSdpData] = React.useState([]);
  const [cityId, setCityId] = React.useState(null);
  const [regionId, setRegionId] = React.useState(null);
  const [inputText, setInputText] = React.useState("");
  const [isSdpPhone, setIsSdpPhone] = React.useState(false);
  const [cityData, setCityData] = React.useState(
    GlobalState?.cityRegion?.city?.map((item) => ({
      value: item?.id,
      label: item?.city_name,
      region_id: item?.region_id,
    }))
  );
  const CaseID = JSON.parse(localStorage.getItem(storageName) ?? "{}")?.report
    ?.insurance_case?.id;
  const reportStorage = JSON.parse(localStorage.getItem(storageName) ?? "{}");
  const Person = JSON.parse(localStorage.getItem("insured_person") ?? "{}");

  React.useInsertionEffect(() => {
    if (cityId) {
      if (regionId) {
        setSdpData(
          GlobalState?.sdp
            ?.filter((fs) =>
              fs?.supplier_type_ids?.some(
                (v) => suppliyerType?.indexOf(v) !== -1
              )
            )
            ?.filter(
              (resp) =>
                Number(resp.city_id) === Number(cityId) &&
                Number(resp.region_id) === Number(regionId)
            )
        );
      } else {
        setSdpData(
          GlobalState?.sdp
            ?.filter((fs) =>
              fs?.supplier_type_ids?.some(
                (v) => suppliyerType?.indexOf(v) !== -1
              )
            )
            ?.filter((resp) => Number(resp.city_id) === Number(cityId))
        );
      }
    }
    if (regionId) {
      setCityData(
        GlobalState?.cityRegion?.city
          ?.filter((city) => city?.region_id === regionId)
          ?.map((resp) => ({
            value: resp?.id,
            label: resp?.city_name,
            region_id: regionId,
          }))
      );
      if (cityId) {
        setSdpData(
          GlobalState?.sdp
            ?.filter((fs) =>
              fs?.supplier_type_ids?.some(
                (v) => suppliyerType?.indexOf(v) !== -1
              )
            )
            ?.filter(
              (resp) =>
                Number(resp.city_id) === Number(cityId) &&
                Number(resp.region_id) === Number(regionId)
            )
        );
      } else {
        setSdpData(
          GlobalState?.sdp
            ?.filter((fs) =>
              fs?.supplier_type_ids?.some(
                (v) => suppliyerType?.indexOf(v) !== -1
              )
            )
            ?.filter((resp) => Number(resp.region_id) === Number(regionId))
        );
      }
    } else if (!cityId && !regionId) {
      setCityData(
        GlobalState?.cityRegion?.city?.map((item) => ({
          value: item?.id,
          label: item?.city_name,
          region_id: item?.region_id,
        }))
      );
      setSdpData(
        GlobalState?.sdp?.filter((fs) =>
          fs?.supplier_type_ids?.some((v) => suppliyerType?.indexOf(v) !== -1)
        )
      );
    }
  }, [cityId, regionId, GlobalState, suppliyerType]);

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
  const SdpPatch = React.useCallback(
    (id) => {
      if (CaseID && id) {
        setIsLoading(true);
        patchRequest(
          `/insurance-case/${CaseID}`,
          getFormData({
            sdp_id: id,
            agent_id: reportStorage?.report?.insurance_case?.agent_id,
          })
        )
          .then(({ message }) => {
            setIsLoading(false);

            const AppraiserComp = GlobalState?.appraiserCmp?.find(
              (app) =>
                Number(app?.id) ===
                Number(
                  message?.insurance_case?.insured_event?.appraisal_company_id
                )
            );

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
                ms_spec_text: Message.msSdp31(
                  Person?.first_name,
                  reportStorage?.report?.insurance_case?.id ??
                    hash.split("#")[1],
                  pageName,
                  GlobalState?.sdp?.find((res) => Number(res.id) === Number(id))
                    ?.first_name
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

            postRequest(
              "/insurance-case/messages/create",
              getFormData({
                type: "web-client",
                date_time: new Date(),
                ms_agent_text: Message.msAgent41(
                  AppraiserComp?.appraisal_company_name,
                  GlobalState?.agents?.find(
                    (ag) =>
                      Number(ag.id) ===
                      Number(message?.insurance_case?.agent_id)
                  )?.first_name
                ),
                agent_id: message?.insurance_case?.agent_id,
                is_case_id: message?.insurance_case?.id,
                id: Math.floor(Math.random() * 100),
                admin_type: true,
                is_create_case: true,
                user_type: "event_create",
                user_name: "new event_created",
              })
            );
          })
          .catch(() => {
            setIsLoading(false);
          });
      }
    },
    [CaseID, reportStorage, pageName, GlobalState, Person, hash, setIsLoading]
  );

  return (
    <>
      {currentPage === firstPage && (
        <div className="form_before">
          <h1>
            {[2, 4].includes(suppliyerType) ? "בחר מוסך" : "בחר בעל מקצוע"}
          </h1>
          <SearchWrapper>
            <input type="text" onChange={inputHandler} placeholder="חיפוש" />
            <Search />
          </SearchWrapper>
          <WrapperInput style={{ margin: "10px 0" }}>
            <WrapperInput style={{ margin: "10px 0" }}>
              <SelectComponent
                name={`region_id`}
                placeholder="אזור"
                value={RegionCache() ?? []}
                setRselect={setRegionId}
                defaultValue={RegionCache().filter(
                  (item) => item.value === regionId
                )}
                setValue={RegionCache().filter(
                  (item) => item.value === regionId
                )}
              />
            </WrapperInput>
            <SelectComponent
              name={`city_id`}
              placeholder="עיר"
              value={
                cityData?.filter((item) =>
                  regionId ? Number(item.region_id) === Number(regionId) : true
                ) ?? []
              }
              setRselect={setCityId}
              defaultValue={cityData?.filter((item) => item.value === cityId)}
              setValue={cityData?.filter((item) => item.value === cityId)}
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
                value={
                  cityData?.filter((item) =>
                    regionId
                      ? Number(item.region_id) === Number(regionId)
                      : true
                  ) ?? []
                }
                setRselect={setCityId}
                defaultValue={cityData?.filter((item) => item.value === cityId)}
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
