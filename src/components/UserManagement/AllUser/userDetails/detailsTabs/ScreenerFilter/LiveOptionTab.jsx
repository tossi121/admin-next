import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const LiveOptionTab = (props) => {
  const { optionScreenerData } = props;
  const [showModal, setShowModal] = useState(false);
  const [jsonData, setJsonData] = useState(false);

  const handleModal = (params) => {
    setShowModal(true);
    setJsonData(params);
  };

  function showScreenerModal() {
    const checkboxes = Object.keys(jsonData).map((item, index) => {
      return (
        <div key={index} className="form-check col-md-4 py-1">
          <input
            className="form-check-input"
            readOnly
            checked={jsonData[item]}
            type="checkbox"
            value={item}
            id={`checkbox-${index}`}
          />
          <label className="form-check-label d-flex align-items-center" htmlFor={`checkbox-${index}`}>
            {item.replace(/_/g, ' ')}
          </label>
        </div>
      );
    });

    return (
      <Modal show={showModal} onHide={() => setShowModal(false)} size={'xl'} centered>
        <Modal.Header onHide={() => setShowModal(false)} closeButton className="border-bottom pb-1">
          <Modal.Title as="h4">Option Screener Filter </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="row text-start ps-2">{checkboxes}</div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <table className="table table-responsive subscription-table mb-0">
      {showScreenerModal()}
      <thead>
        <tr>
          <th scope="col" className="table-heading">
            Screener Id
          </th>
          <th scope="col" className="table-heading">
            Screener Name
          </th>
          <th scope="col" className="table-heading">
            Filter
          </th>
        </tr>
      </thead>
      <tbody>
        <>
          {(optionScreenerData.length > 0 &&
            optionScreenerData.map((item, index) => {
              const optionData = JSON.parse(item.screener_json);
              return (
                <>
                  <tr key={index}>
                    <td>{item?.screener_id}</td>
                    <td>{item?.screener_name}</td>
                    <td>
                      <Button
                        variant=""
                        className="p-1 px-2 text-white web-button"
                        onClick={() => handleModal(optionData)}
                      >
                        Veiw
                      </Button>
                    </td>
                  </tr>
                </>
              );
            })) || (
            <tr>
              <td className="border border-0 p-0 pt-2 ps-2">
                <p>No Data Found</p>
              </td>
            </tr>
          )}
        </>
      </tbody>
    </table>
  );
};

export default LiveOptionTab;
