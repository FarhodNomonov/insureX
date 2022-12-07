import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RowStyled, StatusContainerStyled, FlexBtn } from "./style";
import {
  ArrowNext,
  PaginationNextIcon,
  PrevNextIcon,
} from "../../../components/icon";
import { CaseTypeExtract, getRequest } from "../../../utils/requestApi";
import Loader from "../../../components/Ui/Loading/loader";
import { HomeContainer } from "../HomePage/style";
import Footer from "../../../components/Ui/FooterComponent";
import Header from "../../../components/Ui/Header";
import { StatusType } from "../../../utils/status";

function Status({ HeaderRemove = false, isActiveID = undefined }) {
  const Person = useSelector(({ user }) => user?.user);
  const location = useLocation();
  const [isActive, setisActive] = React.useState(0);
  const [isId, setIsId] = React.useState(isActiveID ?? 0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [caseData, setCaseData] = React.useState([]);
  const [isType, setIsType] = React.useState(
    CaseTypeExtract(caseData?.find((_res) => _res?.id === isId))?.link
  );

  const [StatusData, setStatusData] = React.useState(StatusType(isType));

  React.useInsertionEffect(() => {
    if (!Person?.id) return;
    if (!caseData.length) {
      setIsLoading(true);
      getRequest(`/insurance-case/?insured_person_id=${Person?.id}`)
        .then((res) => {
          setCaseData(
            res?.message?.insurance_cases
              ?.filter((status) => !status.delete)
              ?.sort((a, b) => b.id - a.id)
          );
          setIsLoading(false);
          if (Boolean(Number(location.hash) > 0)) {
            setIsId(location.hash.split("#")[1]);

            setIsType(
              CaseTypeExtract(
                res?.message?.insurance_cases
                  ?.filter((status) => !status.delete)
                  ?.find(
                    (_res) => _res?.id === Number(location.hash.split("#")[1])
                  )
              )?.name
            );

            setStatusData(
              StatusType(
                CaseTypeExtract(
                  res?.message?.insurance_cases
                    ?.filter((status) => !status.delete)
                    ?.find(
                      (_res) => _res?.id === Number(location.hash.split("#")[1])
                    )
                )?.link
              )
            );
          } else {
            setIsId(
              res?.message?.insurance_cases
                ?.filter((status) => !status.delete)
                ?.sort((a, b) => b.id - a.id)[`${isActive}`]?.id
            );

            setIsType(
              CaseTypeExtract(
                res?.message?.insurance_cases
                  ?.filter((status) => !status.delete)
                  ?.find(
                    (__respons) =>
                      __respons?.id ===
                      res?.message?.insurance_cases
                        ?.filter((status) => !status.delete)
                        ?.sort((a, b) => b.id - a.id)[`${isActive}`]?.id
                  )
              )?.link
            );

            setStatusData(
              StatusType(
                CaseTypeExtract(
                  res?.message?.insurance_cases
                    ?.filter((status) => !status.delete)
                    ?.find(
                      (__respons) =>
                        __respons?.id ===
                        res?.message?.insurance_cases
                          ?.filter((status) => !status.delete)
                          ?.sort((a, b) => b.id - a.id)[`${isActive}`]?.id
                    )
                )?.link
              )
            );
          }
        })
        .catch((err) => {
          console.log(err);
          setCaseData([]);
          setIsLoading(false);
        });
    } else {
      if (Boolean(Number(location.hash) > 0)) {
        setIsId(location.hash.split("#")[1]);

        setIsType(
          CaseTypeExtract(
            caseData
              ?.filter((status) => !status.delete)
              ?.find((_res) => _res?.id === Number(location.hash.split("#")[1]))
          )?.name
        );

        setStatusData(
          StatusType(
            CaseTypeExtract(
              caseData
                ?.filter((status) => !status.delete)
                ?.find(
                  (_res) => _res?.id === Number(location.hash.split("#")[1])
                )
            )?.link
          )
        );
      } else {
        setIsId(
          caseData
            ?.filter((status) => !status.delete)
            ?.sort((a, b) => b.id - a.id)[`${isActive}`]?.id
        );

        setIsType(
          CaseTypeExtract(
            caseData
              ?.filter((status) => !status.delete)
              ?.find(
                (__respons) =>
                  __respons?.id ===
                  caseData
                    ?.filter((status) => !status.delete)
                    ?.sort((a, b) => b.id - a.id)[`${isActive}`]?.id
              )
          )?.link
        );

        setStatusData(
          StatusType(
            CaseTypeExtract(
              caseData
                ?.filter((status) => !status.delete)
                ?.find(
                  (__respons) =>
                    __respons?.id ===
                    caseData
                      ?.filter((status) => !status.delete)
                      ?.sort((a, b) => b.id - a.id)[`${isActive}`]?.id
                )
            )?.link
          )
        );
      }
    }
    console.clear();
  }, [isType, Person?.id]);

  return (
    <HomeContainer className="flex__column__ h-100">
      <div>
        {!HeaderRemove && (
          <Header
            title={`
          ${"סטאטוס אירוע"} - ${
              location.hash.split("#")[1]
                ? CaseTypeExtract(
                    caseData.find(
                      (_res) => _res?.id === Number(location.hash.split("#")[1])
                    )
                  )?.name ?? ""
                : CaseTypeExtract(
                    caseData?.find((item) => Number(item.id) === Number(isId))
                  )?.name
            }  ${
              location.hash.split("#")[1]
                ? `(${Number(location.hash.split("#")[1])})` ?? ""
                : isId
                ? `(${isId})`
                : ""
            }`}
            text={`שלום ${Person?.first_name}`}
          />
        )}
        {isLoading && <Loader />}
        {caseData?.map((_res) => {
          return (
            <React.Fragment key={_res?.id}>
              {(Number(location.hash.split("#")[1])
                ? Number(location.hash.split("#")[1])
                : isId) === _res?.id && (
                <StatusContainerStyled>
                  {StatusData.map((item) => (
                    <RowStyled
                      onClick={() => {}}
                      key={item.id}
                      className={_res?.status_id >= item.id ? "active" : ""}
                    >
                      <p>{item.title}</p>
                      <div className="pagination__icon__">
                        <div className="icon__" />
                        <PaginationNextIcon />
                      </div>
                    </RowStyled>
                  ))}
                </StatusContainerStyled>
              )}
            </React.Fragment>
          );
        })}
        <div>
          {!location.hash && caseData.length > 1 && (
            <FlexBtn>
              <div
                className="next"
                onClick={() => {
                  setisActive(
                    caseData?.length - 1 <= isActive ? isActive : isActive + 1
                  );
                  setIsId(
                    caseData[
                      caseData?.length - 1 <= isActive ? isActive : isActive + 1
                    ]?.id
                  );
                  setIsType(
                    CaseTypeExtract(
                      caseData.find(
                        (_res) =>
                          _res?.id ===
                          caseData[
                            caseData?.length - 1 <= isActive
                              ? isActive
                              : isActive + 1
                          ]?.id
                      )
                    )?.link
                  );
                  setStatusData(
                    StatusType(
                      ["accident", "carburglary", "theftcar"]?.includes(
                        CaseTypeExtract(
                          caseData.find(
                            (_res) =>
                              _res?.id ===
                              caseData[
                                caseData?.length - 1 <= isActive
                                  ? isActive
                                  : isActive + 1
                              ]?.id
                          )
                        )?.link
                      )
                    )
                  );
                }}
              >
                <p>לאירוע הבא</p>
                <ArrowNext />
              </div>
              <div
                className="back"
                onClick={() => {
                  setisActive(isActive > 1 ? isActive - 1 : 0);
                  setIsId(caseData[isActive > 1 ? isActive - 1 : 0]?.id);
                  setIsType(
                    CaseTypeExtract(
                      caseData.find(
                        (_res) =>
                          _res?.id ===
                          caseData[isActive > 1 ? isActive - 1 : 0]?.id
                      )
                    )?.link
                  );
                  setStatusData(
                    StatusType(
                      ["accident", "carburglary", "theftcar"]?.includes(
                        CaseTypeExtract(
                          caseData.find(
                            (_res) =>
                              _res?.id ===
                              caseData[isActive > 1 ? isActive - 1 : 0]?.id
                          )
                        )?.link
                      )
                    )
                  );
                }}
              >
                <p>לאירוע הקודם</p>
                <PrevNextIcon />
              </div>
            </FlexBtn>
          )}
        </div>
      </div>
      {!HeaderRemove && <Footer />}
    </HomeContainer>
  );
}

export default Status;
