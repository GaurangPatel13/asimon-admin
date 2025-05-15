import React, { useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import SelectComponent from "../../components/SelectComponent";
import { addFund, getUserByFcid } from "../../api/admin-api";
import Swal from "sweetalert2";
import PageLoader from "../../components/ui/PageLoader";

const AddFund = () => {
  const [userId, setUserId] = useState("");
  const [associateName, setAssociateName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [utr, setUtr] = useState("");
  const [remark, setRemark] = useState("");
  const [availableFund, setAvailableFund] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await getUserByFcid({ username: userId });
      setAssociateName(response?.data[0]?.HolderName);
      setAvailableFund(response?.walletAmount);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || 'Something went wrong',
      })
    } finally {
      setLoading(false);
    }
  };
  console.log(availableFund, associateName)

  const handleSubmit = async (e) => {
    console.log("click")
    e.preventDefault();
    const payload = {
      userId,
      type,
      amount,
      utr,
      remark,
    };
    try {
      setLoading(true);
      await addFund(payload);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Fund added successfully",
      });
      setUserId("");
      setAssociateName("");
      setType("");
      setAmount("");
      setUtr("");
      setRemark("");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || 'Something went wrong',
      })
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="p-6 bg-white shadow-xl rounded-xl">
        <div className="mb-4 flex gap-4">
          <InputField
            type="text"
            placeholder="Enter Associate ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
          <Button title={"Search Associate Information"} onClick={handleSearch} />
        </div>

        <form className="space-y-4">
          <div className="flex gap-4">
            <InputField
              type="text"
              value={userId}
              disabled
              placeholder="Associate ID"
              className="w-full border px-4 py-2 rounded-md bg-gray-100 text-gray-700"
            />

            <InputField
              type="text"
              value={associateName}
              disabled
              placeholder="Associate Name"
              className="w-full border px-4 py-2 rounded-md bg-gray-100 text-gray-700"
            />
          </div>
          <SelectComponent
            options={[
              { label: "Add Fund", value: "add fund" },
              { label: "Deduct Fund", value: "deduct fund" },
            ]}
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Type"
            placeholder="--Select--"
          />


          <p className="text-green-600 font-semibold">Fund (Available: ₹{availableFund})</p>
          <div className="grid grid-cols-2 gap-4">

            <InputField
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring"
            />

            <InputField
              type="text"
              placeholder="UTR No."
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring"
            />


          </div>
          <textarea
            placeholder="Remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring"
          ></textarea>
          <Button type="submit" title={"Save Information"} onClick={handleSubmit} />
        </form>
      </div>
    </>

  );
};

export default AddFund;
