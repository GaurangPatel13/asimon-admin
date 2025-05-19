import { useEffect, useState } from "react";
import HeaderStats from "./HeaderStats";
import Footer1 from "../../components/Footer1";
import PageLoader from "../../components/ui/PageLoader";
import { FaUser } from "react-icons/fa";
import RecentOrders from "../RecentOrders";
import Button from "../../components/Button";
import { getUsersStatus ,getOrderStatus } from "../../api/admin-api";
import { Routers } from "../../constants/Routes";

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState([]);
  const [dashboardStats1, setDashboardStats1] = useState([]);
  const [loading, setLoading] = useState(false);


  const stats = [
    {
      title: "Total Distributor",
      value: dashboardStats?.data?.totalUsers || 0,
      symbol: "",
      // change: "+8%",
      status: "down",
      icon: <i class="ri-team-fill"></i>,
      path: Routers.AllUsers,
      pathstate:"All",
      detailsIcon: <i class="ri-arrow-right-s-line"></i>

    },
    {
      title: "Active Distributor",
      value: dashboardStats?.data?.activeUsers || 0,
      symbol: "",
      // change: "+8%",
      status: "down",
      icon: <i class="ri-team-fill"></i>,
      path: Routers.AllUsers,
      pathstate:"Active",
      detailsIcon: <i class="ri-arrow-right-s-line"></i>

    },
    {
      title: "In Active Distributor",
      value: dashboardStats?.data?.inactiveUsers || 0,
      symbol: "",
      // change: "+8%",
      status: "down",
      icon: <i class="ri-user-fill"></i>,
      path: Routers.AllUsers,
      pathstate:"In Active",
      detailsIcon: <i class="ri-arrow-right-s-line"></i>

    },
    {
  title: "Today Sale",
  value: dashboardStats1?.todaySale || 0,
  symbol: "₹",
  status: "down",
  path: Routers.orderhistory,
  icon: <i class="ri-shopping-cart-fill"></i>,
},

    {
      title: "Current Month Sale",
      value: dashboardStats1?.currentMonthSale || 0,
      symbol: "₹",
      // change: "+8%",
      status: "down",
      path: Routers.orderhistory,
      icon: <i class="ri-shopping-cart-fill"></i>,
    },
    {
      title: "Total Shopping",
      value: dashboardStats1?.totalShopping || 0,
      symbol: "₹",
      // change: "+8%",
      status: "down",
      path: Routers.orderhistory,
      icon: <i class="ri-shopping-cart-fill"></i>,
    },
    // {
    //   title: "Today Deposit",
    //   value: "₹0",
    //   symbol: "₹",
    //   // change: "+8%",
    //   status: "down",
    //   path: Routers.fundrequest,
    //   icon: <i class="ri-wallet-3-fill"></i>,
    // },
    // {
    //   title: "Total Deposit ",
    //   value: "15000",
    //   symbol: "₹",
    //   // change: "+8%",
    //   status: "down",
    //   path: Routers.fundrequest,
    //   icon: <i class="ri-wallet-3-fill"></i>,
    // },
  ];

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await getUsersStatus();
      const res1 = await getOrderStatus();
      setDashboardStats(res);
      setDashboardStats1(res1);
      console.log(res1)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);



  return (
    <>
      {loading && <PageLoader />}
      <div className="space-y-7  ">
        <HeaderStats data={stats} />
        <div className=" bg-white shadow-xl rounded-xl">
          {/* <RecentOrders /> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
