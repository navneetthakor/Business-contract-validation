import * as React from "react";

const Deviations = (props) => {
  const { result } = props;
  // const result = {
  //   uploaded_pdf:
  //     "https://res.cloudinary.com/deziazvyp/image/upload/v1720070941/pdfs/url_1720070939947-51550712.pdf.pdf",
  //   highlighted_pdf:
  //     "https://res.cloudinary.com/deziazvyp/raw/upload/v1720071020/highlighted.pdf",
  //   summary:
  //     "Tech Innovations LLC (Organization), located at 123 Tech Lane, Silicon Valley, CA 94025,  is purchasing software from Rohanshu Solutions Inc. (Organization), located at 456 Software Avenue, Austin, TX 78701.  The agreement was signed on June 25, 2024. The software being purchased is called CodeMaster Enterprise Suite (Product), version 2.1, an enterprise-level suite providing comprehensive tools for software development, project management, and collaboration. The total purchase price is $150,000 USD, with 50% due upon signing the agreement and the remaining 50% due upon delivery and acceptance of the software. The agreement includes a Service Level Agreement (SLA) with the following terms: * Uptime Guarantee: 99.9% * Response Time: Within 4 hours * Resolution Time: Within 2 business days * Penalties: 10% service credit per hour of downtime beyond SLA guarantee The agreement also includes warranties regarding software performance and freedom from viruses.  The agreement is governed by the laws of the State of California, and any disputes will be resolved through arbitration by the American Arbitration Association. The agreement was signed by Jane Doe (Person), CEO of Tech Innovations LLC, and John Smith (Person), CTO of Rohanshu Solutions Inc.",
  //   ner_dic: [
  //     {
  //       key: "30 days",
  //       value: ["DATE", 0.9998503029346466],
  //     },
  //     {
  //       key: "452",
  //       value: ["AMOUNT", 0.9998503029346466],
  //     },
  //   ],
  //   compare_dic: [
  //     ["Rohanshu Banodha", "Very nice person"],
  //     ["Navneet Kumar", "Very nice person"],
  //     ["Ronak vekariya", "Thick hai yaar"],
  //   ],
  // };
  const handleViewUserPdf = () => {
    const url = result.uploaded_pdf;
    window.open(url, "_blank", "noopener", "noreferrer");
  };

  const handleHighLightedPdf = () => {
    const url = result.highlighted_pdf;
    window.open(url, "_blank", "noopener", "noreferrer");
  };

  // accordians
  const accord = result.compare_dic.map((list, index) => {
    return (
      <div className="collapse collapse-arrow border-[1px] border-gray-500 ">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title">{list[0]}</div>
        <div className="collapse-content">
          <p>{list[1]}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://cdn1.expresscomputer.in/wp-content/uploads/2023/04/04130957/EC_Artificial_Intelligence_AI_750.jpg"
            />
          </div>
        </div>
        <div className="chat-bubble bg-blue-500 text-white h-[5vh]">
          Please check your results
        </div>
      </div>

      <div className="flex flex-row gap-2 border-b-[1px] border-gray-300 pb-1">
        <p className="font-bold pl-2">view your uploaded pdf: </p>
        <button
          className="btn btn-primary btn-outline btn-sm"
          onClick={handleViewUserPdf}
        >
          View Pdf
        </button>
      </div>

      <p></p>

      <div className="p-2">
        <p className="font-bold">Key Entities:</p>

        <div className=" overflow-x-auto border-[1px] border-gray-500 shadow-md shadow-blue-500/50 p-4 w-[50%] rounded-md">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Entity</th>
                <th>Category</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {result?.ner_dic?.map((item, index) => (
                <tr key={index}>
                  <th> {item.key}</th>
                  <th> {item.value[0]}</th>
                  <th> {item.value[1].toFixed(2)}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3">
          <p className="font-bold">Deviations :</p>
          {/* Deviations component to be called in a loop iterating over the deviation object. */}
          {accord}
        </div>
        <div className="pt-3">
          <p className="font-bold">Summary :</p>
          <div className="border-[1px] border-gray-500 shadow-md shadow-blue-500/50 rounded-md mt-1 p-4">
            {result.summary}
          </div>
        </div>

        <div className="pt-3 flex flex-row gap-4" >
          <p className="font-bold">
            Download the highlighted version :
          </p>

        <button className="btn btn-primary btn-outline btn-sm" onClick={handleHighLightedPdf}>
          <p>View pdf</p>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Deviations;
