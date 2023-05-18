import React from 'react';

function SelectBox({ setPageSize, setCurrentPage }) {
  const lengthMenu = [10, 20, 50, 100];
  return (
    <div className="form-group input-box me-3 mb-2 fs-14 mt-md-0 text-nowrap">
      Show{' '}
      <select
        className="border rounded-3 cursor-pointer label-color-4 custom-select px-2 py-1 mx-1 bg-white"
        onChange={(e) => {
          setPageSize(e.target.value);
          setCurrentPage(1);
        }}
      >
        {lengthMenu.map((item, key) => (
          <option key={key} defaultValue={key === 0} value={item}>
            {item}
          </option>
        ))}
      </select>{' '}
      Entries
    </div>
  );
}

export default SelectBox;
