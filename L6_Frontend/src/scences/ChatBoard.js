import React, { useEffect, useState, version } from "react";
import { Form, json, useNavigate } from "react-router-dom";
import { Sidebar, Deviations } from "../components/chatBoard/main";
import Loader from "../components/common/Loader";

export default function ChatBoard() {
  // for navigation
  const navigate = useNavigate();
  // to store templates and userHistory companies
  const dummyResult = {
    uploaded_pdf: "",
    highlighted_pdf: "",
    summary: "",
    ner_dic: "",
    compare_dic: "",
  };

  const [settings, setSettings] = useState({
    mode: "",
    version: "",
    url: "",
  });
  const [settingsStatus, setSettingsStatus] = useState("none");
  const [result, setResult] = useState(dummyResult);
  const [resultStatus, setResultStatus] = useState("none");
  const [templates, setTemplates] = useState([]);
  const [company, setCompany] = useState([]);
  const [uniqueEntities, setUniqueEntities] = useState([]);
  const [uploadedData, setUpLoadedData] = useState({
    company: "",
    templateUrl: "",
  });

  // parse ner
  const extractUniqueEntities = (nerData) => {
    const uniqueEntitiesSet = new Set();
    const uniqueEntitiesList = [];

    nerData.forEach((item) => {
      if (item.value[0] !== "CARDINAL" && !uniqueEntitiesSet.has(item.key)) {
        uniqueEntitiesSet.add(item.key);
        uniqueEntitiesList.push(item);
      }
    });

    setUniqueEntities(uniqueEntitiesList);
  };

  // whene user selects template
  const handleTemplateSelect = (url) => {
    document.getElementById("enter_company_name").showModal();
    document.getElementById("ctmodal").click();

    setUpLoadedData({ ...uploadedData, templateUrl: url });
  };

  const [otherSelected, setOtherSelected] = useState(false);

  // whene user selects company template
  const handleCompanySelect = (url, companyName) => {
    document.getElementById("ctmodal").click();

    setUpLoadedData({
      ...uploadedData,
      templateUrl: url,
      company: companyName,
    });
    document.getElementById("fileInputButton").click();
  };

  // view history
  const viewHistory = (data) => {
    extractUniqueEntities(data.ner_dic);
    const newCompare = data.compare_dic?.filter((tuple) => {
      return tuple[1] && tuple[1].trim() !== "false";
    });

    setResult(() => ({
      uploaded_pdf: data.uploaded_pdf,
      highlighted_pdf: data.highlighted_pdf,
      summary: data.summary,
      ner_dic: uniqueEntities,
      compare_dic: newCompare,
    }));

    document.getElementById("modal2_close").click();
    setResultStatus("present");
  };

  // function for other selected
  const handleSelectChange = (event) => {
    const selectedCompany = event.target.value;
    setUpLoadedData({ ...uploadedData, company: selectedCompany });
    setOtherSelected(selectedCompany === "Other");
  };

  const handleInputChange = (event) => {
    const selectedCompany = event.target.value;
    setUpLoadedData({ ...uploadedData, company: selectedCompany });
    console.log(uploadedData.company);
  };

  // to fetch result
  const fetchResult = async (event) => {
    document.getElementById("enter_company_name_close").click();
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("url", file);
    formData.append("company", uploadedData.company);
    formData.append("templateUrl", uploadedData.templateUrl);
    setResultStatus(() => "processing");
    console.log(formData);

    const url = `${process.env.REACT_APP_BACKEND_IP}/django/fetchdetails`;
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          usertoken: localStorage.getItem("usertoken"),
        },
        body: formData,
      });
      const json = await response.json();
      console.log("data from django fetch is :", json);

      if (!json.success) {
        alert("Failed");
        setResultStatus("none");
        return;
      }
      if (resultStatus === "none") return;

      extractUniqueEntities(json.data.ner_dic);
      const newCompare = json.data.compare_dic?.filter((tuple) => {
        return tuple[1] && tuple[1].trim() !== "false";
      });
      setResult(() => ({
        uploaded_pdf: json.data.uploaded_pdf,
        highlighted_pdf: json.data.highlighted_pdf,
        summary: json.data.summary,
        ner_dic: uniqueEntities,
        compare_dic: newCompare,
      }));
      console.log("result : ", result);

      setResultStatus("present");
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("Failed");
    } finally {
      // Reset the file input value to allow re-uploading the same file if needed
      event.target.value = null;
    }
  };

  // to load template and companies
  const loadTemplateAndCompanies = async () => {
    // to get templates
    let url = `${process.env.REACT_APP_BACKEND_IP}/template/get`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        usertoken: localStorage.getItem("usertoken"),
      },
    });
    const data = await response.json();
    console.log(data);

    if (data.success || data.signal === "green") {
      setTemplates(data.templates);
    }

    // to get companies list
    url = `${process.env.REACT_APP_BACKEND_IP}/userHistory/getUserHistory`;
    const response2 = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        usertoken: localStorage.getItem("usertoken"),
      },
    });
    const data2 = await response2.json();
    console.log(data2);

    if (data2.success || data2.signal === "green") {
      setCompany(data2.history);
    }

    try {
    } catch (error) {}
  };

  // if user not logged in
  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
      navigate("/login");
    } else {
      loadTemplateAndCompanies();
    }
  }, []);

  // various forms of main chat board -------------------
  // default state
  const ChatArea = (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://cdn1.expresscomputer.in/wp-content/uploads/2023/04/04130957/EC_Artificial_Intelligence_AI_750.jpg"
          />
        </div>
      </div>
      <div className="chat-bubble bg-primary text-white">
        Send me pdf to analys.
      </div>
    </div>
  );

  // loading state
  const localLoader = (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://cdn1.expresscomputer.in/wp-content/uploads/2023/04/04130957/EC_Artificial_Intelligence_AI_750.jpg"
          />
        </div>
      </div>
      <div className="chat-bubble bg-primary text-white h-[5vh]">
        <span className="loading loading-dots loading-lg bg-white"></span>
      </div>
    </div>
  );

  // for settings modal ---------------
  const settingsModeChange = (e) => {
    setSettings(() => ({ ...settings, mode: e.target.value }));
  };

  const settingsVersion = (e) => {
    setSettings(() => ({ ...settings, version: e.target.value }));
  };

  const handleTemplateSubmit = async () => {
    let url = `${process.env.REACT_APP_BACKEND_IP}/template/${settings.mode}`;
    setSettingsStatus("progress");
    const formData = new FormData();
    formData.append("url", settings.url);
    formData.append("version", settings.version);
    
    console.log(formData);
    const method =
      settings.mode === "add"
        ? "POST"
        : settings.mode === "remove"
        ? "DELETE"
        : "PUT";
    
        let response;
    if (settings.mode !== "remove") {
       response = await fetch(url, {
        method: method,
        headers: {
          usertoken: localStorage.getItem("usertoken"),
        },
        body: formData,
      });
    }
    else{
      console.log(settings.version);
      response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          usertoken: localStorage.getItem("usertoken"),
        },
        body: JSON.stringify({version: settings.version}),
      });
    }
    const data = await response.json();
    console.log(data);
    
    if (!data.success || data.signal === "red") {
      alert("feild");
      console.log(data.error);
    }
    else{
      document.getElementById("settings_close").click();
      loadTemplateAndCompanies();
    }
    setSettingsStatus("none");
  };

  const newTemplateFile = (e) => {
    setSettings(() => ({ ...settings, url: e.target.files[0] }));
  };

  // actual returning data ---------
  return (
    <div className="w-[100%] h-[88vh] flex justify-around relative z-1 pt-5 overflow-y-clip">
      {/* sidebar */}
      <Sidebar setResultStatus={setResultStatus} />

      {/* chat area  */}
      <div
        style={{
          background: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(8px)",
        }}
        class="overflow-y-scroll rounded-lg shadow-xl border-[1px] border-gray-500 shadow-blue-500/50 h-[83vh] w-[70vw] p-2 pt-5"
      >
        {/* inital text by ai  */}

        {resultStatus === "none" && ChatArea}
        {resultStatus === "processing" && localLoader}
        {resultStatus === "present" && <Deviations result={result} />}
      </div>

      {/* button  */}
      {resultStatus === "none" && (
        <div
          onClick={() => document.getElementById("company_modal").showModal()}
          className="fixed z-[100] bottom-[8vh] left-[43vw] border hover:bg-blue-600 bg-blue-500 w-[40vw] h-[7vh] shadow-blue-500 border-none shadow-lg flex items-center justify-center text-white font-bold rounded-lg cursor-pointer"
        >
          Upload Document
        </div>
      )}

      {/* regarding input fild  */}
      <input
        id="fileInputButton"
        accept="application/pdf"
        onChange={fetchResult}
        type="file"
        style={{ display: "none" }}
      />

      <dialog id="company_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id="ctmodal"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Select Template to Compare with</h3>
          <ul className="menu  bg-base-200 rounded-box w-[100%] mt-2">
            <li>
              <details open>
                <summary>Master Template</summary>
                <ul>
                  {templates.map((t) => {
                    return (
                      <li onClick={() => handleTemplateSelect(t.url)}>
                        <a>{t.version}</a>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Company Template</summary>
                <ul>
                  {company.map((cmp) => {
                    return (
                      <li>
                        <details>
                          <summary>{cmp.company}</summary>
                          <ul>
                            {cmp.data.map((dt) => {
                              return (
                                <li
                                  onClick={() =>
                                    handleCompanySelect(
                                      dt.uploaded_pdf,
                                      cmp.company
                                    )
                                  }
                                >
                                  <a>version-{dt.version}</a>
                                </li>
                              );
                            })}
                          </ul>
                        </details>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </dialog>

      {/* if user selects template then he or she needs to selece company too  */}
      <dialog id="enter_company_name" className="modal">
        <div className="modal-box flex flex-col">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id="enter_company_name_close"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Select Company Name</h3>
          <select
            className="select select-primary w-full max-w-xs mt-4"
            value={uploadedData.company}
            onChange={handleSelectChange}
          >
            <option disabled value="">
              Company Name ?
            </option>
            {company.map((cmp) => (
              <option value={cmp.company}> {cmp.company} </option>
            ))}
            <option value="Other">Other</option>
          </select>
          {otherSelected === true && (
            <input
              id="cname"
              type="text"
              onChange={handleInputChange}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs mt-2"
            />
          )}
          <button
            onClick={() => document.getElementById("fileInputButton").click()}
            className="btn hover:bg-blue-600 bg-blue-500 shadow-blue-500 border-none shadow-lg text-white mt-4 w-[7vw]"
          >
            Submit
          </button>
        </div>
      </dialog>

      {/* modals  */}
      {/* 1 */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box relative">
          <div className="flex flex-col gap-2">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button id="settings_close" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Template Settings</h3>
          <select
            className="select select-primary w-full max-w-xs mt-4"
            value={settings.mode}
            onChange={settingsModeChange}
          >
            <option disabled value="">
              Select Operations
            </option>
            <option value="add">Add</option>
            <option value="remove">Remove</option>
            <option value="update">Update</option>
          </select>
          {settings.mode === "add" && (
            <input
              id="tversion"
              type="text"
              onChange={settingsVersion}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs mt-2"
            />
          )}

          {settings.mode && settings.mode !== "add" && (
            <select
              className="select select-primary w-full max-w-xs mt-4"
              value={settings.version}
              onChange={settingsVersion}
            >
              <option disabled value="">
              Select Master Template
            </option>
              {templates.map((t) => {
                return (
                  <option value={t.version}>
                    <a>{t.version}</a>
                  </option>
                );
              })}
            </select>
          )}

          {settings.mode && settings.mode !== "remove" && (
            <input
              onChange={newTemplateFile}
              type="file"
              accept="applications/pdf"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          )}

          <button
            onClick={handleTemplateSubmit}
            className="btn hover:bg-blue-600 bg-blue-500 shadow-blue-500 border-none shadow-lg text-white mt-4 w-[7vw]"
          >
            Submit
          </button>
          </div>
          {settingsStatus === "progress" && (
            <div className="h-[100%] w-[100%] bg-white opacity-40 absolute top-0 left-0 flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-blue-800"></span>
            </div>
          )}
        </div>
      </dialog>

      {/* 2 */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id="modal2_close"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold">Your History</h3>
          <ul className="menu  bg-base-200 rounded-box w-[100%] mt-2">
            {company.map((cmp) => {
              return (
                <li>
                  <details>
                    <summary>{cmp.company}</summary>
                    <ul>
                      {cmp.data.map((dt) => {
                        return (
                          <li onClick={() => viewHistory(dt)}>
                            <a>version-{dt.version}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      </dialog>
    </div>
  );
}
