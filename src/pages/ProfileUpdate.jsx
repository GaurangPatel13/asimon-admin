import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonWithIcon from "../components/ButtonWithIcon";
import { FaEdit, FaSave } from "react-icons/fa";
import InputField from "../components/InputField";
import { formatDateForInput } from "../utils/dateFunctions";
import { getUserById } from "../api/admin-api";

const ProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    mobile: '',
    email: '',
    dob: '',
    city: '',
    state: '',
    pincode: '',
    address: '',
    bankName: '',
    branchName: '',
    accountNo: '',
    ifscCode: '',
    panNo: '',
    aadharNo: '',
    nomineeName: '',
    nomineeAadhar: '',
    relation: '',
    nomineeDob: '',
    sponsorId: '',
    sponsorName: '',
    joiningDate: '',
    password: '',
    userProfile: '',
    panImage: '',
    aadharFront: '',
    aadharBack: '',
    gender: '',
    maritalStatus: '',
    profession: '',
  });

  const [isEditable, setIsEditable] = useState(false);
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    getUserById(id).then((res) => {
      setFormData({
        name: `${res?.name?.firstName} ${res?.name?.middleName} ${res?.name?.lastName}` ?? '',
        fatherName: res?.relationName ?? '',
        mobile: res?.mobileNo ?? '',
        email: res?.email ?? '',
        dob: res?.dob ?? '',
        gender: res?.gender || "",
        maritalStatus: res?.maritalStatus ?? "",
        city: res?.city ?? '',
        state: res?.state ?? '',
        pincode: res?.pincode ?? '',
        address: res?.address ?? '',
        bankName: res?.bankDetails?.bankName ?? '',
        branchName: res?.bankDetails?.branchName ?? '',
        accountNo: res?.bankDetails?.accountNo ?? '',
        profession: res?.profession ?? '',
        ifscCode: res?.bankDetails?.ifscCode ?? '',
        panNo: res?.panNo ?? '',
        aadharNo: res?.kycDetails?.aadharCard ?? '',
        nomineeName: res?.nominee?.nomineeName ?? '',
        nomineeAadhar: res?.nominee?.nomineeAadhar ?? '',
        relation: res?.nominee?.nomineeRelation ?? '',
        nomineeDob: res?.nominee?.nomineeDob ?? '',
        sponsorId: res?.sponsorId ?? '',
        sponsorName: res?.sponsorName ?? '',
        joiningDate: res?.activationDate ?? '',
        password: res?.password ?? '',
        userProfile: res?.picture ?? '',
        panImage: res?.kycDetails?.panCard ?? '',
        aadharFront: res?.kycDetails?.addressProof ?? '',
        aadharBack: res?.kycDetails?.cheque ?? '',
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file); // Convert image file to base64
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const saveProfile = async () => {
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const res = await axios.put("http://localhost:8000/api/v1/profile/update", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile updated successfully");
      setIsEditable(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.log("Error updating profile", error);
    }
  };


  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUserProfile(id, formData);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile updated successfully',
      });
      setIsEditable(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Update failed',
        text: 'There was an error updating the profile.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-6 p-3 bg-white shadow rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Profile Updation</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          {!isEditable && (
            <ButtonWithIcon
              title="Edit Profile"
              icon={<FaEdit />}
              onClick={handleEditClick}
              type="button"
            />
          )}
          {isEditable && (
            <ButtonWithIcon
              title="Save Profile"
              icon={<FaSave />}
              type="button"
              loading={loading}
              onClick={saveProfile}
            />

          )}
        </div>

        <h2 className="text-xl font-bold">Image Upload</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{ label: "User Photo", name: "userProfile", value: formData.userProfile },
          { label: "PAN Card Image", name: "panImage", value: formData.panImage },
          { label: "Aadhaar Front", name: "aadharFront", value: formData.aadharFront },
          { label: "Aadhaar Back", name: "aadharBack", value: formData.aadharBack }].map((field) => (
            <div key={field.name} className="border p-2 rounded-md flex flex-col gap-2">
              <label className="block font-medium text-sm capitalize">{field.label}:</label>

              {field.value && (
                <img
                  src={field.value}
                  alt={`${field.label} Preview`}
                  className="w-full h-32 object-cover rounded border"
                />
              )}

              <InputField
                type="file"
                name={field.name}
                onChange={handleChange}
                accept=".jpg,.jpeg,.png"
                disable={!isEditable}
              />
            </div>
          ))}
        </div>
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold">Personal Details</legend>
          <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <InputField name="name" label="Full Name" value={formData.name} onChange={handleChange} disable={!isEditable} />
            <InputField name="fatherName" label="Father Name" value={formData.fatherName} onChange={handleChange} disable={!isEditable} />
            <InputField name="mobile" label="Mobile" value={formData.mobile} onChange={handleChange} disable={!isEditable} />
            <InputField name="email" label="Email" value={formData.email} onChange={handleChange} disable={!isEditable} />
            <InputField name="dob" label="D.O.B." type="date" value={formatDateForInput(formData.dob)} onChange={handleChange} disable={!isEditable} />
            <InputField name="gender" label="Gender" value={formData.gender} onChange={handleChange} disable={!isEditable} />
            <InputField name="maritalStatus" label="Marital Status" value={formData.maritalStatus} onChange={handleChange} disable={!isEditable} />
            <InputField name="city" label="City" value={formData.city} onChange={handleChange} disable={!isEditable} />
            <InputField name="state" label="State" value={formData.state} onChange={handleChange} disable={!isEditable} />
            <InputField name="pincode" label="Pincode" value={formData.pincode} onChange={handleChange} disable={!isEditable} />
            <InputField name="address" label="Address" value={formData.address} onChange={handleChange} disable={!isEditable} />
          </section>
        </fieldset>
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold">Bank Details</legend>
          <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <InputField name="bankName" label="Bank Name" value={formData.bankName} onChange={handleChange} disable={!isEditable} />
            <InputField name="branchName" label="Branch Name" value={formData.branchName} onChange={handleChange} disable={!isEditable} />
            <InputField name="accountNo" label="Account No" value={formData.accountNo} onChange={handleChange} disable={!isEditable} />
            <InputField name="ifscCode" label="IFSC Code" value={formData.ifscCode} onChange={handleChange} disable={!isEditable} />
          </section>
        </fieldset>
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold">Nominee Details</legend>
          <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <InputField name="nomineeName" label="Nominee Name" value={formData.nomineeName} onChange={handleChange} disable={!isEditable} />
            <InputField name="nomineeAadhar" label="Nominee Aadhar" value={formData.nomineeAadhar} onChange={handleChange} disable={!isEditable} />
            <InputField name="relation" label="Relation with Nominee" value={formData.relation} onChange={handleChange} disable={!isEditable} />
            <InputField name="nomineeDob" label="Nominee D.O.B." type="date" value={formatDateForInput(formData.nomineeDob)} onChange={handleChange} disable={!isEditable} />
          </section>
        </fieldset>
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold">Sponsor Details</legend>
          <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <InputField name="sponsorId" label="Sponsor ID" value={formData.sponsorId} onChange={handleChange} disable={!isEditable} />
            <InputField name="sponsorName" label="Sponsor Name" value={formData.sponsorName} onChange={handleChange} disable={!isEditable} />
          </section>
        </fieldset>
      </form>
    </div>
  );
};

export default ProfileUpdate;
