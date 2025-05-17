import React, { useEffect, useState } from "react";
import { getPlanSales } from "../../api/admin-api";
import PageLoader from "../../components/ui/PageLoader";
import { formatDateonly } from "../../utils/dateFunctions";

const PlanSales = () => {
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchPlansList = async () => {
      try {
        setLoading(true);
        const response = await getPlanSales();
        console.log("API response:", response);

        if (response?.success && Array.isArray(response.orders)) {
          setOrderList(response.orders);
        }
      } catch (error) {
        console.error("Error fetching plan sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlansList();
  }, []);

  return (
    <>
      {loading && <PageLoader />}
      <div className="bg-white shadow-xl rounded-xl p-4 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Plan Sales</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">User Name</th>
              <th className="border px-4 py-2 text-left">Plan Name</th>
              <th className="border px-4 py-2 text-left">Amount</th>
              <th className="border px-4 py-2 text-left">Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {orderList.length === 0 ? (
              <tr>
                <td colSpan="5" className="border px-4 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              orderList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.userName || "NA"}</td>
                  <td className="border px-4 py-2">{item.planName || "NA"}</td>
                  <td className="border px-4 py-2">{item.amount}</td>
                  <td className="border px-4 py-2">{formatDateonly(item.purchasedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PlanSales;
