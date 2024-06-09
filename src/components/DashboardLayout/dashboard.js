import React from "react";
import TabsComponent from "../Tabs/tabs";
import Navbar from "../Navbar/navbar";
import Sidebar from "../Sidebar/sidebar";
import Footer from "../Footer/footer";

const Dashboard = () => {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />

      <TabsComponent />

      <Footer />
    </div>
  );
};

export default Dashboard;
