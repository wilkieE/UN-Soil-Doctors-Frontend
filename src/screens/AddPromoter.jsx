import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addPromoter, fetchPromoters } from "../redux/slices/promotersSlice.js";
import AddIcon from "@mui/icons-material/Add";
import PromoterForm from "../components/Common/PromoterForm.jsx";

const AddPromoter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.value);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [promoter, setPromoter] = useState({
    DateOfRegistration: "",
    PromoterStatus: "",
    Email: "",
    ContactPersonName: "",
    ContactPersonPosition: "",
    ActorTypeID: null,
    CountryID: null,
    Municipality: "",
    OrganizationName: "",
    OrganizationType: "",
    ExistingProgramStatus: false,
    TrainingInterest: "",
    ImplementationScale: "",
    InvolvementCapability: "",
    TargetedFarmerCommunitySize: null,
    DevelopedEducationalMaterialStatus: false,
    AccessToFunds: false,
    AgreedToTOR: false,
    Feedback: "",
    PreferredContactMeans: "",
    ReplyDate: "",
    ReplyContent: "",
    ActorType: "",
    MapInstitutionName: "",
    RegisteredInMap: false,
    Comments: "",
  });

  const handleInputChange = (e) => {
    if (e.target.name === "fundedProjectIds") {
      setPromoter({
        ...promoter,
        [e.target.name]: e.target.value.split(",").map(Number),
      });
    } else {
      setPromoter({ ...promoter, [e.target.name]: e.target.value });
    }
  };

  const lastAddedPromoter = useSelector(
    (state) => state.promoters.lastAddedPromoter
  ); // Update to work with promoters
  const [addPromoterAttempted, setAddPromoterAttempted] = useState(false);

  const handleModalClose = () => {
    setModalIsOpen(false);
    setAddPromoterAttempted(false);
    dispatch(fetchPromoters());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addPromoter(promoter));
      setAddPromoterAttempted(true);
    } catch (error) {
      console.error("Error adding promoter:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="border border-gray-400 rounded px-4 py-2 flex items-center"
      >
        <AddIcon className="mr-2" />
        {t("Add Participant")}
      </button>
      {modalIsOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-5/6 mx-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                onClick={handleModalClose}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <span>Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Add New Actor
                </h3>
                <PromoterForm
                  promoter={promoter}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  formType="Add"
                />
                {addPromoterAttempted && (
                  <>
                    {lastAddedPromoter && (
                      <p className="text-green-500">
                        Actor was added successfully.
                      </p>
                    )}
                    {!lastAddedPromoter && (
                      <p className="text-red-500">Failed to add Actor.</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPromoter;
