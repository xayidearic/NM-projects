import { useDispatch, useSelector } from 'react-redux';
import { setParams } from '../dux/commentsSlice';
import { useState } from 'react';

const SortCommentsDropdown = () => {
  const dispatch = useDispatch();
  const orderByVal = useSelector((state) => state.parameters.orderBy);

  const handleSelectChange = (e) => {
    const orderBy = e.target.value;
    dispatch(setParams({ orderBy }));
  };

  return (
    <div className="comments__sort d-flex align-items-center position-relative">
      <label className="h4 text-nowrap weight-600" htmlFor="order-by">
        Sort By:
      </label>
      <select className="form-control ms-2 me-3" id="order-by" name="orderBy" value={orderByVal} onChange={handleSelectChange}>
        <option value={3}>Most Popular</option>
        <option value={0}>Most Recent</option>
        <option value={1}>Least Recent</option>
      </select>
      <div className="position-absolute comments__sort--img">
        <img className="icon--medium-gray" src="/Content/Images/icons/dropdown-arrow-down_icon.svg" alt="dropdown arrow icon" />
      </div>
    </div>
  );
};

export default SortCommentsDropdown;
