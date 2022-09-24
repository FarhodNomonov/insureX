import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../../components/Ui/Header";
import Footer from "../../../components/Ui/FooterComponent";
import { MyDocsWrapper } from "./style";
import { getRequest } from "../../../utils/requestApi";
import Loader from "../../../components/Ui/Loading/loader";
import CardDoc from "./cardDoc";

function Events() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [caseData, setCaseData] = React.useState([]);
  const Person = useSelector(({ user }) => user?.user);

  React.useInsertionEffect(() => {
    if (!Person?.id) return;
    setIsLoading(true);
    getRequest(
      `/insurance-case/?insured_person_id=${Person?.id}${id ? `&id=${id}` : ""}`
    )
      .then(({ message }) => {
        setCaseData(
          message?.insurance_cases
            ?.filter((status) => !status.delete)
            .sort((a, b) => {
              return b.id - a.id;
            })
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setCaseData([]);
        setIsLoading(false);
      });
      console.clear();
  }, [id, Person?.id]);

  return (
    <div className="flex__column__ h-100">
      {isLoading && <Loader />}
      <div>
        <Header
          text={`שלום ${Person?.first_name}`}
          title={id ? "פרטי אירוע" : "מסמכים"}
        />
        <MyDocsWrapper>
          {caseData.map((_res) => {
            return (
              <CardDoc
                isOpened={id ? true : caseData.length === 1}
                key={_res?.id}
                _res={_res}
                isOPenDetails={id ? true : false}
              />
            );
          })}
        </MyDocsWrapper>
      </div>
      <Footer />
    </div>
  );
}

export default Events;
