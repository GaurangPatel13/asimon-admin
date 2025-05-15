import React, { useState, useEffect } from 'react';
import InputField from '../components/InputField';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { FaSave } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { getUserById } from '../api/admin-api';
import PageLoader from '../components/ui/PageLoader';

const formatValue = (val) => (val === null || val === undefined || val === '' ? 'N/A' : val);

const ViewProfile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    mobileNo: '',
    email: '',
    dob: '',
    city: '',
    state: '',
    pincode: '',
    address: '',
    bankName: '',
    accountNo: '',
    ifscCode: '',
    panNo: '',
    aadhar: '',
    nomineeName: '',
    nomineeRelation: '',
    nomineeDob: '',
    sponsorId: '',
    sponsorName: '',
    activationDate: '',
    password: ''
  });

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getUserById(location.state);
        if (res) {
          setFormData({
            name: formatValue(`${res?.name?.firstName || ''} ${res?.name?.middleName || ''} ${res?.name?.lastName || ''}`.trim()),
            fatherName: formatValue(res.relationName),
            mobileNo: formatValue(res.mobileNo),
            email: formatValue(res.email),
            dob: formatValue(res.dob ? res.dob.split('T')[0] : ''),
            city: formatValue(res.city),
            state: formatValue(res.state),
            pincode: formatValue(res.pincode),
            address: formatValue(res.address),
            bankName: formatValue(res.bankDetails?.bankName),
            accountNo: formatValue(res.bankDetails?.accountNo),
            ifscCode: formatValue(res.bankDetails?.ifscCode),
            panNo: formatValue(res.panNo),
            aadhar: formatValue(res.kycDetails?.aadharCard),
            nomineeName: formatValue(res.nominee?.nomineeName),
            nomineeRelation: formatValue(res.nominee?.nomineeRelation),
            nomineeDob: formatValue(res.nominee?.nomineeDob ? res.nominee.nomineeDob.split('T')[0] : ''),
            sponsorId: formatValue(res.sponsorId),
            sponsorName: formatValue(res.sponsorName),
            activationDate: formatValue(res.activationDate ? res.activationDate.split('T')[0] : ''),
            password: ''
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === 'N/A' ? '' : value
    }));
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="p-6 bg-white shadow rounded-md">
        <h1 className="text-2xl font-semibold mb-6">User Profile</h1>
        <form className="space-y-8">
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField disable={!isEditable} name="name" label="Name" value={formData.name} onChange={handleChange} />
            <InputField disable={!isEditable} name="fatherName" label="Father/Guardian Name" value={formData.fatherName} onChange={handleChange} />
            <InputField disable={!isEditable} name="mobileNo" label="Mobile Number" value={formData.mobileNo} onChange={handleChange} />
            <InputField disable={!isEditable} name="email" label="Email" value={formData.email} onChange={handleChange} />
            <InputField disable={!isEditable} type="date" name="dob" label="Date of Birth" value={formData.dob} onChange={handleChange} />
            <InputField disable={!isEditable} name="city" label="City" value={formData.city} onChange={handleChange} />
            <InputField disable={!isEditable} name="state" label="State" value={formData.state} onChange={handleChange} />
            <InputField disable={!isEditable} name="pincode" label="Pincode" value={formData.pincode} onChange={handleChange} />
            <InputField disable={!isEditable} name="address" label="Address" value={formData.address} onChange={handleChange} />
          </section>

          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold">Bank Details</legend>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <InputField disable={!isEditable} name="bankName" label="Bank Name" value={formData.bankName} onChange={handleChange} />
              <InputField disable={!isEditable} name="accountNo" label="Account Number" value={formData.accountNo} onChange={handleChange} />
              <InputField disable={!isEditable} name="ifscCode" label="IFSC Code" value={formData.ifscCode} onChange={handleChange} />
              <InputField disable={!isEditable} name="panNo" label="PAN Number" value={formData.panNo} onChange={handleChange} />
              <InputField disable={!isEditable} name="aadhar" label="Aadhar Number" value={formData.aadhar} onChange={handleChange} />
            </div>
          </fieldset>

          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold">Nominee Details</legend>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <InputField disable={!isEditable} name="nomineeName" label="Nominee Name" value={formData.nomineeName} onChange={handleChange} />
              <InputField disable={!isEditable} name="nomineeRelation" label="Relation" value={formData.nomineeRelation} onChange={handleChange} />
              <InputField disable={!isEditable} type="date" name="nomineeDob" label="Nominee DOB" value={formData.nomineeDob} onChange={handleChange} />
            </div>
          </fieldset>

          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField disable name="sponsorId" label="Sponsor ID" value={formData.sponsorId} />
            <InputField disable name="sponsorName" label="Sponsor Name" value={formData.sponsorName} />
            <InputField disable name="activationDate" label="Joining Date" value={formData.activationDate} />
          </section>

          <div className="flex justify-end gap-4 mt-6">
            <ButtonWithIcon
              text={isEditable ? 'Save' : 'Edit'}
              icon={<FaSave />}
              onClick={(e) => {
                e.preventDefault();
                if (isEditable) {
                  console.log('Saving updated formData:', formData);
                }
                setIsEditable(!isEditable);
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ViewProfile;
